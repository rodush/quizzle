define(['backbone', 'hbs!tmpl/layout'], function(Backbone, Layout_tmpl) {
    'use strict';

    var layoutTmpl = Layout_tmpl;

    var AppLayout = Backbone.Marionette.Layout.extend({
        template: layoutTmpl({ copyYear: new Date().getFullYear()}),
        regions: {
            'header': '#header',
            'menu': '#navigation',
            'content': '#content'
        }
    });
    
    return AppLayout;
});
