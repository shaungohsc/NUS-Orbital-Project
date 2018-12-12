import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Queries } from '../imports/api/queries.js';
import { Session } from 'meteor/session';
import noUiSlider from '../node_modules/materialize-css/extras/nouislider/nouislider.js';

Template.homeTemplate.onCreated(function homeTemplateOnCreated() {
  Meteor.subscribe('listings');
});

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
       'min': 01,
       'max': 2000
     },
     step: 1,
     snap: true,
     margin: 500,
     // Display colored bars between handles
     connect: true,
     direction: 'ltr',
     orientation: 'horizontal',

     tooltips: true,

  });
  console.log("slider created");
  console.log(this.$('#priceSlider'));
});

Template.homeTemplate.events({
  'click book'() {
    Session.set('selectedListing', this);
    console.Log("--- listing selected");
    console.log(this);
  },
  'submit .queryForm'(event) {
  	event.preventDefault();
  	console.log("Form submitted");
    console.log(event);

    var target = event.target;
    var queryDate = new Date(target.date.value);
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
