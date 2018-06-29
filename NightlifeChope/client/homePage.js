import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Queries } from '../imports/api/queries.js';

Template.homeTemplate.helpers({
});

Template.homeTemplate.events({
  'submit .queryForm'(event) {
  	event.preventDefault();
  	console.log("Form submitted");
    console.log(event);

    var queryDate = event.target.date.value;
    var queryNumPax = event.target.pax.value;
    var queryBars = event.target.barsBool.checked;
    var queryClubs = event.target.clubsBool.checked;
    var createdBy = Meteor.user().username;

    console.log(queryDate + " " + queryNumPax + " " + queryClubs + " " + queryBars);
    Queries.insert({
    	date: event.target.date.value,
      pax: event.target.pax.value,
      barsBool: event.target.barsBool.checked,
      clubsBool: event.target.clubsBool.checked,
      user: Meteor.userId(),
      createdAt: new Date(),
    });
	}
});
