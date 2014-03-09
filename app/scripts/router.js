define(['backbone', 'controllers/food_router'], function(Backbone, FoodController){
    var AppRouter = Backbone.Marionette.AppRouter.extend({
        controller: FoodController,
        appRoutes: {
            "food": "showFood",
            "beverages": "showBeverages",
            "kitchen": "showKitchen",
            "suppliers": "manageSuppliers"
        }
    });
    
    return AppRouter;
});
