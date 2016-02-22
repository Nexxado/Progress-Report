angular.module('ProgressReport')

.service('LocalStorageService', function () {


    this.createString = function (key, value) {

        if (!key || !value) {
            console.log('No key or value');
            return;
        }

        localStorage.setItem(key, value);
    };


    this.createObject = function (key, object) {

        if (!key || !object) {
            console.log('No key or Object');
            return;
        }

        localStorage.setItem(key, JSON.stringify(object));
    };

    this.getString = function (key) {

        if (!key) {
            console.log('No Key');
            return;
        }

        return localStorage.getItem(key);
    };

    this.getObject = function (key) {
        
        if (!key) {
            console.log('No Key');
            return;
        }
        
        return JSON.parse(localStorage.getItem(key));
    };
    
    this.deleteAll = function() {
        localStorage.clear();
    };

});
