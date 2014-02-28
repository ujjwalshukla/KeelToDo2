define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/countTasks/CountTasksTemplate.html'
    ],
    function(Repository, Backbone, BaseView, CountTasksTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'div',
            // Template
            template: {
                name: 'CountTasksTemplate',
                source: CountTasksTemplate
            },
            initialize: function() {
                // Subscribe to change Event
                this.listenTo(this.model, 'change', this.render);
            },
            events: {
                // on click of .js-btnDeleteCompleted all Tasks are deleted
                'click .js-btnDeleteCompleted': 'deleteAllCompleted'
            },
            deleteAllCompleted: function() {
                // all tasks are deleted
                Repository.deleteCompletedTasks();
                // all the counters are synced
                Repository.syncAll();
            }
        });
    }
);
