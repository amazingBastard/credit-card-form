# VENMO Coding Challenge

Credit Card form prototype built with Meteor.

Demo here: [ccform.meteor.com](http://ccform.meteor.com).

<!-- toc -->

* [Features](#features)
* [How to use](#how-to-use)
  * [Requirements](#requirements)
  * [Installation](#installation)
  * [Deployments](#deployments)
  * [SEO and other concerns](#seo-and-other-concerns)
  * [Adding allow rules for external URLs](#adding-allow-rules-for-external-urls)
* [Structure](#structure)
  * [Packages used](#packages-used)
  * [Folder structure](#folder-structure)
* [License](#license)

<!-- toc stop -->

## Features

* Fully functioning card form that:
  * Validates a card number via the Luhn-10 Algorithm. (Disregard CVV.)
  * Changes the card logo inside of the form depending on what type of card is being entered.
    * The logo flips (3D transforms) from default to card type (visa, master card, amex) upon recognition.
  * If the card is invalid, the card box becomes [a nice shade of] red.
  * When the form is submitted, it should disable itself for 3 seconds and log some sort of success.
  * Form built as a reusable front-end component.
* Styling the card form to match the mock up
  * Add hover and focus states to the button

## How to use

### Requirements

Make sure [Meteor is installed and up to date](https://www.meteor.com/install) or run:

```
curl https://install.meteor.com/ | sh
```

### Installation

```
cd mtr-ccform
meteor
```

### Deployments

It is highly recommended to use [Meteor Up](https://github.com/arunoda/meteor-up) for easy deployments.
Have a look at the repository for more information.

There are other ways to deploy to your server besides Meteor Up. Here is a [step by step guide from Digital Ocean](http://devo.ps/blog/deploy-your-meteor-apps-on-digital-ocean-in-5-minutes/).

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
client/ 				    # Client folder
  compatibility/      # Libraries which create a global variable
  config/             # Configuration files (on the client)
  lib/                # Library files that get executed first
  startup/            # Javascript files on Meteor.startup()
  stylesheets         # LESS files
	templates/			    # Contains all templates
    layouts/            # Router layouts
    views/              # All the views
    components/         # UI elements and components (i.e. forms, actions, etc...)
models/  				    # Model files, for each Meteor.Collection
private/            # Private files
public/             # Public files
router/             # All routes
server/				      # Server folder
  fixtures/           # Meteor.Collection fixtures defined
  lib/                # Server side library folder
  publications/       # Collection publications
  startup/            # On server startup
tests/              # All tests
```

## License
This project has an MIT License, see the LICENSE.txt for more information.
