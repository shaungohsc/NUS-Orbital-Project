import './html/navbar.html'

Template.navbar.helpers({
  template_name(){
    return Session.get("templateName")
  }
});

Template.navbar.events({
  'click .home'() {
    Session.set("templateName", "homeTemplate");
  },
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