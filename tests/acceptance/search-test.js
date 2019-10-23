import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | search', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /search', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
  });
});
