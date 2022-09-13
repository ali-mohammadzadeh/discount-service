const express = require('express');
const router = express.Router();
const controller = require("../app/controllers/discounts");



router.post('/',function(req, res, next) {
    controller.store(req,res)
});

router.post('/:code/register',function(req, res, next) {
    controller.register(req,res)
});

router.get('/:code/users',function(req, res, next) {
    controller.get(req,res)
});

module.exports = router;


