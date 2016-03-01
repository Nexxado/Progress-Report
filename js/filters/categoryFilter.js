angular.module('ProgressReport')

.filter('categoryFilter', function() {
    return function(collection, category) {
        var newCollection = [];
        
        if(!category || category === '') {
            return collection;
        
        } else {
            
            for(var i in collection) {
                if(collection[i].category === category) {
                    newCollection.push(collection[i]);
                }
            }
            
            return newCollection;
        }
    };
});