window.Trellino.Views.ShowList = Backbone.CompositeView.extend({
  initialize: function(){
    $(this.$el).droppable({
      drop: function(ev, ui){
        var model = $(ui.draggable).data("backbone-view").model
      }
    })
    this.listenTo(this.model, 'sync add', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.listenTo(this.model.cards(), 'remove', this.removeCard)
    this.refreshCards();
  },

  template: JST['list/show'],

  events: {
    "click button.add-card": "newCardForm",
    "click button.create-card": "createCard",
    "click button#never-mind-card": "newCardForm",
    "mouseenter .list-item": "showDelete",
    "mouseleave .list-item": "showDelete",
    "click .delete-list": "showPopover",
    "click #delete-list": "removeList",
  },

  removeCard: function(card){
    this.removeSubview(".list" + this.model.id, cardShowView)
  },

  removeList: function(event){
    event.preventDefault();
    var board_id = this.model.escape("board_id")
    var listId = $(event.currentTarget).data("list")
    var list = Trellino
    this.model.destroy({success: function(){
      Backbone.history.navigate("#/boards/" + board_id, {trigger: true})
      }
    })
  },

  showPopover: function(event){
    event.preventDefault();
    var listItem = "#list-item" + this.model.id
    $(event.currentTarget).popover({html: true, container: listItem})
  },

  showDelete: function(){
    $("#delete-list" + this.model.id).toggleClass("hidden");
  },

  refreshCards: function(){
    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function(card) {
    var cardShowView = new Trellino.Views.ShowCard({
      model: card
    })
    this.addSubview(".list" + this.model.id, cardShowView);
    cardShowView.render();
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent)
    this.renderSubviews();
    return this
  },

  newCardForm: function(event){
    event.preventDefault();
    $("#card-form" + this.model.id).toggleClass("hidden")
    $("#add-card" + this.model.id).toggleClass("hidden")
   },

  createCard: function(event){
    event.preventDefault();
    this.newCardForm(event)
    var card = $(event.currentTarget).parent().serializeJSON()["card"];
    card.list_id = this.model.id;
    if(this.model.cards().length > 0){
      card.rank = parseInt(this.model.cards().models[this.model.cards().length - 1].escape("rank")) + 1
    } else {
      card.rank = 1
    }
    this.model.cards().create(card)
    $('#card-title' + this.model.id).val("");
    $('#card-description' + this.model.id).val("");
   }

})