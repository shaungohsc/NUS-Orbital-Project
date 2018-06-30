import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.methods({
  'listings.insert'(e) {
    console.log(e);
  //   var target = event.target;
  //   //check(text, String);
 
  //   // Make sure the user is logged in before inserting a task
  //   if (! Meteor.userId()) {
  //     throw new Meteor.Error('not-authorized');
  //   }
 
  //   console.log("Form submitted");
  //   console.log(event);
  //   var listingName = target.name.value;
  //   var listingDesc = target.description.value;
  //   var createdBy = Meteor.user().username;

  //   console.log(listingName + " " + listingDesc + " " + createdBy + " | " + target.venuetype.value);
  //   Listings.insert({
  //     name: target.name.value,
  //     pax: target.pax.value,
  //     description: target.description.value,
  //     type: target.venuetype.value,
  //     createdBy: Meteor.userId(),
  //     createdAt: new Date()
  //   });
  // },
  // 'listings.remove'(taskId) {
  //   check(taskId, String);
 
  //   Tasks.remove(taskId);
  }
});
