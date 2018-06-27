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
    var queryClub = event.target.clubsBool.value;
    var queryBar = event.target.barsBool.value;
    var createdBy = Meteor.user().username;

    console.log(queryDate + " " + queryNumPax + " " + queryClub + " " + queryBar);
    Queries.insert({
    	date: event.target.date.value,
      pax: event.target.pax.value,
    	club: event.target.clubsBool.value,
      bar: event.target.barsBool.value,
      user: Meteor.userId(),
      createdAt: new Date(),
    });
	}
});
