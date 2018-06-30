import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Queries } from '../imports/api/queries.js';
import { Session } from 'meteor/session'

Template.homeTemplate.helpers({
  'searched'(){
    return Session.get("searched");
  }
});

Template.homeTemplate.events({
  'submit .queryForm'(event) {
  	event.preventDefault();
  	console.log("Form submitted");
    console.log(event);

    var target = event.target;
    var queryDate = target.date.value;
    var queryNumPax = parseInt(target.pax.value);
    var queryBars = target.barsBool.checked;
    var queryClubs = target.clubsBool.checked;
    var createdBy = Meteor.user().username;

    console.log(queryDate + " " + queryNumPax + " " + queryClubs + " " + queryBars);
    Session.set("queryDate", queryDate);
    Session.set("queryNumPax", queryNumPax);
    Session.set("queryBars", queryBars);
    Session.set("queryClubs", queryClubs);
    Session.set("searched", true);

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
