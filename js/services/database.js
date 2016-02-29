angular.module('ProgressReport')

.service('DatabaseService', function () {

    /*************************************/
    /************* Setters ***************/
    /*************************************/
    var goalsKey = 'goals';
    var categoryKey = 'categories';

    this.addGoal = function (object) {

        if (!object) {
            console.log('No Object');
            return false;
        }

        var array = JSON.parse(localStorage.getItem(goalsKey));
        if (!array) {
            array = [];
        }

        array.push(object);

        localStorage.setItem(goalsKey, JSON.stringify(array));
        return true;
    };


    /*************************************/
    /************* Getters ***************/
    /*************************************/

    this.getAllGoals = function () {

        var goalsString = localStorage.getItem(goalsKey);

        return goalsString ? JSON.parse(goalsString) : [];
    };

    this.getGoal = function (goalTitle) {

        var goalsString = localStorage.getItem(goalsKey);
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
        localStorage.removeItem(goalsKey);
    };

});
