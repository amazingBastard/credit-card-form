'use strict';

describe('Footer template', function() {

	it('should always show the copyright text', function() {
		var copy = document.createElement('p'),
		    comp = UI.render(Template.footer);

		UI.insert(comp, copy);

		expect($(copy).find('.copyright')[0]).toBeDefined();
	});
});
