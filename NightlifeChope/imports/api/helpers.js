import { Template } from 'meteor/templating'; //for registerHelper

Template.registerHelper('checkEq', (a, b) => a === b);
