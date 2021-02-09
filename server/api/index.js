module.exports = (router) => {

    const {itemCategoryController, itemController, itemsController} = require("./controllers/item");

    router.get("/items/:id/category", itemCategoryController);

    router.get("/items", itemsController);

    router.get("/items/:id", itemController);

};