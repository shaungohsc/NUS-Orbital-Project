import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Meteor.startup(() => {
  // code to run on server at startup
  //Session.setDefault("templateName", "homeTemplate")
});
/*
Template.body.helpers({
  template_name(){
    return Session.get("templateName")
  }
});

Template.body.events({
  'click .faq'() {
    Session.set("templateName", "faqTemplate");
  },
  'click .contact'() {
     Session.set("templateName", "contactTemplate");
  },
  'click .admin'() {
     Session.set("templateName", "adminTemplate");
  }
});
*/