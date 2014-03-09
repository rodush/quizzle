define(['backbone', 'hbs!modules/food/templates/layout'],
function (Backbone, FoodLayoutTpl) {
    'use strict';
        
    var FoodViewLayout = Backbone.Marionette.Layout.extend({
        template: FoodLayoutTpl,
        
        className: "row",
        
        regions: {
            "form": "#food-form-container",
            "list": "#food-list-container"
        }
    });
    
    return FoodViewLayout;
});
