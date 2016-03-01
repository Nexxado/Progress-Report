angular.module('ProgressReport')

.service('DatabaseService', function (constants) {


    /*************************************/
    /************* Setters ***************/
    /*************************************/

    this.addGoal = function (goal) {

        if (!goal) {
            console.log('goal is undefined');
            return false;
        }

        var goals = localStorage.getItem(constants.goalsKey);
        goals = goals ? JSON.parse(goals) : [];
        goals.push(goal);
        localStorage.setItem(constants.goalsKey, JSON.stringify(goals));
        
        return true;
    };


    /*************************************/
    /************* Getters ***************/
    /*************************************/

    this.getAllGoals = function () {
        var goalsString = localStorage.getItem(constants.goalsKey);
        return goalsString ? JSON.parse(goalsString) : [];
    };

    /*************************************/

    this.getGoal = function (goalTitle) {
        var goals = localStorage.getItem(constants.goalsKey);
        goals = goals ? JSON.parse(goals) : [];

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

        var goals = localStorage.getItem(constants.goalsKey);
        goals = goals ? JSON.parse(goals) : [];
        
        for (var i in goals) {
            if (goals[i].title === goalTitle) {
                goals = goals.splice(i, 1);
                localStorage.setItem(constants.goalsKey, JSON.stringify(goals));
                return 0;
            }
        }
        console.log("removeGoal(): Couldn't find goal");
        return -1;
    };

    /*************************************/

    this.clearGoals = function () {
        localStorage.removeItem(constants.goalsKey);
    };
    
    /*************************************/
    /************ Categories *************/
    /*************************************/
    
    this.getCategories = function () {
        var categories = localStorage.getItem(constants.categoryKey);
        return categories? JSON.parse(categories) : [];
    };
    
    this.addCategory = function(newCategory) {
        var categories = localStorage.getItem(constants.categoryKey);
        categories = categories ? JSON.parse(categories) : [];
        categories.push(newCategory);
        localStorage.setItem(constants.categoryKey, JSON.stringify(categories));
    };
    
    this.removeCategory = function(category) {
        var categories = localStorage.getItem(constants.categoryKey);
        categories = categories ? JSON.parse(categories) : [];
        for(var i in categories) {
            if(categories[i] === category) {
                categories = categories.slice(i, 1);
                localStorage.setItem(constants.categoryKey, JSON.stringify(categories));
                return 0;
            }
        }
        console.log("removeGoal(): Couldn't find category");
        return -1;
    };

});
