const Form = require('../models/formModel.js')
const Policy = require('../models/policiesModel.js');
const Response = require('../models/responseModel.js');
const Question = require("../models/questionModel.js");
const Rule = require("../models/rulesModel.js");
const User = require("../models/userModel.js");
const Answer = require("../models/answerModel.js");
const Memcached = require("../memcached.js")

const formCreate = async (req, res) => {
    try{
        var form = await Form.create(req.body);
    } catch (e) {
        res.status(400);
        return res.json({"error":e.message});
    }
    await Mmemcached.set(form._id, form, 86400, function (err) {
        if (err) throw new err();
    });
    return res.json(form);
}

const formAddQuestion = async (req, res) => {
    var form = await Form.findById(req.params.formId);

    if (form == null || form == undefined){
        res.status(400);
        return res.json({"error":"Form does not exist."});
    }
    try{
        var question = await form.createQuestion(req.body);
    } catch (e) {
        res.status(400);
        return res.json({"error":e.message});
    }

    Memcached.del(form._id, function (err) {
        if (err) throw new err();
    });
    await Mmemcached.set(form._id, form, 86400, function (err) {
        if (err) throw new err();
    });
    return res.json(question);
}

// Add rule to a Policy
const policyAddRule = async(req, res) => {
    var policy = await Policy.findById(req.params.policyId)
    if (policy == null || policy == undefined) {
        res.status(400);
        return res.json({ error: "Form does not exist." });
    }
    try {
        req.body.rules.forEach(async (ruleId) => {
            var getrule = await Rule.findById(ruleId, function (err, docs) {
                if (err) {
                    res.status(400);
                    return res.json({
                        error: `Rule with ID: ${ruleId} does not exist`,
                    });
                }
            });
        })
        var rule = await policy.addRule(req.body.rules);
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    return res.json(rule);
}

// Add policy to a question
const questionAddPolicy = async(req, res) => {
    var question = await Question.findById(req.params.questionId)
    if (question == null || question == undefined) {
        res.status(400);
        return res.json({
            error: `Question with ID: ${req.params.questionId} does not exist.`,
        });
    }
    try {
        req.body.policies.forEach(async (policyId) => {
            var getpolicy = await Policy.findById(policyId, function (err, docs) {
                if (err) {
                    res.status(400);
                    return res.json({
                        error: `Policy with ID: ${policyId} does not exist`,
                    });
                }
            });
        });
        var policy = await question.addPolicies(req.body.policies);
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    return res.json(policy);
}

// Handle form submissions
const formResponseSubmit = async (req, res) => {
    var formResponse = req.body["response"];
    var responseString = JSON.stringify([formResponse]);

    try {
        var form = await Form.findById(req.params.formId, function (err, docs) {
            if (err) {
                res.status(400);
                return res.json({
                    error: `Form with ID: ${req.params.formId} does not exist`,
                });
            }
        });
        var response = await Response.create({
            "userId": form.userId,
            "formId": req.params.formId
        });
    } catch(e) {
        res.status(400);
        return res.json({"error": e.message});
    }
    try{
        for (let answer in formResponse) {
             var question = await Question.findById(answer.questionId);
             if (question == null || question == undefined) {
                res.status(400);
                return res.json({ error: `Question with ID: ${answer.questionId} does not exist.` });
             }
        Response.findByIdAndUpdate(response._id, {
            response: formResponse
        }, function (err, data) {
            if (err) {
                res.status(400);
                res.json({"error": err});
            }
        })
        };
    } catch(e) {
        res.status(400);
        res.json({"error": err});
    }

    return res.json({"success":"Form submitted successfully."});
}

const userCreate = async (req, res) => {
    try {
        var user = await User.create(req.body);
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    return res.json(user);
}

const answerCreate = async (req, res) => {
    try {
        var answer = await Answer.create(req.body);
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }

    Memcached.del(form._id, function (err) {
        if (err) throw new err();
    });
    await Mmemcached.set(form._id, form, 86400, function (err) {
        if (err) throw new err();
    });
    return res.json(answer);
};

const policyCreate = async (req, res) => {
    try {
        var policy = await Policy.create(req.body);
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    return res.json(policy);
};

const ruleCreate = async (req, res) => {
    try {
        var rule = await Rule.create(req.body);
    } catch (e) {
        res.status(400);
        return res.json({ error: e.message });
    }
    return res.json(rule);
};

module.exports = {
    formCreate,
    formAddQuestion,
    formResponseSubmit,
    userCreate,
    policyAddRule,
    questionAddPolicy,
    answerCreate,
    policyCreate,
    ruleCreate
}