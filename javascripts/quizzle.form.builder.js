;(function($){
    "use strict";

    var Answer = Backbone.Model.extend({
        defaults: function(){
            return {
                title: "",
                is_correct: true,
                question_id: null
            }
        },
        
        drop: function(){
            this.destroy();
            $(this.view.el).remove();
        }
    });

    var AnswerList = Backbone.Collection.extend({
        model: Answer,
        localStorage: new Backbone.LocalStorage("quizzle_answers")
    });

    var Question = Backbone.Model.extend({

        defaults: function(){
            return {
                title: "",
                type: "single", // will be displayed as a radio button,
                answers: new AnswerList() // empty Answers collection 
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
        },
        
        addAnswer: function(answer){
            this.get("answers").add(answer);
        }
    });

    var QuestionList = Backbone.Collection.extend({
        model: Question,
        localStorage: new Backbone.LocalStorage("quizzle_questions")
    });

    var QuestionList = new QuestionList;

    //----------------------
    // The Views
    //----------------------
    var QuestionView = Backbone.View.extend({});

    var QuestionPreviewView = Backbone.View.extend({
        render: function(){
            // Append question as a tab
            $("#question_preview dl").append(
                _.template(
                    '<dd><a href="#tab_q<%= id %>"><%= title %></a></dd>',
                    this.model.toJSON()
                )
            );
            
            // Fetch answers assigned to this question
            var answers = new AnswerList;
            answers.fetch();
            var filtered = answers.where({"question_id": this.model.id});
            this.model.set("answers", answers.reset(filtered));
            var modelAnswers = this.model.get("answers");
            
            var answersHolderTpl = _.template('<li id="tab_q<%= id %>Tab"></li>', this.model.toJSON());
            $(".tabs-content").append(answersHolderTpl);
            
            // Append answers list
            modelAnswers.each(function(answer){
                $("#tab_q" + this.model.id + "Tab").append(
                    new AnswerPreviewView({model:answer}).render().el
                );
            }.bind(this));

            return this;
        }
    });

    var AnswerView = Backbone.View.extend({
        tagName: "li",
        model: Answer,
        events: function(){
            return {
                "keyup .answer_text": "updateAnswer",
                "blur .answer_text": "saveAnswer",
                "click a[title='remove']": "removeAnswer"
            }
        },
        initialize: function(){
            this.type = $("input[name=answer_type]:checked").val();
            this.model.view = this;
            _.bindAll(this, "saveAnswer", "render");
        },
        updateAnswer: function(e){
            this.input = this.$(".answer_text");
            if(e.which == 13){
                this.saveAnswer();
            }
            else {
                // Just update "preview" view
                // TODO:
            }
        },
        render: function(){
            var tpl = _.template($("#answer_" + this.type).html());
            $(this.el).html(tpl(this.model.toJSON()));
            return this;
        },
        saveAnswer: function(){
            this.input = this.$(".answer_text");
            this.model.save({
                title: this.input.val(),
                is_correct: this.$(".answer-validator").is(":checked")
            });
        },
        removeAnswer: function(){
            this.model.drop()
        }
    });
    
    var AnswerPreviewView = Backbone.View.extend({
        tagName: "p",
        model: Answer,
        
        initialize: function(){
            this.listenTo(this.model, "change", this.render)
        },
        
        render: function(){
            var qType = QuestionList.get(this.model.get("question_id")).get('type');
            var templatePreview = _.template(
                $("#answer_" + qType + "_preview").html()
            );
            $(this.el).html(templatePreview(this.model.toJSON()))
            return this;
        }
    });

    var AppView = Backbone.View.extend({
        el: $('#quiz_builder'),

        events: {
            "keyup #question_text": "updateQuestion",
            "click #add_answer": "addAnswer",
            "click #save_question": "saveQuestion"
        },

        initialize: function(){
            this.input = this.$("#question_text");
            _.bindAll(this, "updateQuestion", "saveQuestion");
            
            this.listenTo(QuestionList, "add", this.showQuestion);
            this.listenTo(QuestionList, "reset", this.showAll)
            this.listenTo(QuestionList, "all", this.render)

            QuestionList.fetch();
        },

        updateQuestion: function(e){
            // save question if the Enter key button was pressed
            if(e.which == 13){
                this.saveQuestion();
            }
            else {
                var textVal = this.input.val();
                // Update text example
                $("#q_text").html(textVal);
            }
        },
        
        saveQuestion: function(){
            // Check if we finished with previous one,
            // meaning - we have no ID reference in hidden element
            if($("#last_q_id").val() !== ""){
                alert("You didn't finish with your previous question!");
                return;
            }

            var aQuestion = QuestionList.create({
                title: this.input.val(),
                type: $("input[name=answer_type]:checked").val()
            }, {wait: true});

            // prepare for next question
            this.input.val("");
            // update reference to the las model id
            $("#last_q_id").val(aQuestion.get("id"));

            // disable answer type selector and prepare panel to input answers
            $("input[name='answer_type']").each(function(idx,item){
                item.disabled = true;
            });
            
//            this.addAnswer(aQuestion);
            $("#add_answer").show();
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
            }, 200);
        },

        addAnswer: function(){
            // do not allow add answers if question is not defined
            if($("#last_q_id").val() === ""){
                alert("Create a question first!");
                return;
            }            
            // Get question from collection by its ID
            var aQuestion = QuestionList.get($("#last_q_id").val());
            // Add empty answer instance
            var anAnswer = new Answer({"question_id":aQuestion.id});
            aQuestion.addAnswer(anAnswer);
            $("#a_container").append(
                new AnswerView({"model":anAnswer}).render().el
            );
            $("#q_answers_preview").append( new AnswerPreviewView({"model":anAnswer}).render.el);            
        },

        render: function(question){
        }

    });

    window.App = new AppView;

}(jQuery));
