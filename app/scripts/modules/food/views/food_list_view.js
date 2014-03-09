define(['backbone', 'modules/food/views/food_item_view'],
function (Backbone, FoodItemView) {
    "use strict";
    
    var FoodListView = Backbone.Marionette.CollectionView.extend({
        tagName: "ul",
        className: "item-list",
        
        itemView: FoodItemView,
        
        initialize: function() {
            this.collection = this.options.collection;
        }
    });
    
    return FoodListView;
});
