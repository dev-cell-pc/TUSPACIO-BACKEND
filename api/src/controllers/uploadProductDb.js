const axios = require("axios")
const { Product, Categorie } = require("../db");
const { URL_API } = require("./globalConst")

/** LOADING PRODUCTS IN THE DB */
async function uploadProductDb() {
  const apiProduct = await axios(URL_API)
  let data = apiProduct.data.map(e => {
    let newProduct = Product.create({
        name: e.name,
        description: e.description,
        price: e.price,
        currency: e.currency,
        image: e.image_link,
        rating: e.rating,
        // brand: e.brand,
        // product_type: e.product_type,
        // product_colors: e.product_colors.map(e => (
        //     e.hex_value
        // )),
        // product_colors_name: e.product_colors.map(e => (
        //     e.colour_name
        // )),
        // tag_list: e.tag_list.map(e => e)
    })
    const categoryDb =  Categorie.findAll({

        where: { name: e.category }
    })
    newProduct.addCategorie(categoryDb)

      .then("Correctly Inserted")
      .catch(e => e)
  })
}

module.exports = { uploadCategoryDb, uploadProductDb }