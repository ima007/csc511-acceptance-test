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
    const apollo = this.owner.lookup('service:apollo');

    sinon.stub(apollo, 'watchQuery').callsFake(function() {
      return RSVP.resolve(
        EmberObject.create({
          id: 'H4jJ7XB3CetIr1pg56CczQ',
          name: 'Levain Bakery'
        })
      );
    });

    sinon.stub(store, 'query').callsFake(function() {
      return RSVP.resolve(A());
    });

    await authenticateSession({
      userId: 1,
      displayName: 'Coolio'
    });

    await visit('/details/H4jJ7XB3CetIr1pg56CczQ');

    assert.equal(currentURL(), '/details/H4jJ7XB3CetIr1pg56CczQ');
    assert.dom('.sign-out').exists();
    assert.dom('.favorites').exists();
    assert.dom('h2').hasText('Levain Bakery');
    assert.dom('.save').exists();
  });

  test('visiting detail page saved', async function(assert) {
    const store = this.owner.lookup('service:store');
    const apollo = this.owner.lookup('service:apollo');

    const mockYelpPlace = {
      name: 'Chip NYC',
      id: 'TthttjDCINv6jOV28bEphg'
    };

    const favoriteModel = EmberObject.create({
      name: mockYelpPlace.name,
      yelpid: mockYelpPlace.id
    });

    const graphqlModelMock = EmberObject.create(mockYelpPlace);

    sinon.stub(apollo, 'watchQuery').callsFake(function() {
      return RSVP.resolve(graphqlModelMock);
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
