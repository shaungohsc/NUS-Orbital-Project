import { Template } from 'meteor/templating'; //for registerHelper

// checkEq = checkEq;

// Template.registerHelper({
// 	'checkEq' : function(a,b) {
// 		return a === b;
// 	}
// });

Template.registerHelper('checkEq', (a, b) => a === b);