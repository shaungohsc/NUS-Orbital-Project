import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';
import { Session } from 'meteor/session';

Template.manageBookingTemplate.helpers({
  bookingsFiltered() {
    var booking = Listings.find({
      _id: Session.get("confirmationCode"),
    });

    console.log("booking found");
    return booking;
  },
});

Template.manageBookingTemplate.events({
  'submit .manageBookingsForm'(event) {
    event.preventDefault();

    console.log(event.target.confirmationCode.value);
    Session.set("confirmationCode", event.target.confirmationCode.value);
  }
});
