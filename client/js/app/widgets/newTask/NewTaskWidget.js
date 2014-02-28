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
        'text!app/widgets/newTask/NewTaskTemplate.html'
    ],
    function(Repository, Backbone, BaseView, NewTaskTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'form',

            elements: ['inputBox'],

            template: {
                name: 'NewTaskTemplate',
                source: NewTaskTemplate
            },
            events: {
                'keypress .js-inputBox': 'checkKeyPressed',
                'focus .js-inputBox': 'hidePlaceholder',
                'blur .js-inputBox': 'showPlaceHolder'
            },
            // placeholder work around
            hidePlaceholder: function() {
                if (!this.inputBoxElement.val() || this.inputBoxElement.hasClass('placeHolder')) {
                    this.inputBoxElement
                        .removeClass('placeHolder')
                        .val('');
                }
            },
            showPlaceHolder: function() {
                if (!this.inputBoxElement.val()) {
                    this.inputBoxElement
                        .addClass('placeHolder')
                        .val('Enter To Do Item');
                }
            },
            // for submitting value on pressing enter
            checkKeyPressed: function(e) {
                // check if enter is pressed
                if (e.keyCode === 13) {
                    e.preventDefault();
                    this.createNewTask();
                    this.removeInputBoxText();
                    this.showPlaceHolder();
                    e.target.blur();
                }
            },
            // create new task using value from text box
            createNewTask: function() {
                var newItem = $(this.inputBoxElement).val();
                Repository.addItemInTasks(newItem);
                Repository.syncAll();
            },
            removeInputBoxText:function() {
                $(this.inputBoxElement).val('');
            },
            // adding placeholder in the postRender
            postRender: function() {
                this.showPlaceHolder();
            }
        });
    }
);