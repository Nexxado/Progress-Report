describe('Database - Goals', function () {

    var $dbService;
    var goalsKey = 'goals';

    var testGoal = {
        title: 'testTitle',
        description: 'testDescription',
        date: new Date(2016, 08, 08),
        category: 'testCategory'
    };

    var goalsArray = localStorage.getItem(goalsKey);
    goalsArray = goalsArray ? JSON.parse(goalsArray) : [];


    beforeEach(function () {
        module('ProgressReport');
        inject(function (DatabaseService) {
            $dbService = DatabaseService;
        });

        goalsArray.push(testGoal);
        localStorage.setItem(goalsKey, JSON.stringify(goalsArray));
    });

    afterEach(function () {
        goalsArray.pop();
        localStorage.setItem(goalsKey, JSON.stringify(goalsArray));
    });


    it('Get Goal', function () {
        var goal = $dbService.getGoal(testGoal);
        expect(goal).toEqual(testGoal);
    });

    it('Add Goal', function () {
        var goal = $dbService.getGoal(testGoal);
        expect(goal).toEqual(testGoal);
    });

    it('Update Goal', function () {
        var updatedGoal = {
            title: 'testTitle',
            description: 'updatedDescription',
            date: new Date(2019, 08, 08),
            category: 'updatedCategory'
        };
        $dbService.updateGoal(testGoal, updatedGoal);
        var goal = $dbService.getGoal(testGoal);
        expect(goal).toEqual(updatedGoal);

    });

    it('Remove Goal', function () {
        var result = $dbService.removeGoal(testGoal);
        expect(result).not.toEqual(-1);
    });


});

describe('Database - Categories', function () {

    var $dbService;
    var categoryKey = 'categories';
    var testCategory = 'testCategory';

    beforeEach(function () {
        module('ProgressReport');
        inject(function (DatabaseService) {
            $dbService = DatabaseService;
        });

    });

    it('Add Category', function () {
        $dbService.addCategory(testCategory);
        var categories = localStorage.getItem(categoryKey);
        categories = categories ? JSON.parse(categories) : [];
        var category = categories.pop();
        localStorage.setItem(categoryKey, JSON.stringify(categories));
        expect(category).toEqual(testCategory);
    });

    it('Remove Category', function () {
        $dbService.addCategory(testCategory);
        var result = $dbService.removeCategory(testCategory);
        expect(result).toEqual(0);
    });


});
