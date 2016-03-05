angular.module('ProgressReport')

.controller('CompareDialogController', function ($scope, $mdDialog, $timeout, goals) {

    $scope.done = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    //timeout function needed for jquery to run after DOM is loaded.
    $timeout(function () {

        var ctx = $("#graph").get(0).getContext("2d");
        var chart = new Chart(ctx);

        var titles = [];
        var progress = [];

        for (var i in goals) {
            titles.push(goals[i].title);
            progress.push(goals[i].progress);
        }


        var data = {
            labels: titles,
            datasets: [
                {
                    label: "Progress",
                    fillColor: "rgba(0,150,136,0.5)",
                    strokeColor: "rgba(76,175,80,0.8)",
                    highlightFill: "rgba(0,150,136,0.75)",
                    highlightStroke: "rgba(76,175,80,1)",
                    data: progress
                }
            ]
        };

        var options = {
            barShowStroke: false
        };

        Chart.defaults.global.tooltipTemplate = "<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>%";

        chart.Bar(data, options); //create Bar graph

    });



});
