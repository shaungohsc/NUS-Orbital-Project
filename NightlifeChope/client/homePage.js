import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Queries } from '../imports/api/queries.js';
import { Session } from 'meteor/session';
//import noUiSlider from 'nouislider';
// import noUiSlider from '../imports/noUiSlider.11.1.0/nouislider.js';
import noUiSlider from '../node_modules/materialize-css/extras/nouislider/nouislider.js';

Template.homeTemplate.helpers({
  'searched'(){
    return Session.get("searched");
  }
});

Template.homeTemplate.onRendered(function() {
   noUiSlider.create(this.$('#priceSlider')[0], {
     behaviour: 'tap',
     connect: true,
     start: [300, 1500],
     range: {
       'min': 200,
       'max': 2000
     },
     step: 50,
     snap: true,
     margin: 500,
     limit: 1800,
     // Display colored bars between handles
     connect: true,
     direction: 'ltr',
     orientation: 'horizontal',

     tooltips: true,

  });
  console.log("slider created");
  console.log(this.$('#priceSlider'));
});

/*
 var range = document.getElementById('priceSlider');
   noUiSlider.create(range, {
     behaviour: 'tap',
     connect: true,
     start: [300, 1500],
     range: {
       'min': 200,
       'max': 2000
     },
     step: 50,
     snap: true,
     // ... must be at least 300 apart
     margin: 500,
     // ... but no more than 600
     limit: 1800,
     // Display colored bars between handles
     connect: true,
     // display orientation
     direction: 'ltr',
     orientation: 'horizontal',

     tooltips: true,

     pips: {
       mode: 'steps',
       stepped: true,
       density: 2
     }
   });
*/

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
    var queryPrice = parseInt(target.price.value);
    var createdBy = Meteor.user().username;

    console.log(queryDate + " " + queryNumPax + " "
        + queryClubs + " " + queryBars + " " + queryPrice);
    Session.set("queryDate", queryDate);
    Session.set("queryNumPax", queryNumPax);
    Session.set("queryPrice", queryPrice);
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
      price: event.target.price.value,
      user: Meteor.userId(),
      createdAt: new Date(),
    });
	}
});
