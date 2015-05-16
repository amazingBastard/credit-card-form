Template.registerHelper('inRoot', function() {
  return Session.get('inRoot');
});

Template.registerHelper('formAnimation', function(animationClass) {
  return Session.get(animationClass);
});

Template.registerHelper('cardIcon', function(iconClass) {
  return Session.get(iconClass);
});

Template.registerHelper('iconAnimation', function(animationClass) {
  return Session.get(animationClass);
});
