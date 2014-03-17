window.Trellino.Views.BoardIndex = Backbone.View.extend({
  className: "board-index",

  initialize: function() {
    this.listenTo(this.collection,
                  "add sync change remove reset",
                  _.debounce(this.render, 50))
  },

  template: JST['board/index'],

  events: {
    "click button#new-board": "newBoardForm",
    "submit form#new-board-form": "addBoard"
  },

  render: function(){
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent)
    return this
  },

  newBoardForm: function(event){
     event.preventDefault()
     $("#board-form").toggleClass("hidden")
     $("#new-board-button").toggleClass("hidden")
   },

   addBoard: function(event){
       event.preventDefault();
       $("#board-form").toggleClass("hidden")
       var board = $(event.currentTarget).serializeJSON()["board"];
       var newBoard = new Trellino.Models.Board(board)
       newBoard.save({},{
         success: function(){
           Trellino.Data.boards.add(newBoard)
           Backbone.history.navigate("boards/" + newBoard.id, {trigger: true})
         }
       })
     }


});