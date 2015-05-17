Meteor.publish('cards', function() {
  return Cards.find({ownerId: this.userId});
});
