
describe('Database Service', function () {

    var testKey = 'goals';
    var testObject = {
        title: 'testTitle',
        description: 'testDescription'
    };

    beforeEach(function () {
        module('ProgressReport');
        localStorage.setItem(testKey, JSON.stringify([testObject]));
    });

    afterEach(function () {
        localStorage.removeItem(testKey);
    });

    it('Get Goal', inject(function (DatabaseService) {
        var goal = DatabaseService.getGoal(testObject.title);
        expect(goal).toEqual(testObject);
    }));

});
