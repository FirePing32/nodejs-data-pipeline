const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
    {
        formId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Form",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        questionText: {
            type: mongoose.Schema.Types.String,
            trim: true,
        },
        questionDescription: {
            type: mongoose.Schema.Types.String,
            trim: true,
        },
        image: {
            type: mongoose.Schema.Types.String,
            trim: true,
        },
        richText: {
            type: { type: mongoose.Schema.Types.String },
            trim: true,
        },
        policies: [
            {
                policyId: { type: mongoose.Schema.Types.String },
                ignoreTriggers: { type: mongoose.Schema.Types.Boolean },
                enforce: { type: mongoose.Schema.Types.Boolean },
            },
        ],
        isRequired: { type: mongoose.Schema.Types.Boolean },
        answerType: { type: mongoose.Schema.Types.String },
    },
    {
        timestamps: true,
    }
);

questionSchema.methods.deleteQuestion = async function () {
    await questionSchema
        .deleteOne({ _id: this._id })
        .then(function () {
            return { questionId: this._id, deleted: true };
        })
        .catch(function (error) {
            throw new Error(error);
        });
};

questionSchema.methods.addPolicies = async function (policies) {
    await mongoose.models.Policies.findByIdAndUpdate(this._id, {
        $push: {
            policies: policies
        },
        function(err, doc) {
            if (err) {
                throw new Error(err);
            }
        },
    });
};

if (!mongoose.models.Question){
	mongoose.model("Question", questionSchema);
}
module.exports = mongoose.models.Question;