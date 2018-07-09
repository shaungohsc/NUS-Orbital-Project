import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import './html/navbar.html'
import './html/main.html'

import { Listings } from '../imports/api/listings.js';
//import { Listings } from '../server/main.js';

Template.adminTemplate.helpers({
});

Template.adminTemplate.events({
  'submit .adminform'(event) {
  	event.preventDefault();

    //Call Meteor method
    // Meteor.call('listings.insert', event.target);

    console.log("Form submitted");
    console.log(event);
    var target = event.target;
    var listingName = target.name.value;
    var listingDesc = target.description.value;
    var createdBy = Meteor.user().username;
    var date = target.listingDate.value;
    // var date = ()  
<<<<<<< HEAD

    console.log(listingName + " " + listingDesc + " " + createdBy + " | " + target.venuetype.value);
    console.log(date);
    Listings.insert({
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    var tableID = target.tableID.value;
=======
    var table = Tables.find({tableID: tableID}).fetch()[0]; //get the associated table
    
    listingName = listingName == "" ? table.name : listingName;
    listingDesc = listingDesc == "" ? table.description : listingDesc;
    console.log(price);
    console.log("isNaN: " + isNaN(price));
    console.log("is 0 :" + price == 0);
    console.log("is blank: " + price == "");
    price = Object.is(price, NaN) ? table.price : price;
>>>>>>> parent of 3653d63... Revert "Merge branch 'master' of https://github.com/shaungohsc/NUS-Orbital-Project-201"

    console.log(listingName + " " + listingDesc + " " + createdBy + " | T." + tableID);
    console.log(date);
    Listings.insert({
<<<<<<< HEAD
      name: target.name.value,
      description: target.description.value,
=======
      name: listingName,
      description: listingDesc,
>>>>>>> parent of 3653d63... Revert "Merge branch 'master' of https://github.com/shaungohsc/NUS-Orbital-Project-201"
      price: parseInt(price),
      date: new Date(date),
      createdBy: Meteor.userId(),
      createdAt: new Date(),
<<<<<<< HEAD
      tableID: target.tableID.value
=======
      tableID: target.tableID.value,
      type: table.type,
      pax : table.pax
>>>>>>> parent of 3653d63... Revert "Merge branch 'master' of https://github.com/shaungohsc/NUS-Orbital-Project-201"
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
<<<<<<< HEAD
>>>>>>> parent of 783265b... Separated admin and customer listings view; listings inherit table info
=======
>>>>>>> parent of bc2ebee... Merge branch 'master' of https://github.com/shaungohsc/NUS-Orbital-Project-201
=======
>>>>>>> parent of bc2ebee... Merge branch 'master' of https://github.com/shaungohsc/NUS-Orbital-Project-201
=======
>>>>>>> parent of 3653d63... Revert "Merge branch 'master' of https://github.com/shaungohsc/NUS-Orbital-Project-201"
      name: target.name.value,
      pax: parseInt(target.pax.value),
      description: target.description.value,
      type: target.venuetype.value,
      price: parseInt(price),
      date: new Date(date),
      createdBy: Meteor.userId(),
      createdAt: new Date()
    });

    event.target.name.value = "";
    event.target.pax.value = 1;
    event.target.venuetype.value = 1;
    event.target.price.value = "1 ";
    event.target.description.value = "";
    event.target.listingDate.value = "";
    event.target.startTime.value = "";
    event.target.endTime.value = "";
	}
});



/*Meteor.publish("fileUploads", function () {
  console.log("publishing fileUploads");
  return YourFileCollection.find();
});*/
