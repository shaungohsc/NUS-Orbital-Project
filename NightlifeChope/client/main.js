import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './html/main.html';
import '../imports/api/listings.js';
import './listingsPage.js';
import './admin.js';
import '../imports/startup/accounts-config.js';

/*
Meteor.startup(function(){
    Router.addRoute('/home', 'homeTemplate');
    Router.addRoute('/admin', 'adminTemplate');
    Router.addRoute('/faq', 'faqTemplate');
    Router.addRoute('/contact', 'contactTemplate');

    Router.run();
});

*/
Meteor.startup(() => {
  // code to run on server at startup
});
