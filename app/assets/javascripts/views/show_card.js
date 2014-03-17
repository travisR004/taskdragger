window.Trellino.Views.ShowCard = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model,
                  "add sync change remove reset",
                  this.render)
  },

  template: JST['card/show'],

  events: {
    "mouseenter div.card": "showDelete",
    "mouseleave div.card": "showDelete",
    "click button#delete-card": "deleteCard",
  },

  showDelete: function(){
    $("#delete-card-button" + this.model.id).toggleClass("hidden")
  },

  deleteCard: function(event){
    event.preventDefault;
    this.model.destroy();
  },

  render: function(){
    var renderedContent = this.template({ card: this.model, this: this });
    this.$el.html(renderedContent)
    this.$el.attr("id", "rank-" + this.model.get("rank"))
    return this
  }
});