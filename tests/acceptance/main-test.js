import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import DS from 'ember-data';
import { A } from '@ember/array';
import RSVP from 'rsvp';
import sinon from 'sinon';
import EmberObject from '@ember/object';

module('Acceptance | main page', function(hooks) {
  let sandbox = sinon.createSandbox();
  setupApplicationTest(hooks);

  hooks.after(function() {
    sandbox.restore();
  });

  test('visiting application route signed out', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('.sign-in').exists();
  });

  test('visiting application signed in', async function(assert) {
    await authenticateSession({
      userId: 1,
      displayName: 'Coolio'
    });
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('.sign-out').exists();
    assert.dom('.favorites').exists();
  });

  test('visiting detail page', async function(assert) {
    const store = this.owner.lookup('service:store');

    sinon.stub(store, 'query').callsFake(function() {
      return RSVP.resolve(A());
    });

    await authenticateSession({
      userId: 1,
      displayName: 'Coolio'
    });

    await visit('/details/TthttjDCINv6jOV28bEphg');

    assert.equal(currentURL(), '/details/TthttjDCINv6jOV28bEphg');
    assert.dom('.sign-out').exists();
    assert.dom('.favorites').exists();
    assert.dom('h2').hasText('Chip NYC');
    assert.dom('.save').exists();
  });

  test('visiting detail page saved', async function(assert) {
    const store = this.owner.lookup('service:store');

    const favoriteModel = EmberObject.create({
      name: 'Chip NYC',
      yelpid: 'TthttjDCINv6jOV28bEphg'
    });

    sinon.stub(store, 'query').callsFake(function() {
      return DS.PromiseArray.create({
        promise: RSVP.resolve(A([favoriteModel]))
      });
    });

    await authenticateSession({
      userId: 1,
      displayName: 'Coolio'
    });

    await visit('/details/TthttjDCINv6jOV28bEphg');

    assert.equal(currentURL(), '/details/TthttjDCINv6jOV28bEphg');
    assert.dom('.sign-out').exists();
    assert.dom('.favorites').exists();
    assert.dom('h2').hasText('Chip NYC');
    assert.dom('.unsave').exists();
  });
});
