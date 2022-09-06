const router = require('express').Router();

const {
    getLogin,
} = require("../../controllers/authorization/login.js");


router.get('/', getLogin); 

module.exports = router;
