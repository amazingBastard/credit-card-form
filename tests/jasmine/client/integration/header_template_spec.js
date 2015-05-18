'use strict';

describe('Header template', function() {

	it('should show a link to the about view if the current route is /', function() {
		spyOn(UI._globalHelpers, 'inRoot').and.returnValue(true);

		var route = _.findWhere(Router.routes, {name: 'root'}),
		    link = document.createElement('a'),
		    comp = UI.render(Template.header);

		UI.insert(comp, link, route);

		expect($(link).find('#about')[0]).toBeDefined();
		expect($(link).find('#root')[0]).not.toBeDefined();
	});
 
	it('should show a link to the root view if the current route is /about', function() {
		spyOn(UI._globalHelpers, 'inRoot').and.returnValue(false);

		var route = _.findWhere(Router.routes, {name: 'about'}),
		    link = document.createElement('a'),
		    comp = UI.render(Template.header);

		UI.insert(comp, link, route);

		// @TODO: test the inRoot helper's else condition

		//expect($(link).find('#root')[0]).toBeDefined();
		//expect($(link).find('#about')[0]).not.toBeDefined();
	});

	it('should always show the logo', function() {
		var image = document.createElement('img'),
		    comp = UI.render(Template.header);

		UI.insert(comp, image);

		expect($(image).find('.logo')[0]).toBeDefined();
	});
});
