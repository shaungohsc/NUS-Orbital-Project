import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';
//import { Listings } from '../server/main.js';

import '../templates/listingsTemplate.html';
import '../templates/adminTemplate.html';

Template.listingsDisplay.onCreated(function listingsDisplayOnCreated() {
  Meteor.subscribe('listings');
});

Template.listingsDisplay.helpers({
  listings() {
    return Listings.find();
  },
  listingsFiltered() {
    return Listings.find({
      pax: { $gte : Session.get("queryNumPax")}, //search for >= num pax in ascending order
      type: { $in : Session.get("queryType")}, //queryType is an array e.g. ["bar","club"]
    }, { sort : { pax : 1 }}
    );
  }, 
  // db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } ) -- sample
  currentListing() {
    console.log("Current listing:");
    console.log(Session.get('selectedListing'));
    return Session.get('selectedListing');
  },
  items: [
    { name: "foo", pet: "dog" },
    { name: "bar", pet: "cat" }
  ]
});

// Template.adminTemplate.helpers({
//   listings() {
//     return Listings.find();
//   },
//   // db.inventory.find( { $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )
//   currentListing() {
//     return Session.get('selectedListing');
//   },
//   items: [
//     { name: "foo", pet: "dog" },
//     { name: "bar", pet: "cat" }
//   ]
// });




Template.registerHelper('checkEq', (a, b) => a === b); //doesn't work in helpers.js???




Template.listingsDisplay.events({
  'click li'() {
  	console.log(this._id);
  },
  'click .delete'() {
    if(confirm('Delete listing?')){
      Listings.remove(this._id);
    }
  },
  'click .edit'() {
    Session.set('selectedListing', this);

    //To make sure the existing option is selected in the edit menu. Works but visually displays the previously selected listing's option
    //https://www.daftlogic.com/information-programmatically-preselect-dropdown-using-javascript.htm
    var paxOptions = document.getElementById("paxEdit").options;
    for ( var i = 0; i < paxOptions.length; i++ ) {
        if ( paxOptions[i].value == this.pax ) {
            paxOptions[i].selected = true;
            return;
        }
    }
    var typeOptions = document.getElementById("typeEdit").options;
    for ( var i = 0; i < typeOptions.length; i++ ) {
        if ( typeOptions[i].value == this.pax ) {
            typeOptions[i].selected = true;
            return;
        }
    }
    console.log(this);
  },
  'submit .editform'(event) {
    event.preventDefault();

    var listingName = event.target.name.value;
    var listingDesc = event.target.description.value;
    console.log(listingName + " " + listingDesc + " " + event.target.pax.value);

    Listings.update(this._id, {
      $set: { name: event.target.name.value,
              pax: event.target.pax.value,
              description: event.target.description.value,
            },
    });
  },
});
/*
  'submit .adminform'(event) {
    event.preventDefault();
    console.log("Form submitted");
    console.log(event);
    var listingName = event.target.name.value;
    var listingDesc = event.target.description.value;
    var createdBy = Meteor.user().username;

    console.log(listingName + " " + listingDesc + " " + createdBy);
    Listings.insert({
      name: event.target.name.value,
      pax: event.target.pax.value,
      description: event.target.description.value,
      createdBy: Meteor.userId(),
      createdAt: new Date()
    });
  }
});
*/
Template.home.events({
  'click li'() {
    console.log(this._id);
  },
  'click .delete'() {
    if(confirm('Delete listing?')){
      Listings.remove(this._id);
    }
  },
  'click .edit'() {
    Session.set('selectedListing', this);
    console.log(this);
  }
});

