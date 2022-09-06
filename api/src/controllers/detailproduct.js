const { Product, Categorie, Ofert } = require("../db");
const axios = require("axios")
const { URL_API } = require("./globalConst")


/* GET DETAIL PRODUCT FROM JSON */
const getDetailProduct = async (req, res, next) => {
    const id = req.params.id;

    const resp = await axios.get(URL_API)
    const detail = resp.data
    try {
        if(id.length < 8) {
            let productDetail = detail.find(e => e.id == id)
            res.send(productDetail);}
        else {
            const dbInfo = await Product.findAll({
                    include: {
                         model: Categorie,
                        attributes: ["name"], 
                        through: { attributes: [] },

                    },
                    include: {
                        model: Ofert,
                        attributes: ["startDate", "endDate", "status", "description", "discountPercent"],
                        through: { attributes: [] },
                    },
                                    
               })
              let productDetail = await dbInfo.find(p => p.id === id)
                
             
              res.send(productDetail);
            }
                } catch (error) {
                    next(error);
                }
            }
        
        module.exports = {
            getDetailProduct
        };


