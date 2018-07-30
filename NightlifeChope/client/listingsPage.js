import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js';
import { Tables } from '../imports/api/listings.js';
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

Template.registerHelper('formatDateLikeInput', function(datetime) {
  return moment(datetime).format("MMM D, YYYY");
});

Template.listingsDisplay.onCreated(function listingsDisplayOnCreated() {
  Meteor.subscribe('listings');
  Meteor.subscribe('tables');
});

Template.listingsDisplay.helpers({
  listings() {
    return Listings.find();
  },
  listingsFiltered() {
    var results = Listings.find({
      pax: { $gte : Session.get("queryNumPax")}, //search for >= num pax in ascending order
      type: { $in : Session.get("queryType")}, //queryType is an array e.g. ["bar","club"]
      price: { $lte : Session.get("queryPrice")}, //max price
      date: Session.get("queryDate"),
      booking: null, //no booking made
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
  currentTable() {
    console.log("Current table:");
    console.log(Session.get('selectedTable'));
    return Session.get('selectedTable');
  },
  tables() {
    return Tables.find();
  },
  listingsByTable(table) {
    console.log("Searching for listings with ID " + table);
    return Listings.find({tableID: table});
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

Template.resultsDisplay.events({
  'click .expand'() {
    Session.set('selectedListing', this);
    console.log("--- listing selected");
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
  'click .delete_listing'() {
    if(confirm('Delete listing?')){
      Listings.remove(this._id);
    }
  },
  'click .edit_listing'() {
    Session.set('selectedListing', this);
    console.log("--- listing selected");
    console.log(this);
  },
  'click .delete_table'() {
    if(confirm('Delete table and all associated listings?')){
      console.log("this:");
      console.log(this);
      console.log(this.tableID);  
      // Listings.remove({tableID: tableID}); cannot work w untrusted code
      Meteor.call('removeListingsUnderTable', {
        tableID: this.tableID
      });
      Tables.remove(this._id);  
    }
  },
  'click .edit_table'() {
    Session.set('selectedTable', this);
    console.log("--- table selected");

    //To make sure the existing option is selected in the edit menu. Works but visually displays the previously selected listing's option
    //https://www.daftlogic.com/information-programmatically-preselect-dropdown-using-javascript.htm
    var paxOptions = document.getElementById("paxEdit").options;
    console.log("existing pax: " + this.pax);
    for ( var i = 0; i < paxOptions.length; i++ ) {
        if ( paxOptions[i].value == this.pax ) {
            paxOptions[i].selected = true;
            return;
        }
    }
    console.log("pax prefill done");
    var typeOptions = document.getElementById("typeEdit").options;
    console.log("existing type: " + this.type);
    for ( var i = 0; i < typeOptions.length; i++ ) {
        if ( typeOptions[i].value == this.type ) {
            typeOptions[i].selected = true;
            return;
        }
    }
    console.log(this);
  },
  'submit .edit_table_form'(event) {
    console.log('submit .edit_table_form');
    event.preventDefault();

    var target = event.target;
    var tableName = event.target.name.value;
    var tableDesc = event.target.description.value;
    var tablePrice = event.target.price.value;
    console.log(tableName + " " + tableDesc + " " + event.target.pax.value);

    // var oldTable = Tables.find({_id : this._id}).fetch()[0]

    // var oldTableName = oldTable.name;
    // var oldTableDesc = oldTable.description;
    // var oldTablePrice = oldTable.price;



    //update listings under this table, checking if they have overridden values (this value != old table value)
    Meteor.call('updateListingsUnderTable', {
      tableID: this.tableID, 
      inputTableName: tableName, 
      inputTableDesc: tableDesc, 
      inputTablePrice: tablePrice
    });

        //update this table
    Tables.update(this._id, {
      $set: { name: target.name.value,
              pax: parseInt(target.pax.value),
              description: target.description.value,
              type: target.venueType.value,
              price: parseInt(target.price.value),
              lastModified: new Date(),
            },
    });
  },
  'submit .edit_listing_form'(event) {
    console.log('submit .edit_listing_form');
    event.preventDefault();

    var listingName = event.target.name.value;
    var listingDesc = event.target.description.value;
    console.log(listingName + " " + listingDesc);

    Listings.update(this._id, {
      $set: { name: event.target.name.value,
              price: parseInt(event.target.price.value),
              description: event.target.description.value,
              date: new Date(event.target.listingDate.value)
            },
    });
  },
});
