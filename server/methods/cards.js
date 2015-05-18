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
