const { Router } = require("express");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

/* LINKS TO DOCS JOI AND EXPRESS-JOI-VALIDATION 
https://joi.dev/api/?v=17.6.0
https://github.com/evanshortiss/express-joi-validation#readme
*/

/* SE CREAN LOS OBJETOS CON LOS TIPOS DE VALIDACIONES */
const querySchema = Joi.object({
  name: Joi.string().regex(/^[a-zA-Z\s]+$/),
});

const paramsSchema = Joi.object({
  id: Joi.string().regex(/^([a-zA-Z0-9-]+)$/),
});

const bodySchema = Joi.object({
  nickname: Joi.string().regex(/^([a-zA-Z0-9-]+)$/),
  name: Joi.string().regex(/^[a-zA-Z\s]+$/),
  email: Joi.string().email(),
  email_verified: Joi.boolean(),
  sid: Joi.string().regex(/^([a-zA-Z0-9-]+)$/),
  picture: Joi.string().regex(/^([a-zA-Z0-9-]+)$/),
  status: Joi.boolean(),
  rol: Joi.string().regex(/^([a-zA-Z0-9-]+)$/),
});

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/users");
    
const router = Router();

/* SE ARMAN LAS RUTAS PASANDO LAS VALIDACIONES COMO MIDDLEWARES */

/* GET ALL PRODUCTS FRONT THE DATABASE */
router.get("/", getAllUsers);

/* CREATE NEW PRODUCT IN THE DATABASE */
router.post("/", validator.body(bodySchema), createUser);

/* UPDATE PRODUCT IN THE DATABASE */
router.put(
  "/:id",
  validator.params(paramsSchema),
  validator.body(bodySchema),
  updateUser
);

/* DELETE PRODUCT IN THE DATABASE */
router.delete("/:id", validator.params(paramsSchema), deleteUser);

module.exports = router;