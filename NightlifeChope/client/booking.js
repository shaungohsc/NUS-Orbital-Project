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
    console.log(Listings.find({_id : Session.get('selectedListing')._id}));
    Listings.update(Session.get('selectedListing')._id, {
      $set: { booking: newBooking
            },
    });
<<<<<<< HEAD

    // history.replaceState(null, null, '/bookingconfirmation');
    BlazeLayout.render('confirmationTemplate', {main: 'confirmationTemplate'});
=======
    console.log("After update:");
    console.log(Listings.find({_id : Session.get('selectedListing')._id}));
>>>>>>> 16923c7e07619ab2bac554853e39cb9dfc3e8b53
	}
});
