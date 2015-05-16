Router.route('/', {
  name: 'root',
  data: function() {
    return Cards.find();
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
  name: 'about',
  action: function () {
    if (this.ready())
      this.render('about');
    else
      this.render('loading');
  }
}, function () {
  SEO.set({ title: Meteor.App.NAME });
});
