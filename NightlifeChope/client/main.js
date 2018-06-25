import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

import './html/main.html';
import '../imports/api/listings.js';
import './listingsPage.js';
import './admin.js';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  // code to run on server at startup
});
