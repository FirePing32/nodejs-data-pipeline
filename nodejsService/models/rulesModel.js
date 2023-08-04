const mongoose = require("mongoose");

const Form = require("./formModel");

const rulesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoogse.Schema.Types.ObjectId,
            ref: "User",
        },
        ruleName: { type: mongoose.Schema.Types.String },
        ruleDesc: { type: mongoose.Schema.Types.String },
        isActive: { type: mongoose.Schema.Types.Boolean },
        conditions: {
            value: { type: mongoose.Schema.Types.Number },
            operation: { type: mongoose.Schema.Types.String },
        },
        version: { type: mongoose.Schema.Types.String },
    },
    {
        timestamps: true,
    }
);

rulesSchema.methods.deleteRule = async function () {
    await rulesSchema
        .deleteOne({ _id: this._id })
        .then(function () {
            return { ruleId: this._id, deleted: true };
        })
        .catch(function (error) {
            throw new Error(error);
        });
};

if (!mongoose.models.Rules){
	mongoose.model("Rules", rulesSchema);
}
module.exports = mongoose.models.Rules;