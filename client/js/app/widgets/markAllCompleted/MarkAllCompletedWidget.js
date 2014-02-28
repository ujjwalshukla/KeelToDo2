/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/widgets/login/LoginWidget
 *
 * @author Naresh Bhatia
 */
define(
    [
        'app/domain/Repository',
        'backbone',
        'keel/BaseView',
        'text!app/widgets/markAllCompleted/MarkAllCompletedTemplate.html'
    ],
    function(Repository, Backbone, BaseView, MarkAllCompletedTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'div',

            elements: ['checkboxAll'],
            // Template
            template: {
                name: 'MarkAllCompletedTemplate',
                source: MarkAllCompletedTemplate
            },
            initialize: function() {
                // Subscribe to change Event of its model
                this.listenTo(this.model,'change',this.render);
            },
            events: {
                // on click of .js-checkboxAll all tasks are completed
                'click .js-checkboxAll': 'completeAllTasks'
            },
            completeAllTasks: function(e) {
                // change the completed attribute of all the task
                Repository.changeStatusAllTask(e.target.checked);
                Repository.syncAll();
            }
        });
    }
);