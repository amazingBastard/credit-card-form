'use strict';

describe('About template', function() {

	it('should show the about view', function() {
		var div = document.createElement('div'),
		    comp = UI.render(Template.about);

		UI.insert(comp, div);

		expect($(div).find('.about')[0]).toBeDefined();
	});
});
