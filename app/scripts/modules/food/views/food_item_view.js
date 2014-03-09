define(['backbone', 'hbs!modules/food/templates/item'],
function (Backbone, FoodItemTpl) {
    'use strict';

    var FoodItemView = Backbone.Marionette.ItemView.extend({
        template: FoodItemTpl,

        initialize: function(options) {
            this.model = options.model;
            this.on("change", this.model, this.render(), this);
        }
    });

    return FoodItemView;
});
