import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';
import { Session } from 'meteor/session';

Template.manageBookingTemplate.onCreated(function manageBookingTemplateOnCreated() {
  Meteor.subscribe('listings');
});

Template.manageBookingTemplate.helpers({
  bookingsFiltered() {
    var booking = Listings.find({
      "booking.confirmationCode": Session.get("confirmationCode"),
    }).fetch()[0];

    console.log("booking found");
    return booking;
  },
});

Template.manageBookingTemplate.events({
  'submit .manageBookingsForm'(event) {
    event.preventDefault();

    console.log(event.target.confirmationCode.value);
    Session.set("confirmationCode", event.target.confirmationCode.value);
  },
  'click .cancel_booking'() {
    if(confirm('Cancel booking?')){
      console.log(Listings.find({_id: this._id}).fetch()[0]);
      Listings.update(this._id, {
        $set: { booking: null },
      });
      alert("Booking cancelled.");
    }
  },
});