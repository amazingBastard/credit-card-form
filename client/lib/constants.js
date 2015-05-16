// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error('Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Credit Card Form | Venmo Coding Challenge',
  DESCRIPTION: 'Credit Card form prototype built with Meteor.'
};

Meteor.cardProps = [
  {
    type: 'visa',
    icon: 'fa-cc-visa'
  },
  {
    type: 'amex',
    icon: 'fa-cc-amex'
  },
  {
    type: 'discover',
    icon: 'fa-cc-discover'
  },
  {
    type: 'mastercard',
    icon: 'fa-cc-mastercard'
  }
];
