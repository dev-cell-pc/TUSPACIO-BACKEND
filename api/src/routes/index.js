const { Router } = require('express');
const { requiresAuth } = require('express-openid-connect');


const productsRoute = require('./products');
const detailProductRoute = require('./detailproduct.js');
const searchProductsRoute = require('./searchproducts.js');
const ratingRoute = require('./ratingproducts.js');
const productsNameRoute = require('./productsName.js');
const orderPriceRoute = require('./orderByPrice.js');
const brandProductsRoute = require('./productsBrand.js');
const orderNameRoute = require('./orderByName.js');
const orderCombineRoute = require('./orderCombine.js');
const ofertsRoute = require('./oferts.js');

const loginRoute = require('./authorization/login.js')

const categoriesRoute = require('./categories');
const oneCategoriesRoute = require('./oneCategorie.js') 
const ordersRoute = require('./orders');
const usersRoute = require('./users');

const checkoutRoute = require('./checkout.js');

const rolesRoute = require('./roles.js') 



const router = Router();

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTA DE LOGIN
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use('/login', loginRoute);

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE PRODUCTS
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/product", detailProductRoute);
router.use("/products", productsRoute);
router.use("/products/name", productsNameRoute);
router.use("/products/search/", searchProductsRoute);
router.use("/products/brand/", brandProductsRoute);
router.use("/products/rating/", ratingRoute);
router.use("/products/price/", orderPriceRoute);
router.use("/products/orderName/", orderNameRoute);
router.use("/products/orderCombine/", orderCombineRoute);
router.use("/products/oferts", ofertsRoute);



/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE CATEGORIES
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/categorie", oneCategoriesRoute);
router.use("/categories", categoriesRoute);

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE ORDERS                                                                  
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/orders", ordersRoute);

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
                RUTAS DE USERS                                                                  
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/users", usersRoute);

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_ /_/_/_/_/_/_/_/_/_/_/_/_/_/_/_ /_/_/_/_/_/_/_/_/_/_/_/_/_/_/_ 
RUTAS DE ROL                                                                  
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/roles", rolesRoute);

/*_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_ /_/_/_/_/_/_/_/_/_/_/_/_/_/_/_ /_/_/_/_/_/_/_/_/_/_/_/_/_/_/_ 
                RUTA DE PAGO (Checkout)
_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/*/
router.use("/checkout", checkoutRoute);


module.exports = router; 