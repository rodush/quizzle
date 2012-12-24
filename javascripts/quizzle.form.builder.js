;(function($){
    "use strict";

    var Answer = Backbone.Model.extend({
        title: "",
        is_correct: true
    });

    var AnswerList = Backbone.Collection.extend({
        model: Answer
    });

    var Question = Backbone.Model.extend({

        defaults: function(){
            return {
                title: "",
                type: "single" // will be displayed as a radio button
            }
        },

        initialize: function(){
            if(!this.get("title")){
                this.set({
                    "title": this.defaults().title
                })
            }
            if(!this.get("type")){
                this.set({
                    "type": this.defaults().type
                })
            }
        }
    });

    var QuestionList = Backbone.Collection.extend({
        model: Question,
        localStorage: new Backbone.LocalStorage("quizzle")
    });

    var QuestionList = new QuestionList;

    //----------------------
    // The Views
    //----------------------
    var QuestionView = Backbone.View.extend({
        template: _.template($('#question').html()),
        events: {
            "keyup .q_input": "updateQuestion",
            "click #add_answer": "addAnswer"
        },
        render: function(){
            $(this.el).append( this.template(this.model) );
            return this;
        },
        updateQuestion: function(e){
            var textVal = $(e.target).val();
            // Update text example
            $("#q_text").html(textVal);
        },
        addAnswer: function(){
            // --------------- below is working example! -----------------------
            var template = _.template(
                $("#answer_" + $("input[name=answer_type]:checked").val()).html()
            );
            $("#a_container").append(template({id: QuestionList.length}));
            $("#q_answers_preview").append(template({id: QuestionList.length}));
        }
    });

    var QuestionPreviewView = Backbone.View.extend({
        render: function(){
            // Append question as a tab
            $("#question_preview dl").append(
                _.template(
                    '<dd><a href="#tab_q<%= id %>"><%= title %></a></dd>',
                    this.model.toJSON()
                )
            );

            // Append answers list
//            $("#question_preview ul").append(
//                _.template(
//                    '<li id="#tab_q<%= id %>">' +
//                        '<% _.each(answers, _.template("#answer_" + type + "_preview", answer.toJSON())) %>' +
//                    '</li>',
//                    this.model.toJSON()
//                )
//            );

            return this;
        }
    });

    var AnswerView = Backbone.View.extend({
        model: Answer,
        events: {
            "keyup .answer_text": "updateAnswer"
        },
        initialize: function(){
            this.type = "single",
            this.id = null
        },
        updateAnswer: function(e){
            var el = $(e.target);
            console.log(el.val());
        }
    });

    var AppView = Backbone.View.extend({
        el: $('#quiz_builder'),

        events: {
            "click #add_question": "addQuestion",
            "click #save_question": "saveQuestion"
        },

        initialize: function(){
            this.input = $("#question_text");

            this.listenTo(QuestionList, "add", this.showQuestion);
            this.listenTo(QuestionList, "reset", this.showAll)
            this.listenTo(QuestionList, "all", this.render)

            QuestionList.fetch()
        },

        saveQuestion: function(){
            QuestionList.create({
                title: this.input.val(),
                type: $("input[name=answer_type]:checked").val()
            });
            this.input.val('');
        },

        addQuestion: function(){
            var qView = new QuestionView();
            $('#q_container').html(qView.render().el);
        },

        showQuestion: function(question){
            var qPreView = new QuestionPreviewView({model: question});
            $("#preview .tabs").append(qPreView.render().el);
        },

        showAll: function(){
            QuestionList.each(this.showQuestion);
            // Activate first tab by simulating click on it
            setTimeout(function(){
                $("#question_preview dl.tabs > dd:first > a").click()
            }, 100);
        },

        render: function(question){
        }

    });

    window.App = new AppView;

}(jQuery));
