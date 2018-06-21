import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './html/main.html';

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
  Session.setDefault("templateName", "homeTemplate")
});