import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';

// Template.bookingTemplate.onCreated(function bookingTemplateOnCreated() {
//   Meteor.subscribe('listings');
// });

Template.bookingTemplate.helpers({
   currentListing() {
    console.log("Current listing:");
    console.log(Session.get('selectedListing'));
    return Session.get('selectedListing');
  },
});

Template.bookingTemplate.events({
  'submit .bookingForm'(event) {
  	event.preventDefault();
  	console.log("Booking Confirmed");
    console.log(event);

    var target = event.target;
    var bookingName = target.name.value;
    var bookingEmail = target.email.value;
    var bookingMobile = parseInt(target.mobile.value);
    var bookingPax = parseInt(target.pax.value);
    var bookingUser = Meteor.user().username;

    console.log(bookingName + " " + bookingEmail + " "
        + bookingMobile + " " + bookingPax + " " + bookingUser);

    var newBooking = {
      bookingName: target.name.value,
      bookingEmail: target.email.value,
      bookingMobile: parseInt(target.mobile.value),
      bookingPax: parseInt(target.pax.value),
      bookingUser: Meteor.userId(),
      createdAt: new Date(),
    }
    console.log("New booking:");
    console.log(newBooking);
    console.log("\n");

    // Listings.insert({
    //   bookingName: target.name.value,
    //   bookingEmail: target.email.value,
    //   bookingMobile: parseInt(target.mobile.value),
    //   bookingPax: parseInt(target.pax.value),
    //   bookingUser: Meteor.userId(),
    //   createdAt: new Date(),
    // });
    console.log("For the listing:");
    console.log(Session.get('selectedListing'));
    console.log("id: " + Session.get('selectedListing')._id);
    var id = Session.get('selectedListing')._id;

    console.log(Listings.find({_id : id}));

    console.log(Listings.find({_id : id}).count());
    console.log(Listings.find({_id : id}).fetch()[0]);
    Listings.update(id, {
      $set: { booking: newBooking
            },
    });

    // history.replaceState(null, null, '/bookingconfirmation');
    BlazeLayout.render('confirmationTemplate', {main: 'confirmationTemplate'});

    console.log("After update:");
    console.log(Listings.find({_id : id}).fetch()[0]);

    var updatedListing = Listings.find({_id : id}).fetch()[0];
    Session.set("selectedListing", updatedListing);
    console.log("submit .bookingForm done");
	}
});

Template.confirmationTemplate.helpers({
   confirmationCode() {
    var id = Session.get('selectedListing')._id;
    console.log(id);
    var first = id.substr(0,1);
    var lastFive = id.substr(12,5);
    return first.concat(lastFive);
  },
});
