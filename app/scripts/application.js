define([
	'backbone',
	'communicator',
	'hbs!tmpl/layout'
],

function( Backbone, Communicator, Layout_tmpl ) {
    'use strict';

	var layoutTmpl = Layout_tmpl;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
        'navigation':'#navigation',
        'mainContainer': '#content'
    });

	/* Add initializers here */
	App.addInitializer( function () {
		document.body.innerHTML = layoutTmpl({ copyYear: new Date().getFullYear()});
		Communicator.mediator.trigger("APP:START");
	});
    
    App.addInitializer(function() {
        
    });
    
    App.addInitializer(function () {
        Backbone.history.start();
    });

	return App;
});
