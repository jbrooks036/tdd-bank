/* jshint expr:true */
/*global describe, it */

'use strict';

var expect = require('chai').expect;
var Bank = require('../../app/models/bank');


describe('Bank', function () {
  describe('constructor', function () {
  it('Should create a bank with arguments', function() {
  var chase = new Bank('chase');
  expect(chase.name).to.equal('chase');
  expect(chase.accounts).to.have.length(0);
  expect(chase).to.be.instanceof(Bank);
  });

  });
});
