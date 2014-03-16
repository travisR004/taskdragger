window.Trellino.Views.ShowCard = Backbone.View.extend({
  initialize: function() {
    $(this.$el).draggable({
      connectToSortable: "#list" + this.model.escape("list_id"),
      revert: "invalid"
    });
    $(this.$el).data("backbone-view", this);
    this.listenTo(this.model,
                  "add sync change remove reset",
                  this.render)
  },

  template: JST['card/show'],

  events: {
    "mouseenter div.card": "showDelete",
    "mouseleave div.card": "showDelete",
    "click button#delete-card": "deleteCard",
    "drop:dropview": 'dropviewDropHandler'
  },

  dropviewDropHandler: function(){
    console.log("wow")
  },

  showDelete: function(){
    $("#delete-card-button" + this.model.id).toggleClass("hidden")
  },

  deleteCard: function(event){
    event.preventDefault;
    this.model.destroy();
    // var card = this;
  //   var board_id;
  //   Trellino.Data.boards.forEach(function(board){
  //     if( board.lists() ){
  //       board.lists().forEach(function(list){
  //         if (list.id === card.model.get("list_id")){
  //           board_id = list.get("board_id");
  //         }
  //       })
  //     }
  //   });
    // this.model.destroy({success: function(){
   //    Backbone.history.navigate("#/boards/" + board_id, {trigger: true})
   //    }
   //  })
  },

  render: function(){
    var renderedContent = this.template({ card: this.model, this: this });
    this.$el.html(renderedContent)
    return this
  }
});