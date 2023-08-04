const mongoose = require("mongoose");

const policySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        policyName: { type: mongoose.Schema.Types.String },
        policyDesc: { type: mongoose.Schema.Types.String },
        isActive: { type: mongoose.Schema.Types.Boolean },
        rules: [{
            type: mongoose.Schema.Types.ObjectId
        }],
        triggers: [],
        version: { type: mongoose.Schema.Types.String },
    },
    {
        timestamps: true,
    }
);

policySchema.methods.addRule = async function (rules) {
    await mongoose.models.Policy.findByIdAndUpdate(this._id, {
        $push: {
            rules: rules,
        },
        function(err, doc) {
            if (err) {
                throw new Error(err);
            }
        },
    });
};

policySchema.methods.deletePolicy = async function () {
    await policySchema
        .deleteOne({ _id: this._id })
        .then(function () {
            return { policyId: this._id, deleted: true };
        })
        .catch(function (error) {
            throw new Error(error);
        });
};

if (!mongoose.models.Rules) {
    mongoose.model("Policy", policySchema);
}
module.exports = mongoose.models.Rules;
