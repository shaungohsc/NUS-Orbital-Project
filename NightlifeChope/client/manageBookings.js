import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';
import { Session } from 'meteor/session';

Template.manageBookingTemplate.onCreated(function manageBookingTemplateOnCreated() {
  Meteor.subscribe('listings');
});

Template.manageBookingTemplate.helpers({
  'codeEntered'(){
    return Session.get("codeEntered");
  },
  bookingsFiltered() {
    var booking = Listings.find({
      "booking.confirmationCode": Session.get("confirmationCode"),
    }).fetch();

    if (booking.length === 0) {
      console.log("invalid code");
      return false;
    }

    else {
      console.log("booking found");
      return booking[0];
    }
  },
});

Template.manageBookingTemplate.events({
  'submit .manageBookingsForm'(event) {
    Session.set("codeEntered", true);
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