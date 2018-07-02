import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';


Template.bookingTemplate.helpers({

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

    Listings.insert({
      bookingName: target.name.value,
      bookingEmail: target.email.value,
      bookingMobile: parseInt(target.mobile.value),
      bookingPax: parseInt(target.pax.value),
      bookingUser: Meteor.userId(),
      createdAt: new Date(),
    });
	}
});
