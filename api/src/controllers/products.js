const { Product, Categorie } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");

/* GET ALL PRODUCTS FROM DB */
const getApiProducts = async (req, res, next) => {
  try {

    const api = await axios(URL_API);
    const resultAll = api.data;

    /* FILTRADO DE PAGINAS CON IMAGENES QUE NO FUNCIONAN */
    const e = api.data.filter(e => !e.image_link?.includes("purpicks") )
    const e1 = e.filter(e => !e.image_link?.includes("static-assets.glossier") )
    const e2 = e1.filter(e => !e.image_link?.includes("imancosmetics") )
    // const e2 = e1.filter(e => !e.image_link.includes("d3t32hsnjxo7q6.cloudfront.net/") )

    return resultAll;
  } catch (error) {
    console.log(error);
  }
};
const getDbProducts = async (req, res) => {
  try {
    const dbInfo = await Product.findAll({
      include: {
        model: Categorie,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    return dbInfo;
  } catch (error) {
    console.log(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const apiInfo = await getApiProducts();

    const dbInfo = await getDbProducts();

    res.send([...dbInfo, ...apiInfo]);
  } catch (error) {
    return error;
  }
};

/* CREATE NEW PRODUCT IN THE DATABASE */
const createProduct = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const {
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status,
      categories,
    } = req.body;
    /* CREATE NEW PRODUCT */
    const newProduct = await Product.create({
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status,
    });

    const categoriesDb = await Categorie.findAll({
      where: { name: categories },
    });
    newProduct.addCategorie(categoriesDb);

    res.status(200).json({
      succMsg: "Product Created Successfully!",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE ONE PRODUCT IN THE DATABASE */
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status,
      categories,
    } = req.body;

    /* BUSCO EL PRODUCT DE LA BD POR EL ID */
    let productDB = await Product.findOne({
      where: {
        id: id,
      },
    });
    /* ACTUALIZO EL PRODUCT CON LOS DATOS QUE RECIBO DEL BODY */
    const updatedProduct = await productDB.update({
      brand,
      name,
      price,
      price_sign,
      currency,
      image_link,
      description,
      rating,
      product_type,
      stock,
      tag_list,
      product_colors,
      status,
      categories,
    });
    res.status(200).send({
      succMsg: "Product Updated Successfully!",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/* DISABLED ONE PRODUCT IN THE DATABASE */
const disableProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.update(
      { status: false },
      {
        where: {
          id: id,
        },
      }
    );

    const disabledProduct = await Product.findByPk(id, {
      attributes: [
        "id",
        "brand",
        "name",
        "price",
        "price_sign",
        "currency",
        "image_link",
        "description",
        "rating",
        "product_type",
        "stock",
        "tag_list",
        "product_colors",
        "status",
      ],
    });

    res.status(200).json({
      ok: true,
      disabledProduct,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  getApiProducts,
  getDbProducts,
  createProduct,
  updateProduct,
  disableProduct,
};
