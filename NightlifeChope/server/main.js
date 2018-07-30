import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js'
import { Tables } from '../imports/api/listings.js'
import { Queries } from '../imports/api/queries.js'

Meteor.startup(() => {
	Meteor.methods({
		'removeListingsUnderTable'({ tableID }) {
			console.log("Removing all listings with ID " + tableID);
			Listings.remove({tableID: tableID});
		},
		'updateListingsUnderTable'({ tableID, inputTableName, inputTableDesc, inputTablePrice }) {
			console.log(tableID + " " + inputTableName + " " + inputTableDesc + " " + inputTablePrice);

		    var oldTable = Tables.find({tableID : tableID}).fetch()[0]

		    var oldTableName = oldTable.name;
		    var oldTableDesc = oldTable.description;
		    var oldTablePrice = oldTable.price;

			var listingsUnderTable = Listings.find({tableID : tableID}).fetch();
			console.log(listingsUnderTable.length + " listings found with ID " + tableID);
		    for (var i = 0; i < listingsUnderTable.length; i++) {
		      var newTableName = inputTableName;
		      var newTableDesc = inputTableDesc;
		      var newTablePrice = inputTablePrice;
		      var id = listingsUnderTable[i]._id;
		      if (listingsUnderTable[i].name != oldTableName) {
		        newTableName = listingsUnderTable[i].name;
		        console.log("Name diff, " + listingsUnderTable[i].name + " instead of " + oldTableName);
		      }
		      if (listingsUnderTable[i].description != oldTableDesc) {
		        newTableDesc = listingsUnderTable[i].description;
		        console.log("Desc diff, " + listingsUnderTable[i].description + " instead of " + oldTableDesc);
		      }
		      if (listingsUnderTable[i].price != oldTablePrice) {
		        newTablePrice = listingsUnderTable[i].price;
		        console.log("Price diff, " + listingsUnderTable[i].price + " instead of " + oldTablePrice);
		      }
		      Listings.update(id, {
		         $set: { name: newTableName,
		              description: newTableDesc,
		              price: newTablePrice,
		              lastModified: new Date(),
		            },
		      })
			}
		},
	})
});
