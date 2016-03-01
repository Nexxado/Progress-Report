describe('CategoryFilter', function () {

    var $categoryFilter;
    var testGoal1 = {
        title: 'testTitle1',
        description: 'testDescription1',
        date: new Date(2016, 01, 01),
        category: 'cat1'
    };
    var testGoal2 = {
        title: 'testTitle2',
        description: 'testDescription2',
        date: new Date(2016, 02, 02),
        category: 'cat2'
    };
    var testGoals = [testGoal1, testGoal2];

    beforeEach(function () {
        module('ProgressReport');
        inject(function ($filter) {
            $categoryFilter = $filter('categoryFilter');
        });
    });

    it('Filter categories', function () {
        expect($categoryFilter(testGoals, 'cat1')).toEqual([testGoal1]);
        expect($categoryFilter(testGoals, 'cat2')).toEqual([testGoal2]);
        expect($categoryFilter(testGoals, '')).toEqual(testGoals);
        expect($categoryFilter(testGoals, undefined)).toEqual(testGoals);
    });

});
