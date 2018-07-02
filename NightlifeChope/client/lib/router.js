FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('homeTemplate');
  }
});

FlowRouter.route('/faq', {
  name: 'faq',
  action() {
    BlazeLayout.render('faqTemplate', {main: 'faqTemplate'});
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action() {
    BlazeLayout.render('adminTemplate', {main: 'adminTemplate'});
  }
});

FlowRouter.route('/contact', {
  name: 'contact',
  action() {
    BlazeLayout.render('contactTemplate', {main: 'contactTemplate'});
  }
});

FlowRouter.route('/example', {
  name: 'materilize demo',
  action() {
    BlazeLayout.render('example', {main: 'example'});
  }
});

FlowRouter.route('/booking', {
  name: 'booking',
  action() {
    BlazeLayout.render('bookingTemplate', {main: 'bookingTemplate'});
  }
});

FlowRouter.route('/bookingconfirmation', {
  name: 'bookingconfirmation',
  action() {
    BlazeLayout.render('confirmationTemplate', {main: 'confirmationTemplate'});
  }
});
