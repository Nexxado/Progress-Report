describe('Database Service', function () {

    var $dbService;
    var goalsKey = 'goals';
    var categoryKey = 'categories';
    var testCategory = 'testCategory';
    var testGoal = {
        title: 'testTitle',
        description: 'testDescription',
        date: new Date(2016, 08, 08),
        category: testCategory
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
        var goal = $dbService.getGoal(testGoal.title);
        expect(goal).toEqual(testGoal);
    });

    it('Add Goal', function () {
        $dbService.addGoal(testGoal);
        var goal = $dbService.getGoal(testGoal.title);
        expect(goal).toEqual(testGoal);
    });

    it('Remove Goal', function () {
        $dbService.addGoal(testGoal);
        var result = $dbService.removeGoal(testGoal.title);
        expect(result).not.toEqual(-1);
    });

    it('Add Category', function() {
        $dbService.addCategory(testCategory);
        var categories = localStorage.getItem(categoryKey);
        categories = categories ? JSON.parse(categories) : [];
        var category = categories.pop();
        localStorage.setItem(categoryKey, JSON.stringify(categories));
        expect(category).toEqual(testCategory);
    });

    it('Remove Category', function() {
        $dbService.addCategory(testCategory);
        var result = $dbService.removeCategory(testCategory);
        expect(result).toEqual(0);
    });


});
