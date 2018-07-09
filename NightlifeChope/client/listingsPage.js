import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';
//import { Listings } from '../server/main.js';

import '../templates/listingsTemplate.html';
import '../templates/adminTemplate.html';

Template.bookListing.events({
  'click book'(){
    Session.set('selectedListing', this);
  }
})

Template.registerHelper('currentListing', function(){
    console.log("Current listing:");
    console.log(Session.get('selectedListing'));
    return Session.get('selectedListing');
  });

Template.registerHelper('checkEq', (a, b) => a === b); //doesn't work in helpers.js???

Template.registerHelper('formatDate', function(datetime) {
  return moment(datetime).format("dddd, MMMM Do YYYY");
});

Template.listingsDisplay.onCreated(function listingsDisplayOnCreated() {
  Meteor.subscribe('listings');
});

Template.listingsDisplay.helpers({
  listings() {
    return Listings.find();
  },
  listingsFiltered() {
    var results = Listings.find({
      pax: { $gte : Session.get("queryNumPax")}, //search for >= num pax in ascending order
      type: { $in : Session.get("queryType")}, //queryType is an array e.g. ["bar","club"]
      price: { $lte : Session.get("queryPrice")},
      date: Session.get("queryDate"),
      },
      { sort : { pax : 1 }}
    );
    console.log(results.count() + " results found");
    return results;
  },

  // listingsFiltered() {
  //   // var tables =  Tistings.find({
  //   //   pax: { $gte : Session.get("queryNumPax")}, //search for >= num pax in ascending order
  //   //   type: { $in : Session.get("queryType")}, //queryType is an array e.g. ["bar","club"]
  //   //   price: { $lte : Session.get("queryPrice")},
  //   //   date: Session.get("queryDate"),
  //   //   },
  //   //   { sort : { pax : 1 }}
  //   // );

  //   return Listings.find({
  //     pax: { $gte : Session.get("queryNumPax")}, //search for >= num pax in ascending order
  //     type: { $in : Session.get("queryType")}, //queryType is an array e.g. ["bar","club"]
  //     price: { $lte : Session.get("queryPrice")},
  //     date: Session.get("queryDate"),
  //     },
  //     { sort : { pax : 1 }}
  //   );
  // },


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

Template.singleTable.helpers({
  listingsByTable(table) {
    console.log("Searching for listings with ID " + table);
    return Listings.find({tableID: table});
  } 
})

Template.resultsDisplay.helpers({
  listingsFiltered() {
    var results = Listings.find({
      pax: { $gte : Session.get("queryNumPax")}, //search for >= num pax in ascending order
      type: { $in : Session.get("queryType")}, //queryType is an array e.g. ["bar","club"]
      price: { $lte : Session.get("queryPrice")},
      date: Session.get("queryDate"),
      },
      { sort : { pax : 1 }}
    );
    console.log(results.count() + " results found");
    return results;
  },
})
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
    console.log("--- listing selected");

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
  'click .expand'() {
    Session.set('selectedListing', this);
    console.log("--- listing selected");
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

