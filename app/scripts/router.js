define(['backbone', 'controller'], function(Backbone, AppController){
    var AppRouter = Backbone.Marionette.AppRouter.extend({
        controller: AppController,
        appRoutes: {
            "food": "showFood",
            "beverages": "showBeverages",
            "kitchen": "showKitchen"
        }
    });
    
    return AppRouter;
});
