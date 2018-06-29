import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import { Session } from 'meteor/session'

import './html/main.html';
import '../imports/api/listings.js';
import './listingsPage.js';
import './admin.js';
import '../imports/startup/accounts-config.js';

Meteor.startup(() => {
  Meteor.subscribe("listingsDisplay");
});
