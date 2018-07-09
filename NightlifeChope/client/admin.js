import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import './html/navbar.html'
import './html/main.html'

import { Listings } from '../imports/api/listings.js';
import { Tables } from '../imports/api/listings.js';
//import { Listings } from '../server/main.js';

Template.adminTemplate.helpers({
});

Template.adminTemplate.events({
  'submit .listingForm'(event) {
    event.preventDefault();

    //Call Meteor method
    // Meteor.call('listings.insert', event.target);

    console.log("Form submitted");
    console.log(event);
    var target = event.target;
    var listingName = target.name.value;
    var listingDesc = target.description.value;
    var price = target.price.valueAsNumber;
    var createdBy = Meteor.user().username;
    var date = target.listingDate.value;
    // var date = ()  
    var tableID = target.tableID.value;

    var table = Tables.find({tableID: tableID}).fetch()[0]; //get the associated table
    
    listingName = listingName == "" ? table.name : listingName;
    listingDesc = listingDesc == "" ? table.description : listingDesc;
    console.log(price);
    console.log("isNaN: " + isNaN(price));
    console.log("is 0 :" + price == 0);
    console.log("is blank: " + price == "");
    price = Object.is(price, NaN) ? table.price : price;

    console.log(listingName + " " + listingDesc + " " + createdBy + " | T." + tableID);
    console.log(date);
    Listings.insert({
      name: listingName,
      description: listingDesc,
      price: parseInt(price),
      date: new Date(date),
      createdBy: Meteor.userId(),
      createdAt: new Date(),
      tableID: target.tableID.value,
      type: table.type,
      pax : table.pax
    });

    target.name.value = "";
    target.price.value = "";
    target.description.value = "";
    target.listingDate.value = "";
    target.startTime.value = "";
    target.endTime.value = "";
  },

  'submit .tableForm'(event) {
    event.preventDefault();

    console.log("Table form submitted");
    console.log(event);
    var target = event.target;
    var tableName = target.name.value;
    var tableDesc = target.description.value;
    var price = target.price.value;
    var createdBy = Meteor.user().username;
    // var date = () 
    var tableID = target.tableID.value;

    console.log(tableName + " " + tableDesc + " " + createdBy + " | " + target.venueType.value);
    Tables.insert({
      name: target.name.value,
      pax: parseInt(target.pax.value),
      description: target.description.value,
      type: target.venueType.value,
      price: parseInt(price),
      createdBy: Meteor.userId(),
      createdAt: new Date(),
      tableID: target.tableID.value
    });

    target.name.value = "";
    target.pax.value = 1;
    target.venueType.value = 1;
    target.price.value = "1 ";
    target.description.value = "";
    target.tableID = "";
  }
});



/*Meteor.publish("fileUploads", function () {
  console.log("publishing fileUploads");
  return YourFileCollection.find();
});*/