FlowRouter.route('/home', {
  name: 'home',
  action() {
    BlazeLayout.render('homeTemplate');
  }
});

/*FlowRouter.route('/listings', {
  name: 'listings',
  action() {
    BlazeLayout.render('listingsTemplate');
  }
});
*/


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
