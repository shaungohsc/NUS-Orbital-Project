import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './html/main.html';

Meteor.startup(() => {
});

Template.homeTemplate.onRendered(function() {
  $('select').material_select();
});
