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

  var myStringArray = Meteor.cardProps;
  var arrayLength = myStringArray.length;
  for (var i = 0; i < arrayLength; i++) {
    console.log(myStringArray[i]);
    //Do something
  };

  // focus on input when template renders
  $input.focus();
};

Template['cardForm'].events({
	'keyup .card.form': function(e) {
		e.preventDefault();
		var $input = $('.card.input');

		// @TODO: refactor - loop

		if ($input.hasClass('visa')) {
			Session.set('cardIcon', 'fa-cc-visa');
      Session.set('iconAnimation', 'flipInY');
      $input.removeClass('unknown');
		}
		else if ($input.hasClass('amex')) {
			Session.set('cardIcon', 'fa-cc-amex');
      Session.set('iconAnimation', 'flipInY');
      $input.removeClass('unknown');
		}
		else if ($input.hasClass('discover')) {
			Session.set('cardIcon', 'fa-cc-discover');
      Session.set('iconAnimation', 'flipInY');
      $input.removeClass('unknown');
		}
		else if ($input.hasClass('mastercard')) {
			Session.set('cardIcon', 'fa-cc-mastercard');
      Session.set('iconAnimation', 'flipInY');
      $input.removeClass('unknown');
		} else {
			Session.set('cardIcon', 'fa-credit-card');
      Session.set('iconAnimation', '');
      $input.addClass('unknown');
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

      // insecure allows me to insert into the cards collection
      // ideally, you want this handled via method on the server
      // you would also secure the app behind a login
      // and only publish the cards collection to the logged in user
			Cards.insert(newCard);

      // flashing a message for ux purposes so user is aware of success
			sAlert.success('Your card was added!');

      // reseting the cardIcon session to the default state
      // as the card icon was changed through the keyup event
			Session.set('cardIcon', 'fa-credit-card');

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
        Session.set('animation', '');
      },1000);

      // focus back on the input and select the text
      // user most likely made a typo
			$input.focus();
      $input.select();
		}
  }
});
