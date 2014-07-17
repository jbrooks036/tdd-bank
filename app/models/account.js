'use strict';

function Account(number, name, deposit, type) {
  this.number = number;
  this.name = name;
  this.type = type;
  this.balance = deposit;
  this.deposits = [];
  this.withdrawls = [];
  this.penalties = 0;
  this.isSuspended = false;

}

Account.prototype.putIn = function(amount) {
  if (this.penalties > 3) {
    Account.isSuspended = true;
  } else {
    this.balance += amount; 
    this.deposits.push(amount);
  }
};

Account.prototype.withdraw = function(amount) {
  if (!Account.isSuspended) {
    this.balance -= amount; 
    this.withdrawls.push(amount);

    if (this.balance < 0) {
      this.balance -= 50;
      this.penalties++;
    }
    if (this.penalties > 3) {
      this.isSuspended = true;
    }
  }
};

module.exports = Account;
