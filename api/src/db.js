require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/tuspacio`,
        { logging: false, native: false }
      );

const basename = path.basename(__filename);
const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

// Ejemplo:
const { Product, Review, Categorie, Order, Rol, User, Favorite, Ofert } =
  sequelize.models; 

/*===========================RELATION Rol - User 1:N==============================*/
Rol.hasMany(User, { foreignKey: "rol_id" });
User.belongsTo(Rol, { foreignKey: "rol_id" });

/*===========================RELATION User - Favorite N:M==============================*/
User.belongsToMany(Favorite, { through: "Favorite_Users" });
Favorite.belongsToMany(User, { through: "Favorite_Users" });

/*===========================RELATION CATEGORY - PRODUCTS N:M==============================*/
Categorie.belongsToMany(Product, { through: "Category_Products" });
Product.belongsToMany(Categorie, { through: "Category_Products"  });

/*===========================RELATION USER - ORDER 1:N==============================*/
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" }); 

/*===========================RELATION ORDER - PRODUCTS N:M==============================*/
Order.belongsToMany(Product, { through: "Order_Products" });
Product.belongsToMany(Order, { through: "Order_Products" });

/*===========================RELATION PRODUCTS - REVIEWS 1:N==============================*/
Product.hasMany(Review, { foreignKey: "product_id" });
Review.belongsTo(Product, { foreignKey: "product_id" });

/*===========================RELATION PRODUCTS - OFERTS N:M==============================*/
Product.belongsToMany(Ofert, { through: "Product_Oferts" });
Ofert.belongsToMany(Product, { through: "Product_Oferts" });



module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  database: sequelize, // para importart la conexión { conn } = require('./db.js');
};
