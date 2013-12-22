define(['backbone'], function (Backbone) {
    "use strict";
    
    var AppController = Backbone.Marionette.Controller.extend({
        'showFood': function() {
            console.log("Food is shown here...");
        },
        
        'showKitchen': function() {
            console.log("kitchen is shown now...");
        },
        
        'showBeverages': function() {
            console.log("Drinks are shown here...");
        }
    });
    
    return new AppController();
});
