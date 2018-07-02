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
    console.log(newBooking);

    // Listings.insert({
    //   bookingName: target.name.value,
    //   bookingEmail: target.email.value,
    //   bookingMobile: parseInt(target.mobile.value),
    //   bookingPax: parseInt(target.pax.value),
    //   bookingUser: Meteor.userId(),
    //   createdAt: new Date(),
    // });

    Listings.update(Session.get('selectedListing')._id, {
      $set: { booking: newBooking
            },
    });
	}
});