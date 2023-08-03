const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
    },
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form",
    },
    content: {
        type: { type: mongoose.Schema.Types.String },
        richText: { type: mongoose.Schema.Types.String },
    },
});

answerSchema.methods.deleteAnswer = async function () {
    await answerSchema
        .deleteOne({ _id: this._id })
        .then(function () {
            return { answerId: this._id, deleted: true };
        })
        .catch(function (error) {
            throw new Error(error);
        });
};

answerSchema.methods.updateContent = async function (type, content) {
    await mongoose.models.Answer.findByIdAndUpdate(this._id, {
        content: {
            type: type,
            richText: content
        },
    });
};

if (!mongoose.models.Answer) {
    mongoose.model("Answer", answerSchema);
}
module.exports = mongoose.models.Answer;
