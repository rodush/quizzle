define([
	'backbone',
	'communicator',
    'router',
    'layout'
],

function( Backbone, Communicator, AppRouter, AppLayout) {
    'use strict';

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
        'header': 'header',
        'navigation':'#navigation',
        'mainContainer': '#content',
        'footer': 'footer'
    });

	/* Add initializers here */
	App.addInitializer( function (options) {
//		document.body.innerHTML = layoutTmpl({ copyYear: new Date().getFullYear()});
        var Layout = new AppLayout();
        Layout.render();
        document.body.innerHTML = Layout.$el.html();
        Communicator.mediator.trigger("APP:START");
	});
    
    App.addInitializer(function (options) {
        App.router = new AppRouter();
    });
    
    App.onStart = function() {
      console.log(App.navigation);  
    };
    
    App.addInitializer(function (options) {
        Backbone.history.start();
    });
    
	return App;
});
