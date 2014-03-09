define([
	'backbone',
	'communicator',
    'router',
    'layout'
],
    
function( Backbone, Communicator, AppRouter, AppLayout) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add initializers here */
	App.addInitializer( function (options) {
        var Layout = new AppLayout();
        Layout.render();
        document.body.innerHTML = Layout.$el.html();
        Communicator.mediator.trigger("APP:START");

        /* Add application regions here - only after we have all necessary elements in HTML document */
        App.addRegions({
            'header': '#header',
            'navigation': '#navigation',
            'mainRegion': '#main-content'
        });
	});
    
    // Create Application router instance
    App.addInitializer(function (options) {
        App.router = new AppRouter();        
    });
    
    // Create listener for navigation item clicked
    App.addInitializer(function () {
        $('.nav.navbar-nav').on('click', 'li > a', function (e) {
            e.stopPropagation();
            
            // first, deselect currently selected item
            $('.nav.navbar-nav > li').removeClass("active");
            
            // next, highlight item's been clicked parent with "active" class
            $(this).parent().addClass("active");
        });
    });
    
    App.onStart = function() {
        // Mark current menu item as "active" if its href matches current URL
        Backbone.$('.nav.navbar-nav > li > a').each(function(){
            var elem = $(this);
            if (elem.attr("href").substr(1) === Backbone.history.fragment) {
                elem.parent().addClass("active");
            } else {
                elem.parent().removeClass("active");
            }
        });
    };
    
    App.addInitializer(function (options) {
        Backbone.history.start();
    });

    // FIXME: Find out where to add helper
    // HANDLEBARS HELPERS
//    var Handlebars = require(['handlebars']);    
//    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
//
//        switch (operator) {
//            case '==':
//                return (v1 == v2) ? options.fn(this) : options.inverse(this);
//            case '===':
//                return (v1 === v2) ? options.fn(this) : options.inverse(this);
//            case '<':
//                return (v1 < v2) ? options.fn(this) : options.inverse(this);
//            case '<=':
//                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
//            case '>':
//                return (v1 > v2) ? options.fn(this) : options.inverse(this);
//            case '>=':
//                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
//            case '&&':
//                return (v1 && v2) ? options.fn(this) : options.inverse(this);
//            case '||':
//                return (v1 || v2) ? options.fn(this) : options.inverse(this);
//            default:
//                return options.inverse(this);
//        }
//    });
    
	return App;
});
