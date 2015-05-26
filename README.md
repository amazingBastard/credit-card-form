# Coding Challenge

Credit Card form prototype built with Meteor. Features a fully functioning card form that:

* Validates a card number via the Luhn-10 Algorithm (Disregards CVV).
* Changes the card logo inside of the form depending on what type of card is being entered with a flip animation.
* If the card is invalid, the card box becomes a nice shade of red.
* When the form is submitted, it disables itself for three (3) seconds, inserts and logs an object with the input value.

Demo here: [ccform.meteor.com](http://ccform.meteor.com). You can use the test user info to login: **test // testtest**.

<!-- toc -->

* [Installation](#installation)
  * [Requirements](#requirements)
  * [Localhost](#localhost)
  * [Deployments](#deployments)
* [Documentation](#documentation)
  * [Configs](#configs)
  * [Template Helpers](#template-helpers)
  * [Constants](#constants)
  * [Stylesheets](#stylesheets)
  * [Templates](#templates)
  * [Models](#models)
  * [Router](#router)
  * [Server](#server)
  * [Tests](#tests)
* [Structure](#structure)
  * [Packages used](#packages-used)
  * [Folder structure](#folder-structure)
* [License](#license)

<!-- toc stop -->

## Installation

### Requirements

Make sure [Meteor is installed and up to date](https://www.meteor.com/install) or run:

```
curl https://install.meteor.com/ | sh
```

### Localhost

Run a local server with the meteor command

```
cd mtr-ccform
meteor
```

### Deployments

Most would recommended to use [Meteor Up](https://github.com/arunoda/meteor-up) for easy deployments.
Have a look at the repository for more information.

There are other ways to deploy to your server besides Meteor Up. Here is a [step by step guide from Digital Ocean](http://devo.ps/blog/deploy-your-meteor-apps-on-digital-ocean-in-5-minutes/).

You can also use Meteor's native deployment (this is how I deployed the demo). This could be a good way to test your app in a production environment without any heavy lifting. So far, it's only possible to deploy to the meteor url using this method.

```
meteor deploy yourappname.meteor.com
```

## Documentation

### Stripe jQuery Payments

Credit Card validation is accomplished with the [jQuery Payment Meteor Package](https://github.com/jpatzer/meteor-jquery-payment). Have a look at the repository for more information.

I make use of the formatCardNumber function so that all inputs of cards in the form will be validated for card type and validity. If the card is valid, it will add spaces every four numbers.

```
$('.card.input').payment('formatCardNumber');
```

I also use the validateCardNumber function to make sure the card that was entered was valid before it's submitted.

```
$.payment.validateCardNumber(inputValue)
```

Take a look at **/client/templates/components/forms/card_form.js** to see the full code for the card form.

### Configs

Configs to the accounts, alerts, router, and seo packages are located in: **/client/config/**

These are generally configs for packages that are used throughout the app. It's nice to put them in one place for easy access.

### Template Helpers

Meteor makes use of spacebars which is similar to handlebars but made to work with Meteor. Helpers are great for adding logic and data contexts to your HTML templates.

I've defined all the helpers in: **/client/lib/spacebar_helpers.js**

It's also possible to define your helpers in the template you're working with. For example, if you have a helper specific to your header or footer template you can define it to that specific template. The advantage of adding helpers in lib allows you to call them globally in any template.

### Constants

I defined some app constants in: **/client/lib/constants.js**

Mainly static data like the app name and description as well as other meta data. I also created a card property array that I reference in a keyup event for the card form.

Generally, having static data like this isn't best practice but using constants for small apps and prototypes could save a lot of headaches from having to pull them from the server.

### Stylesheets

I make use of the less package when it comes to styling. The structure mirrors the templates structure so its easier to manage all your styles as the app grows in size.

I defined all variables used in the stylesheets in: **/client/stylesheets/utilities/variables.less**

This lets you change all the apps brand hex, fonts, backgrounds, alerts, animation speeds, margin/padding sizes, widths, media queries, etc...

Most reusable component styles such as buttons, forms, etc will be found in: **/client/stylesheets/components/**

Meanwhile, individual styles for views will be in: **/client/stylesheets/views/**

### Templates

Templates can be inserted anywhere in your app like so:

```
{{> yourTemplateName}}
```

I try to break down my templates into components I can reuse later. For example, if I have a similar form for creating and editing a post, it would be better if these two views call the same postForm template. Different form actions can then be toggled with the use of helpers depending on which view the user is on.

### Models

Models is where you'll place all the database collections. In this example there's only the Cards collection.

Besides defining the global variable Cards as a new Mongo collection. We also setup the crud allow rules. Since we only want logged in users inserting new cards, we establish an owner with the current user's id.

Using the collection_helpers package we can add helpers on the server side for your collections. This gives us an added advantage since we won't need to subscribe to the collection on the client.

We can also add Methods to the collection via the Meteor.method function. In this example I just created a method to insert new cards. I placed the methods in the server: **/server/methods/cards.js**

You can find the code for the cards model in: **/models/cards.js**

### Router

The app uses the iron:router package to give us routing functionality. We can also create routes for the server but in this example I've only created two routes: **/ and /about**. These routes live in: **/router/routes.js**

### Server

All server related code should be placed in the server dir. Meteor is smart enough to know that code in the server dir should be run on the server. Likewise, anything in the client dir will run on the client.

Since this example is client heavy, a lot of the code can be found on the client, specifically in the card_form file.

The server usually handles things related to the database, such as publications: **/server/publications/cards.js** and **/server/methods/cards.js**

In publications I'm just publishing the Cards collection for the current user. This allows me to manage what gets sent to the client. Since we don't need everyone's cards pushed to the client, we're only publishing the current users cards. This makes the app faster in the long run once our database grows.

The server method is also pretty straight forwards. insertCard just checks if user is logged in and if a value was entered. Then it inserts the new card into the collection.

### Tests

Testing is handled by the [Velocity package](http://velocity.meteor.com/). I decided to use the Jasmine framework since I'm more familiar with it but Velocity gives you the options to use mocha, cucumber, robot, etc...

When you run the app locally, an HTML reporter will be available so you can check the status of the tests. The velocity reporter can be toggled with the button on the top right.

All the tests will be in the tests directory. I didn't have enough time to complete all the tests but you'll fund samples of the tests I did manage to finish.

## Structure

### Packages used

* Meteor Core
  * [meteor-platform](https://github.com/meteor/meteor/tree/devel/packages/meteor-platform)
* Accounts
  * [accounts-password](https://github.com/meteor/meteor/tree/devel/packages/accounts-password)
  * [useraccounts:unstyled](https://github.com/meteor-useraccounts/core)
* Collections
  * [dburles:collection-helpers](https://github.com/dburles/meteor-collection-helpers/)
* Routing
  * [iron:router](https://github.com/iron-meteor/iron-router)
* Security
  * [jparker:crypto-core](https://github.com/p-j/meteor-crypto-core)
  * [jparker:crypto-md5](https://github.com/p-j/meteor-crypto-md5)
* UI and UX
  * [fastclick](https://github.com/meteor/meteor/tree/devel/packages/fastclick)
  * [fortawesome:fontawesome](https://github.com/MeteorPackaging/Font-Awesome/)
  * [natestrauser:animate-css](https://github.com/nate-strauser/meteor-animate-css)
  * [jeffpatzer:jquery-payment](https://github.com/stripe/jquery.payment)
  * [juliancwirko:s-alert](https://github.com/juliancwirko/meteor-s-alert/)
* Development
  * [msavin:mongol](https://github.com/msavin/Mongol)
  * [less](https://github.com/meteor/meteor/tree/devel/packages/less)
  * [momentjs:moment](https://github.com/moment/moment/)
* Testing
  * [sanjo:jasmine](https://github.com/Sanjo/meteor-jasmine)
  * [velocity:html-reporter](https://github.com/meteor-velocity/html-reporter/)

### Folder structure

```
client/             # Client folder
  compatibility/      # Libraries which create a global variable
  config/             # Configuration files (on the client)
  lib/                # Library files that get executed first
  startup/            # Javascript files on Meteor.startup()
  stylesheets         # LESS files
  templates/          # Contains all templates
    layouts/            # Router layouts
    views/              # All the views
    components/         # UI elements and components (i.e. forms, actions, etc...)
models/             # Model files, for each Meteor.Collection
private/            # Private files
public/             # Public files
router/             # All routes
server/             # Server folder
  fixtures/           # Meteor.Collection fixtures defined
  lib/                # Server side library folder
  publications/       # Collection publications
  startup/            # On server startup
tests/              # All tests
  client/             # client tests
    integration/        # integration tests
    unit/               # unit tests
  server/             # server tests
    integration/        # integration tests
    unit/               # unit tests
```

## License
This project has an MIT License, see the LICENSE.txt for more information.
