angular.module('ProgressReport')

.service('DatabaseService', function () {

    /*************************************/
    /************* Setters ***************/
    /*************************************/
    var key = 'goals';

    this.addGoal = function (object) {

        if (!object) {
            console.log('No Object');
            return false;
        }

        var array = JSON.parse(localStorage.getItem(key));
        if (!array) {
            array = [];
        }

        array.push(object);

        localStorage.setItem(key, JSON.stringify(array));
        return true;
    };


    /*************************************/
    /************* Getters ***************/
    /*************************************/

    this.getAllGoals = function () {

        var goalsString = localStorage.getItem(key);

        return goalsString ? JSON.parse(goalsString) : [];
    };

    this.getGoal = function (goalTitle) {

        var goalsString = localStorage.getItem(key);
        if (!goalsString) {
            return null;
        }

        var goals = JSON.parse(goalsString);

        for (var i in goals) {
            if (goals[i].title === goalTitle) {
                return goals[i];
            }
        }

        return null;
    };


    this.clearGoals = function () {
        var goals = [];
        localStorage.setItem(key, goals);
    };

});
