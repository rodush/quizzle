define(function () {
    "use strict";
    
    return {
        'showFood': function() {
            require(['application', 'modules/food/views/food_view',
                     'modules/food/models/food_item_model', 'modules/food/models/food_item_collection',
                     'modules/food/views/food_form_view', 'modules/food/views/food_list_view'],
                function(App, FoodLayoutView, FoodItemModel, FoodItemCollection, FoodFormView, FoodListView) {
                    var FoodModel = new FoodItemModel();
                    var FoodViewLayout = new FoodLayoutView();
                    var FoodCollection = new FoodItemCollection();
                    
                    // Show the whole layout
                    App.mainRegion.show(FoodViewLayout);

                    // FORM
                    FoodViewLayout.form.show(new FoodFormView({"model": FoodModel}));
                    
                    // LIST
                    FoodViewLayout.list.show(new FoodListView({collection: FoodCollection}));

                    FoodCollection.fetch();
                });
        },

        'showKitchen': function() {
            require(['modules/food/views/food_item_view', 'modules/food/models/food_item_model', 'application'],
                function(FoodItemView, FoodModel, App) {
                    var FoodModel = new FoodModel();

                    App.mainRegion.show(new FoodItemView({"model": FoodModel}));
                });
        },

        'showBeverages': function() {
            console.log("Drinks are shown here...");
        },

        'manageSuppliers': function() {
        }
    }
});
