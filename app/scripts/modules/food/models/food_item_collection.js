define(['backbone', 'modules/food/models/food_item_model'],
function (backbone, FoodItemModel) {
    "use strict";
    
    var FoodItemCollection = Backbone.Collection.extend({
        url: '/api/v1/foods',
        model: FoodItemModel
    });
    
    return FoodItemCollection;
});
