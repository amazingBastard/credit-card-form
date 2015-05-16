Template.cardForm.rendered = function() {
  var $input = $('.card.input');

  // set the formAnimation session to fadeInUp
  // @NOTE: all sessions are in /client/lib/spacebar_helpers.js
  Session.set('formAnimation', 'fadeInUp');

  // format card number for input on render
  // this validates the card input (only allows numbers, adds spaces for valid card numbers)
  // validation also toggles helper classes for card type or if number is unknown
  // here's the library: https://github.com/stripe/jquery.payment
  $input.payment('formatCardNumber');

  // set the cardIcon session to the default credit card icon
  Session.set('cardIcon', 'fa-credit-card');

  // focus on input when template renders
  $input.focus();
};

Template['cardForm'].events({
	'keyup .card.form': function(e) {
		e.preventDefault();
		var $input = $('.card.input'),
        cardProps = Meteor.cardProps,
        animationClass = 'flipInY',
        errorClass = 'unknown',
        defaultIcon = 'fa-credit-card';

    // if the input has a verified card type
    // add the icon of the card type with a flip animation
    // else if input is unknown
    // card icon will default and the input will turn red
    for (var i = 0; i < cardProps.length; i++) {
      if ($input.hasClass(cardProps[i].type)) {
        var cardIcon = cardProps[i].icon.toString();
        Session.set('cardIcon', cardIcon);
        Session.set('iconAnimation', animationClass);
        $input.removeClass(errorClass);
      } else if ($input.hasClass(errorClass)) {
        Session.set('cardIcon', defaultIcon);
        Session.set('iconAnimation', '');
      }
    }
	},
	'submit .card.form': function(e){
		e.preventDefault();

		var $form = $('.card.form'),
		    $input = $('.card.input'),
		    inputValue = $input.val(),
		    validCard = $.payment.validateCardNumber(inputValue),
				speed = 3000;

    // check if card is valid or not
		if (validCard) {
      // if valid, make object with card value for db insert
      // card value encryped with CryptoJS MD5
      // library is here: https://code.google.com/p/crypto-js/#MD5
      var encryptedValue = CryptoJS.MD5(inputValue).toString(),
			    newCard = {
				    card: encryptedValue
			    };

      // log the successful card form submit
			console.log('New card: ' + newCard);

      // for now a simple clientside insert does the trick
			Cards.insert(newCard);
      // @NOTE: the insecure package allows me to easily insert anything into the db
      // although this makes it easier to test a prototype
      // ideally, you want this handled via methods on the server
      // you would also secure the app behind a login
      // and only publish the cards collection to the logged in user
      // the Mongol package allows you to insepct your database in the browser
      // press CTRL + M to use Mongol
      // you can also type meteor mongo in the terminal
      // or query your collections from the console

      // flashing a message for ux purposes so user is aware of success
			sAlert.success('Your card was added!');

      // reseting the cardIcon session to the default state
      // as the card icon was changed through the keyup event
			Session.set('cardIcon', 'fa-credit-card');
      Session.set('iconAnimation', '');

      // resetting the form so user can easily add a new card
			$form[0].reset();

      // disable the form for 3 seconds
      // alert and form disable have the same timout
			$('.card.form :input').prop('disabled', true);
			setTimeout(function() {
				$('.card.form :input').prop('disabled', false);
        // focus back on input so user can easily add a new card
				$input.focus();
			}, speed);
		} else {
      // log the submit error
			console.log('Invalid credit card: ' + inputValue);

      // let the user know his card was invalid
			sAlert.error('That\'s not a valid card!');

      // input gets unknown class so box turns red
      $input.addClass('unknown');

      // set the formAnimation session to shake
      // shakes the form - visual error cue for user
      Session.set('formAnimation', 'shake');

      // remove the shake class when animation ends
      // so that shake animation can play again
      // if user makes another error
      setTimeout(function() {
        Session.set('formAnimation', '');
      },1000);

      // focus back on the input and select the text
      // user most likely made a typo
			$input.focus();
      $input.select();
		}
  }
});
