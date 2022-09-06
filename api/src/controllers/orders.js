const { Product, Order, User } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");

/* GET ALL ORDERS FROM DB */

const getAllOrders = async (req, res) => {
  try {
    const dbInfo = await Order.findAll({
      include: {
        model: Product,
        attributes: ["id", "name", "price" ],
           through: { attributes: [] },
      },
    });
    res.send( dbInfo)
  } catch (error) {
    console.log(error);
  }
};

/* GET ONE ORDER FROM DB */
const getOneOrder = async (req, res, next) => {
  const { id } = req.params;
  try {
    const dbInfo = await Order.findOne({
      where: { id },
      include: {
        model: Product,
        attributes: ["id", "name", "price" ],
            through: { attributes: [] },
      },
    });
    res.send( dbInfo)
  } catch (error) {
    console.log(error);
  }
};

/* GET ORDERS BY STATUS */
const getOrdersByStatus = async (req, res, next) => {
  const { status } = req.params;
  try {
    const dbInfo = await Order.findAll({
      where: { status },
      include: {
        model: Product,
        attributes: ["id", "name", "price" ],
            through: { attributes: [] },
      },
    });
    res.send( dbInfo)
  } catch (error) {
    console.log(error);
  }
};

/* GET ORDERS BY USER ID */
const getOrdersByUserId = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const dbInfo = await Order.findAll({
      where: { user_id },
      include: {
        model: Product,
        attributes: ["id", "name", "price" ],
            through: { attributes: [] },
      },
    });
    res.send( dbInfo)
  } catch (error) {
    console.log(error);
  }
};

/* CREATE NEW ORDER IN THE DATABASE */
const createOrder = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const {
            value, 
            status,
            user_id,
            products_id,
        } = req.body;
    
    /* BUSCO EL USUARIO EN LA BD POR EL ID */
    const userDb = await User.findByPk(user_id);
    /* CREATE NEW ORDER */
    const newOrder = await Order.create({
        value,
        status,
        user_id: userDb.id,
    });
    /* AGREGO ID DE PRODUCTOS A LA ORDER */
    const productsDb = await Product.findAll({  
        where: { id: products_id },
    });
    await newOrder.addProduct(productsDb);
    res.status(200).json({
      succMsg: "Order Created Successfully!",
      newOrder,
    });
  } catch (error) {
    next(error);
  }
};


/* UPDATE ONE ORDER IN THE DATABASE */
const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
        value,
        status,
        user_id,
        products_id,
    } = req.body;

    /* BUSCO LA ORDER EN LA BD POR EL ID */
    let orderDB = await Order.findOne({
      where: {
        id: id,
      },
    });
    /* ACTUALIZO LA ORDER CON LOS DATOS QUE RECIBO DEL BODY */
    const updatedOrder = await orderDB.update({
        value,
        status,
        user_id,
        products_id,
    });
    res.status(200).send({
      succMsg: "Order Updated Successfully!",
      updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

/* DELETE ONE ORDER IN THE DATABASE */
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    /* BUSCO LA ORDER EN LA BD POR EL ID */
    let orderDB = await Order.findOne({
      where: { id: id}
    });
    /* ELIMINO LA ORDER */
    await orderDB.destroy();
    res.status(200).send({succMsg: "Order Deleted Successfully!"});
  } catch (error) {
    next(error);
  }
};


module.exports = {
    getAllOrders,
    getOneOrder,
    getOrdersByStatus,
    getOrdersByUserId,
    createOrder,
    updateOrder,
    deleteOrder,
};
