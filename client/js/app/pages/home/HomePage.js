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
 * app/pages/home/HomePage
 *
 * @author Ujjwal Shukla
 */
define(
    [
        'app/domain/Repository',
        'app/widgets/header/HeaderWidget',
        'app/widgets/newTask/NewTaskWidget',
        'app/widgets/markAllCompleted/MarkAllCompletedWidget',
        'app/widgets/tasks/TasksWidget',
        'app/widgets/countTasks/CountTasksWidget',
        'keel/BaseView',
        'text!app/pages/home/HomePageTemplate.html'
    ],
    function(Repository,HeaderWidget,NewTaskWidget,MarkAllCompletedWidget,TasksWidget, CountTasksWidget, BaseView, HomePageTemplate) {
        'use strict';
        return BaseView.extend({
            tagName: 'div',
            id: 'home-page',

            template: {
                name: 'HomePageTemplate',
                source: HomePageTemplate
            },
            elements : [
                'header',
                'newTask',
                'tasksArea',
                'markAllCompleted',
                'countTasksArea'
            ],
            // Add children in the page after rendering
            postRender: function() {
                this.addChildren([
                    {
                        id: 'HeaderWidget',
                        viewClass: HeaderWidget,
                        parentElement: this.headerElement
                    },
                    {
                        id: 'NewTaskWidget',
                        viewClass: NewTaskWidget,
                        parentElement: this.newTaskElement
                    },
                    {
                        // allChecked is the model
                        id: 'MarkAllCompletedWidget',
                        viewClass: MarkAllCompletedWidget,
                        parentElement: this.markAllCompletedElement,
                        options: {
                            model: Repository.getAllChecked()
                        }
                    },
                    {
                        // tasks is the collection
                        id: 'TasksWidget',
                        viewClass: TasksWidget,
                        parentElement: this.tasksAreaElement,
                        options: {
                            collection: Repository.getTasks()
                        }
                    },
                    {
                        // countTaskModel is the model
                        id: 'CountTasksWidget',
                        viewClass: CountTasksWidget,
                        parentElement: this.countTasksAreaElement,
                        options: {
                            model: Repository.getCountTaskModel()
                        }
                    }
                ]);
            }
        });
    }
);