define(['backbone', 'hbs!modules/food/templates/form'], function (Backbone, FormViewTpl) {
    "use strict";
    
    // TODO: Fetch list of suppliers here
    
    var FoodFormView = Backbone.Marionette.ItemView.extend({
        template: FormViewTpl,

        className: "row",
        
        initialize: function(options) {
            var self = this;
            
            this.model = options.model;
            this.listenTo(this.model, "change", this.render());
            this.model.on("invalid", function(model, errors) {
                Backbone.$.each(errors, function (prop, error) {
                    self.$("#" + prop).parents(".form-group").addClass("has-error");
                });
            });
        },

        /**
         * We have to pass not only model, but list of suppliers as well
         * @override
         */
        serializeData: function () {
            return _.extend({
                    "suppliers": [{"name": "BKK"}, {"name": "Viking"}],
                    "measureOptions": [{"type": "pcs", "title": "Pieces"},
                                       {"type": "liters", "title": "Liters"},
                                       {"type": "kg", "title": "Kilos"}]
                },                
                this.model.toJSON());
        },
        
        events: {
            "click #submit_food": "doSave"
        },
        
        doSave: function (e) {
            // Remove styles from all input fields in order to re-validate
            this.$(".form-group").removeClass("has-error");
            
            e.preventDefault();
            e.stopPropagation();
            
            // Populate model with data from form
            this.model.set("title", this.$("#foodTitle").val());
            this.model.set("measure", this.$("#measureType").val());
            this.model.set("supplier", this.$("#supplier").val());
            
            // TODO: Upload picture; if successful - save the model
            
            this.model.save();
        }
    });
    
    return FoodFormView;        
});
