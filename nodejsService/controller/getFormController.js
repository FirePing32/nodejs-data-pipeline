const Form = require("../models/formModel.js");
const Policy = require("../models/policiesModel.js");
const Response = require("../models/responseModel.js");
const Question = require("../models/questionModel.js");
const Rule = require("../models/rulesModel.js");
const User = require("../models/userModel.js");
const Answer = require("../models/answerModel.js");

// Get form
const getForm = async (req, res) => {
    try {
        var form = await Form.findById(req.params.formId);
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    return res.json(form);
};

// Get a response submitted by a user for a particular form
const getUserFormResponse = async (req, res) => {
    var response = await Response.findOne({
        formId: req.params.formId,
        userId: req.params.userId,
    });

    if (response == null || response == undefined) {
        return res.status(404).json({ error: "Response does not exist." });
    }

    return res.json(response);
};

// Get all responses submitted by a user
const getUserAllResponses = async (req, res) => {
    var response = await Response.find({ userId: req.params.userId });

    if (response == null || response == undefined) {
        return res.status(404).json({ error: "Response does not exist." });
    }

    return res.json(response);
};

// Get responses for a particular form
const getFormResponses = async (req, res) => {
    var response = await Response.find({ formId: req.params.formId });

    if (response == null || response == undefined) {
        return res.status(404).json({ error: "Response does not exist." });
    }

    return res.json(response);
};

const getUser = async (req, res) => {
    var user = await User.findOne({ userId: req.params.userId });

    if (user == null || user == undefined) {
        return res.status(404).json({ error: "User does not exist." });
    }

    return res.json(user);
};

const getPolicies = async (req, res) => {
    var policies = await Policy.find({ userId: req.params.userId });

    if (policies == null || policies == undefined) {
        return res.status(404).json({ error: "Policy does not exist." });
    }

    return res.json(policies);
};

const getRules = async (req, res) => {
    var rules = await Rule.find({ userId: req.params.userId });

    if (rules == null || rules == undefined) {
        return res.status(404).json({ error: "Rule does not exist." });
    }

    return res.json(rules);
};

const getFormQuestions = async (req, res) => {
    var questions = await Question.find({ formId: req.params.formId });

    if (questions == null || questions == undefined) {
        return res.status(404).json({ error: "Question does not exist." });
    }

    return res.json(questions);
};

module.exports = {
    getForm,
    getUserFormResponse,
    getUserAllResponses,
    getFormResponses,
    getUser,
    getPolicies,
    getRules,
    getFormQuestions,
};
