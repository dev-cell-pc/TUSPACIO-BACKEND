const { User, Favorite, Order } = require("../db");
const axios = require("axios");
const { URL_API } = require("./globalConst");

/* GET ALL USERS FROM DB */

const getAllUsers = async (req, res) => {
  try {
    const dbInfo = await User.findAll({
      include: {
        model: Favorite,
        attributes: ["id"],
        through: { attributes: [] },
      }
    });
    res.send( dbInfo)
  } catch (error) {
    console.log(error);
  }
};


/* CREATE NEW USER IN THE DATABASE */
const createUser = async (req, res, next) => {
  try {
    /* ME TRAIGO TODOS LOS VALORES DEL CUERPO DE LA PETICION */
    const {
            nickname,
            name,
            email,
            email_verified,
            sid,
            picture,
            status,
            rol_id } = req.body;

    /* CREATE NEW USER */
    const newUser = await User.create({
        nickname,
        name,
        email,
        email_verified,
        sid,
        picture,
        status,
        rol_id,
    });

    res.status(200).json({
      succMsg: "User Created Successfully!",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

/* UPDATE ONE USER IN THE DATABASE */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
            nickname,
            name,
            email,
            email_verified,
            sid,
            picture,
            status,
            rol_id } = req.body;
            
    /* BUSCO EL USER EN LA BD POR EL ID */
    const userDb = await User.findByPk(id);
    /* ACTUALIZO EL USER */
    const updatedUser = await userDb.update({
        nickname,
        name,
        email,
        email_verified,
        sid,
        picture,
        status,
        rol_id,
    });
    res.status(200).json({
        succMsg: "User Updated Successfully!",
        updatedUser,
    });
    } catch (error) {
        next(error);
    }
};

/* DELETE ONE USER IN THE DATABASE */
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        /* BUSCO EL USER EN LA BD POR EL ID */
        const userDb = await User.findByPk(id);
        /* ELIMINO EL USER */
        await userDb.destroy();
        res.status(200).json({
            succMsg: "User Deleted Successfully!",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
