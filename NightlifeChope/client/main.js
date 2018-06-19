import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Meteor.startup(function(){
    Router.addRoute('/home', 'homeTemplate');
    Router.addRoute('/admin', 'adminTemplate');
    Router.addRoute('/faq', 'faqTemplate');
    Router.addRoute('/contact', 'contactTemplate');

    Router.run();
});
