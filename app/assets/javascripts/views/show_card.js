window.Trellino.Views.ShowCard = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model,
                  "add sync change remove reset",
                  this.render)
  },

  template: JST['card/show'],

  events: {
    "mouseenter .card": "showPopover",
    "mouseleave .card": "showPopover",
    "click .card": "cardModal",
    "click .delete-card": "popUp",
    "click #delete-card": "removeCard",
  },

  popUp: function(event){
    event.preventDefault();
    event.stopPropagation();
    var card = this.$('.card')
    $(event.currentTarget).popover({html: true, container: card, animation: true})
  },

  showPopover: function(){
    $("#delete-card" + this.model.id).toggleClass("hidden");
  },

  render: function(){
    var renderedContent = this.template({ card: this.model, this: this });
    this.$el.html(renderedContent)
    this.$el.attr("id", "rank-" + this.model.get("rank"))
    var card = this.$('.card')
    var deleteCard = this.$('.delete-card')
    $(deleteCard).popover({html: true, container: card, animation: true})
    return this
  },

  removeCard: function(event){
    event.preventDefault();
    event.stopPropagation();
    this.model.destroy()
  },
});