Cards = new Mongo.Collection('cards');

Cards.allow({
  insert: function (userId, doc) {
    return (userId && doc.ownerId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    return doc.ownerId === userId;
  },
  remove: function (userId, doc) {
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});

Cards.helpers({
  username: function() {
    user = Meteor.users.findOne({_id: this.userId});
    if (user) {
      return user.username;
    }
  },
  cards: function(username) {
    return Cards.find({username: username});
  }
});

Meteor.methods({
  insertCard: function(cardAttributes) {
    check(Meteor.userId(), String);

    var user = Meteor.userId(),
        now = moment(new Date());

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error('not-logged-in', 'You need to login to add a card');

    // ensure card input has a value
    if (!cardAttributes.excuse)
      throw new Meteor.Error('no-card-entry', 'Please enter your card numbers');

    // pick out the whitelisted keys
    var newCard = _.extend(_.pick(cardAttributes, 'card'), {
      ownerId: user._id,
      user: user.username,
      added: now
    });

    var cardId = Cards.insert(newCard);

    return cardId;
  }
});
