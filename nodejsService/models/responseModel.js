const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        formId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Form",
        },
        response: [
            {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Question",
                },
                answers: { type: mongoose.Schema.Types.Array },
            },
        ],
    },
    {
        timestamps: true,
    }
);

responseSchema.methods.deleteResponse = async function () {
    await responseSchema
        .deleteOne({ _id: this._id })
        .then(function () {
            return { responseId: this._id, deleted: true };
        })
        .catch(function (error) {
            throw new Error(error);
        });
};


responseSchema.methods.addResponses = async function (responses) {
    await mongoose.models.Response.findByIdAndUpdate(this._id, {
        $push: {
            response: responses,
        },
        function(err, doc) {
            if (err) {
                throw new Error(err);
            }
        },
    });
}

if (!mongoose.models.Response){
	mongoose.model("Response", responseSchema);
}
module.exports = mongoose.models.Response;