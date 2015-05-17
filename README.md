# VENMO Coding Challenge

Credit Card form prototype built with Meteor. Features a fully functioning card form that:

* Validates a card number via the Luhn-10 Algorithm (Disregards CVV).
* Changes the card logo inside of the form depending on what type of card is being entered with a flip animation.
* If the card is invalid, the card box becomes a nice shade of red.
* When the form is submitted, it disables itself for three (3) seconds, inserts and logs an object with the input value.

Demo here: [ccform.meteor.com](http://ccform.meteor.com). You can use the test user info to login: **test // testtest**.

<!-- toc -->

* [How to use](#how-to-use)
  * [Requirements](#requirements)
  * [Installation](#installation)
  * [Deployments](#deployments)
  * [Configs](#configs)
  * [Template Helpers](#template-helpers)
  * [Constants](#constants)
  * [Stylesheets](#stylesheets)
  * [Templates](#templates)
* [Structure](#structure)
  * [Packages used](#packages-used)
  * [Folder structure](#folder-structure)
* [License](#license)

<!-- toc stop -->

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

### Configs

Configs to the accounts, alerts, router, and seo packages are located in:

```
/client/config/
```

### Template Helpers

Meteor makes use of spacebars which is similar to handlebars but made to work with Meteor. Helpers are great for adding logic and data contexts to your HTML templates.

I've defined all the helpers in:

```
/client/lib/spacebar_helpers.js
```

It's also possible to define your helpers in the template you're working with. For example, if you have a helper specific to your header or footer template you can define it to that specific template. The advantage of adding helpers in lib allows you to call them globally in any template.

### Constants

I defined some app constants in:

```
/client/lib/constants.js
```

Mainly static data like the app name and description as well as other meta data. I also created a card property array that I reference in a keyup event for the card form.

### Stylesheets

I make use of the less package when it comes to styling. The structure mirrors the templates structure so its easier to manage all your styles as the app grows in size.

I defined all variables used in the stylesheets in:

```
/client/stylesheets/utilities/variables.less
```
This lets you change all the apps brand hex, fonts, backgrounds, alerts, animation speeds, margin/padding sizes, widths, media queries, etc...

Most reusable component styles such as buttons, forms, etc will be found in:

```
/client/stylesheets/components/
```

Meanwhile, individual styles for views will be in:

```
/client/stylesheets/views/
```

### Templates



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
