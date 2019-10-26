# Acceptance Test Example

You will need to install `ember-sinon` via `ember install ember-sinon` for this example to work.

Check out `tests/acceptance/main-test.js` to see an acceptance test example. Note the usage of `sinon` to stub out the `query` and `watchQuery` methods for the store and apollo services.

Navigate to http://localhost:4200/tests/index.html to see all of your tests running. Try seeing if you can fix all the ESLint errors in your app.

Read more about creating application (acceptance) tests: https://guides.emberjs.com/release/testing/acceptance/


## Previous instructions:

This repo shows an example of how to query graphql with ember-apollo-client, using the Yelp API. It also shows an example proxy that can be leveraged.

This also demonstrates how to integrate firebase with a simple "Favorites" functionality.

To enable firebase, you will need to create your own Firebase app at https://firebase.google.com and enable Google sign-in authentication. Then, create a `firebase-config.js` file within the `config` directory, that includes the snippet provided for Web apps for Firebase:

```
exports.config = {
  firebase: {
    apiKey: 'yourSecretKey',
    authDomain: 'yourAuthDomain.firebaseapp.com',
    databaseURL: 'https://yourDatabaseUrl.firebaseio.com',
    projectId: 'yourProjectId',
    storageBucket: 'yourStorageBucket.appspot.com',
    messagingSenderId: 'yourMessagingSenderId',
    appId: 'yourAppId'
  }
};
```

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd ember-apollo-example`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
