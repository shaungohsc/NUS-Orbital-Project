import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';

export const Listings = new Mongo.Collection('listings');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('listings', function listingsPublication() {
  	/*if (!Session.get("searched")) {
    	return Listings.find(); //return all
    } else {
    	return Listings.find(); //to be changed
    }
    */
    return Listings.find();
  });
}
