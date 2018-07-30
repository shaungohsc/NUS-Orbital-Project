import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Listings } from '../imports/api/listings.js'
import { Queries } from '../imports/api/queries.js'

Meteor.startup(() => {
	Meteor.methods({
		'removeListingsUnderTable'({ tableID }) {
			Listings.remove({tableID: tableID});
		}
	})
});
