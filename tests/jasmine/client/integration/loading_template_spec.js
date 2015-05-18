'use strict';

describe('Loading template', function() {

	it('should show a loading component', function() {
		var div = document.createElement('div'),
		    comp = UI.render(Template.loading);

		UI.insert(comp, div);

		expect($(div).find('.loading.component')[0]).toBeDefined();
	});
});
