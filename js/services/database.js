angular.module('ProgressReport')

.service('DatabaseService', function () {

    var goalsKey = 'goals';

    /*************************************/
    /************* Setters ***************/
    /*************************************/

    this.addGoal = function (goal) {

        if (!goal) {
            console.log('No goal');
            return false;
        }

        var array = JSON.parse(localStorage.getItem(goalsKey));
        if (!array) {
            array = [];
        }

        array.push(goal);

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

    /*************************************/

    this.getGoal = function (goalTitle) {

        var goalsString = localStorage.getItem(goalsKey);
        if (!goalsString) {
            return null;
        }

        var goals = JSON.parse(goalsString);

        for (var i in goals) {
            if (goals[i].title === goalTitle) {
                goals[i].date = new Date(goals[i].date); //convert date back
                return goals[i];
            }
        }

        return null;
    };

    /*************************************/
    /************* Removal ***************/
    /*************************************/

    this.removeGoal = function (goalTitle) {

        var goalsString = localStorage.getItem(goalsKey);
        if (!goalsString) {
            return 0;
        }

        var goals = JSON.parse(goalsString);
        
        for (var i in goals) {
            if (goals[i].title === goalTitle) {
                goals = goals.splice(i, 1);
                localStorage.setItem(goalsKey, JSON.stringify(goals));
                return 0;
            }
        }
        console.log("removeGoal(): Didn't find goal");
        return -1;
    };

    /*************************************/

    this.clearGoals = function () {
        localStorage.removeItem(goalsKey);
    };

});
