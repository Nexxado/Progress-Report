
describe('Database Service', function () {

    var dbService;
    var testKey = 'goals';
    var testObject = {
        title: 'testTitle',
        description: 'testDescription'
    };

    beforeEach(function () {
        module('ProgressReport');
        inject(function(DatabaseService) {
            dbService = DatabaseService;
        });
        
        localStorage.setItem(testKey, JSON.stringify([testObject]));
    });

    afterEach(function () {
        localStorage.removeItem(testKey);
    });

    it('Get Goal', function() {
        var goal = dbService.getGoal(testObject.title);
        expect(goal).toEqual(testObject);
    });

});
