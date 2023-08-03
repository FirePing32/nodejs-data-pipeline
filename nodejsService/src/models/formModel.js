const mongoose = require("mongoose");

const Question = require('./questionModel')

const formSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        formName: {
            type: mongoose.Schema.Types.String,
            trim: true,
        },
        formDesc: {
            type: mongoose.Schema.Types.String,
            trim: true,
        },
        version: {
            type: mongoose.Schema.Types.String,
            trim: true,
        },
        disabled: { type: mongoose.Schema.Types.Boolean },
        permissions: {
            everyone: { type: mongoose.Schema.Types.Array },
            groups: {
                regex: { type: mongoose.Schema.Types.String },
                permissions: { type: mongoose.Schema.Types.Array },
            },
            individuals: {
                emailIds: { type: mongoose.Schema.Types.Array },
                permissions: { type: mongoose.Schema.Types.Array },
            },
        },
    },
    {
        timestamps: true,
    }
);

formSchema.methods.createQuestion = async function (question) {
	question.formId = this._id;
	question = await Question.create(question);
	return question;
}

formSchema.methods.addPermission = async function (namespace, permissions, ...userGroups) {
    if (namespace == "everyone") {
        await mongoose.models.Policies.findByIdAndUpdate(this._id, {
            $push: {
                permissions: {
                    everyone: permissions
                },
            },
            function(err, doc) {
                if (err) {
                    throw new Error(err);
                }
            },
        });
    }
    if (namespace == "groups") {
        await mongoose.models.Policies.findByIdAndUpdate(this._id, {
            $push: {
                permissions: {
                    groups: {
                        regex: userGroups,
                        permissions: permissions
                    }
                },
            },
            function(err, doc) {
                if (err) {
                    throw new Error(err);
                }
            },
        });
    }
    if (namespace == "individuals") {
        await mongoose.models.Policies.findByIdAndUpdate(this._id, {
            $push: {
                permissions: {
                    individuals: {
                        emailIds: userGroups,
                        permissions: permissions
                    }
                },
            },
            function(err, doc) {
                if (err) {
                    throw new Error(err);
                }
            },
        });
    }

    formSchema.methods.deleteForm = async function () {
        await formSchema
            .deleteOne({ _id: this._id })
            .then(function () {
                return { formId: this._id, deleted: true };
            })
            .catch(function (error) {
                throw new Error(error)
            });
    };

    return { namespace: namespace, permissions: permissions, userGroups: userGroups};
};

if (!mongoose.models.Form){
	mongoose.model("Form", formSchema);
}
module.exports = mongoose.models.Form;