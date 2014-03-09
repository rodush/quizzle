define(['backbone', 'hbs!tmpl/layout'],
    
function(Backbone, layoutTmpl) {
    'use strict';
        
    var AppLayout = Backbone.Marionette.Layout.extend({
        template: layoutTmpl({ copyYear: new Date().getFullYear()})
    });
    
    return AppLayout;
});
