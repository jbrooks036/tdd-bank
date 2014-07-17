/* jshint expr:true */
/*global describe, it */

'use strict';

var expect = require('chai').expect;
var Account = require('../../app/models/account');


describe('Account', function () {
  describe('constructor', function () {
  it('Should create an account with arguments', function() {
    var sara = new Account(3,'sara', 1500, 'savings');
    expect(sara).to.be.instanceof(Account);
    expect(sara.number).to.equal(3);
    expect(sara.name).to.equal('sara');
    expect(sara.balance).to.equal(1500);
    expect(sara.type).to.equal('savings');
    expect(sara.deposits).to.have.length(0);
    expect(sara.withdrawls).to.have.length(0);
    });
  });

  describe('#deposit', function () {
    it('Should accept a number, name and deposit amount and return new balance and list of deposits', function(){
      //  var dep1 = (3, 'sara', 5000, 'savings');
      var sara = new Account(3,'sara', 1500, 'savings');
      sara.putIn(5000);
      expect(sara.balance).to.equal(6500);
      expect(sara.deposits.length).to.equal(1);
    });
  });

  describe('#withdraw', function () {
    it('withdraws money from balance', function () {
      var sara = new Account(3,'sara', 6500, 'savings');
      sara.withdraw(3000);
      expect(sara.balance).to.equal(3500);
      expect(sara.withdrawls.length).to.equal(1);
    });

   it('adds fee for overdraft', function () {
      var sara = new Account(3,'sara', 3500, 'savings');
      sara.withdraw(4000);
      expect(sara.balance).to.equal(-550);
      expect(sara.withdrawls.length).to.equal(1);
      expect(sara.penalties).to.equal(1);
   });

  it('suspends account for overdraft 3 times', function () {
    var sara = new Account(3, 'sara', 300, 'savings');
    sara.withdraw(400);
    sara.withdraw(400);
    sara.withdraw(400);
    sara.withdraw(400);
    expect(sara.balance).to.equal(-1500);
    expect(sara.withdrawls.length).to.equal(4);
    expect(sara.penalties).to.equal(4);
    expect(sara.isSuspended).to.be.true;
  });
 });

});
