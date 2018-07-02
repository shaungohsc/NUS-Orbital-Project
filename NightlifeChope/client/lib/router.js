FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('homeTemplate');
  }
});

FlowRouter.route('/faq', {
  name: 'home',
  action() {
    BlazeLayout.render('faqTemplate', {main: 'faqTemplate'});
  }
});

FlowRouter.route('/admin', {
  name: 'home',
  action() {
    BlazeLayout.render('adminTemplate', {main: 'adminTemplate'});
  }
});

FlowRouter.route('/contact', {
  name: 'home',
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

FlowRouter.route('/bookings', {
  name: 'bookings',
  action() {
    BlazeLayout.render('bookingsTemplate');
  }
});

FlowRouter.route('/bookingconfirmation', {
  name: 'bookingconfirmation',
  action() {
    BlazeLayout.render('confirmationTemplate');
  }
});
