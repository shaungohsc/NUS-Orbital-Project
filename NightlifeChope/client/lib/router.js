Router = {
  /* Current page URI */
  uri: _.compact(window.location.pathname.split("/")),

  routes: [],

  /*  function to add routes */
  addRoute: function(route, template) {
  	var segments =  _.compact(route.split("/"));

  	var placeholders = _.reduce(segments, function(currentArr,
        piece, index) {
  		if (piece.substr(0, 1) === ":") {
  			currentArr.push(index);
  			segments[index] = piece.substr(1);
  		}
  		return currentArr;
  	}, []);

  	this.routes.push({
  		route: segments,
  		template: template,
  		placeholderIndexes: placeholders
  	});
  },

  /* function that matches routes based on URL */
  getMatchingRoute: function(){
     for (var i in this.routes) {
         var route = this.routes[i];
         var data = {};

         if (route.segments.length === this.uri.length) {
             var match = _.every(route.segments, function(seg, i){
                  if (_.contains(route.placeholderIndexes, i)) {
                       data[seg] = this.uri[i];
                       return true;
                  } else {
                       return seg === this.uri[i];
                  }
             }, this);

             if (match) {
                  return {
                      data: data,
                      template: route.template
                  }
             }
        }
    }
    //no matches (add 404 or default template maybe?)
    return false;
  },

  /* function to display matched route's template */
  run: function(){
    var route = this.getMatchingRoute();
    if (route) {
        var fragment = Meteor.render(function() {
            if (Template[route.template] !== undefined) {
                 return Template[route.template](route.data);
            }
        });
        document.body.appendChild(fragment);
    } else {
        //404
    }
  },
};
