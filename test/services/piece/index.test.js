'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('piece service', function() {
  it('registered the pieces service', () => {
    assert.ok(app.service('pieces'));
  });
});
