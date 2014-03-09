define(['backbone', 'underscore'], function(Backbone, _) {
    "use strict";
    
    var FoodItemModel = Backbone.Model.extend({
        idAttribute: "_id",
        
        callApi: function(mongooseOptions, fetchOptions) {
            fetchOptions = _.clone(fetchOptions || {})
            fetchOptions.data = {};
            
            if (mongooseOptions) {
                Object.keys(mongooseOptions).forEach(function(key, value) {
                    if (typeof value === "object") {
                        fetchOptions.data[key] = JSON.stringify(value);
                    } else {
                        fetchOptions.data[key] = value;
                    }
                });
            }
            
            return this.fetch(fetchOptions);
        },
        
        availableMeasures: [
            { "key": "pcs", "value": "Pieces"},
            { "key": "ltr", "value": "Liters"},
            { "key": "kg", "value": "Kilos"}
        ],
        
        defaults: {
            title: "Some food",
            image: "default_food.png",
            measure: "pcs",
            supplier: ""
        },
        
        validate: function (attrs, options) {
            var errors = {};
            if (!/\S+/.test(attrs.title)) {
                errors["foodTitle"] = "title could not be empty";
            }
            
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });
    
    return FoodItemModel;
});
