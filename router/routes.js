Router.route('/', {
  name: 'root',
  data: function() {
    return Cards.find();
  },
  waitOn: function () {
    return [
      Meteor.subscribe('cards')
    ]
  },
  action: function () {
    if (this.ready())
      this.render('root');
    else
      this.render('loading');
  }
}, function () {
  SEO.set({ title: Meteor.App.NAME });
});

Router.route('/about', {
  name: 'about'
}, function () {
  SEO.set({ title: Meteor.App.NAME });
});
