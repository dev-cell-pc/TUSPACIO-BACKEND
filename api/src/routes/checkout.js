const { Router } = require("express");
const { Checkout } = require("../controllers/checkout");

const router = Router();

router.post("/", Checkout);

module.exports = router;