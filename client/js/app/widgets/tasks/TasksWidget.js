define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/tasks/TasksTemplate.html',
        'app/widgets/tasks/TaskWidget'
    ],
    function(Repository, Backbone, BaseView, TasksTemplate, TaskWidget){
        'use strict';
        return BaseView.extend({
            tagName : 'ul',
            template: {
                name: 'TasksTemplate',
                source: TasksTemplate
            },
            initialize : function() {
                this.listenTo(this.collection, 'add', this.onOrderAddedEvent);
                Repository.fetchTasks();
            },
            onOrderAddedEvent : function(e){
                var newModel = {taskData: e, edit: false};
                var taskRow = new TaskWidget({model : newModel});
                this.$el.append(taskRow.render().$el);
                Repository.syncAll();
                return this;
            }
        });
    }
);