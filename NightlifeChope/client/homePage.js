import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Queries } from '../imports/api/queries.js';
import { Session } from 'meteor/session'
import noUiSlider from 'nouislider';

Template.homeTemplate.helpers({
  'searched'(){
    return Session.get("searched");
  }
});

Template.homeTemplate.onRendered(function() {
   noUiSlider.create(this.$('#priceSlider')[0], { 
     connect: true, 
     range: { min: 0, max: 100 }, 
     start: [0, 50]
  });
  console.log("slider created");   
  console.log(this.$('#priceSlider'));
});

// var slider = document.getElementById('priceSlider');
//   noUiSlider.create(slider, {
//    start: [20, 80],
//    connect: true,
//    step: 1,
//    orientation: 'horizontal', // 'horizontal' or 'vertical'
//    range: {
//      'min': 0,
//      'max': 1000
//    },
//    format: wNumb({
//      decimals: 0
//    })
//   });

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
    // Session.set("queryBars", queryBars);
    // Session.set("queryClubs", queryClubs);
    if (queryBars && queryClubs) {
      Session.set("queryType", ["bar","club"]);
    } else if (queryBars) {
      Session.set("queryType", ["bar"]);
    } else {
      Session.set("queryType", ["club"]);
    }
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
