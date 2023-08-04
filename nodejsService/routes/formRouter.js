const express = require("express")

const postFormController = require("../controller/postFormController")
const getFormController = require("../controller/getFormController");

var formRouter = express.Router();

// Route to create form
formRouter.post('/form/create', postFormController.formCreate);

// Route to create form using FormId
formRouter.post("/:formId/addquestion", postFormController.formAddQuestion);

// Submit response for a form using FormId
formRouter.post("/:formId/submitresponse", postFormController.formResponseSubmit);

// Create user
formRouter.post("/user/create", postFormController.userCreate);

// Add rule to policy
formRouter.post("/:policyId/addrule", postFormController.policyAddRule);

// Add policy to question
formRouter.post("/:questionId/addpolicy", postFormController.questionAddPolicy);

// Create answer
formRouter.post("/answer/create", postFormController.answerCreate);

// Create policy
formRouter.post("/policy/create", postFormController.policyCreate);

// Create rule
formRouter.post("/rule/create", postFormController.ruleCreate);

// Get form
formRouter.get("/form/:formId", getFormController.getForm);

// Get form response for a user
formRouter.get("/form/:formId/response/:userId", getFormController.getUserFormResponse);

// Get all user responses
formRouter.get("/user/:userId/responses", getFormController.getUserAllResponses);

// Get form responses
formRouter.get("/form/:formId/responses", getFormController.getFormResponses);

// Get user
formRouter.get("/user/:userId", getFormController.getUser);

// Get policies
formRouter.get("/user/:userId/policies", getFormController.getPolicies);

// Get rules
formRouter.get("/user/:userId/rules", getFormController.getRules);

// Get form questions
formRouter.get("/form/:formId/questions", getFormController.getFormQuestions);

module.exports = formRouter;