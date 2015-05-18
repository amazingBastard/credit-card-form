Cards = new Mongo.Collection('cards');

Card = function (id, name, capacity, owner) {
    this._id = id;
    this._name = name;
    this._capacity = capacity;
    this._owner = owner;
};

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

    var userId = Meteor.userId(),
        now = new Date();

    // ensure the user is logged in
    if (!userId) {
      throw new Meteor.Error('not-logged-in', 'You need to login to add a card');
    }
    // ensure card input has a value
    if (!cardAttributes.card) {
      throw new Meteor.Error('no-card-entry', 'Please enter a valid card number');
    } else {
      // pick out the whitelisted keys
      var newCard = _.extend(_.pick(cardAttributes, 'card'), {
        ownerId: userId,
        added: now
      });

      var cardId = Cards.insert(newCard);

      return cardId;
    }
  }
});
