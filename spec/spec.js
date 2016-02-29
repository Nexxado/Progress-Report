describe('Database Service', function () {

    var dbService;
    var testKey = 'goals';
    var testObject = {
        title: 'testTitle',
        description: 'testDescription',
        date: new Date(2016, 08, 08)
    };

    var arr = localStorage.getItem(testKey);
    arr = arr ? JSON.parse(arr) : [];

    beforeEach(function () {
        module('ProgressReport');
        inject(function (DatabaseService) {
            dbService = DatabaseService;
        });

        arr.push(testObject);
        localStorage.setItem(testKey, JSON.stringify(arr));
    });

    afterEach(function () {
        arr.pop();
        localStorage.setItem(testKey, JSON.stringify(arr));
    });


    it('Get Goal', function () {
        var goal = dbService.getGoal(testObject.title);
        expect(goal).toEqual(testObject);
    });

    it('Add Goal', function () {
        dbService.addGoal(testObject);
        var goal = dbService.getGoal(testObject.title);
        expect(goal).toEqual(testObject);
    });

    it('Remove Goal', function () {
        dbService.addGoal(testObject);
        var result = dbService.removeGoal(testObject.title);
        expect(result).toEqual(0);
    });


});
