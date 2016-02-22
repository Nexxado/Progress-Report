angular.module('ProgressReport')

.service('LocalStorageService', function () {

    /*************************************/
    /************* Setters ***************/
    /*************************************/
    var key = 'tasks';

    this.addTask = function (object) {
        
        if (!object) {
            console.log('No Object');
            return false;
        }
        
        var array = JSON.parse(localStorage.getItem(key));
        if(!array)
            array = [];
        
        array.push(object);

        localStorage.setItem(key, JSON.stringify(array));
        return true;
    };
    
    
    /*************************************/
    /************* Getters ***************/
    /*************************************/

    this.getAllTasks = function() {
        
        var tasksString = localStorage.getItem(key);
        
        return tasksString ? JSON.parse(tasksString) : [];
    };
    
    this.getTask = function(task_title) {
        
        var tasksString = localStorage.getItem(key);
        if(!tasksString)
            return null;
        
        var tasks = JSON.parse(tasksString);
        
        for(task of tasks) {
            if(task.title === task_title)
                return task;
        }
        
        return null;
    };

    
    this.clearTasks = function() {
        var tasks = [];
        localStorage.setItem(key, tasks);
    };

});
