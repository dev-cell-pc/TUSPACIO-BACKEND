// const { Product, Categorie } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET ALL PRODUCTS FROM DB */
const getProductsBrand = async (req, res, next) => {

    const brand = req.query.brand   
    try {
        const api = await axios(URL_API)
        const e = api.data;
        let allProductsBrand = e.filter(e => e.brand === brand)
        res.send(allProductsBrand)
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProductsBrand
};
