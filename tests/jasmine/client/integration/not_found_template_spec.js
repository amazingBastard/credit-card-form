'use strict';

describe('Not Found template', function() {

	it('should show a redirect component', function() {
		var div = document.createElement('div'),
		    comp = UI.render(Template.notFound);

		UI.insert(comp, div);

		expect($(div).find('.redirect.component')[0]).toBeDefined();
	});
});
