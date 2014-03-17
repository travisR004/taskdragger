window.Trellino.Views.ShowList = Backbone.CompositeView.extend({
  initialize: function(){
    this.$el = $('<li class="inline"></li>')
    this.listenTo(this.model, 'sync add change reset refresh', this.render);
    this.listenTo(this.model, 'add sync', this.makeDroppable);
    this.listenTo(this.model.cards(), 'add sync', _.debounce(this.addCard, 100));
    this.listenTo(this.model.cards(), 'remove', this.removeCard);
    this.refreshCards();
  },

  orderField: "rank",

  template: JST['list/show'],

  events: {
    "click button.add-card": "newCardForm",
    "click button.create-card": "createCard",
    "click button#never-mind-card": "newCardForm",
    "mouseenter .list-item": "showDelete",
    "mouseleave .list-item": "showDelete",
    "click .delete-list": "showPopover",
    "click #delete-list": "removeList"
  },

  makeSortable: function(){
    var list = this.model
    $(".list" + list.id).sortable({
      connectWith: ".list",
      update: function(event, ui, list){
        var i = 1
        $(this).children().each(function(){
          var cardId = parseInt($(this).children().attr("id").slice(4))
          var card = Trellino.Data.cards.get(cardId)
          var listId = parseInt($(this).parent().attr("class").slice(4))
          card.save({"list_id": listId, "rank": i})
          i ++;
        })
      }
    });
  },

  removeCard: function(card){
    var listView = this;
    var cardShowView =
    _(this.subviews()[".list" + listView.model.id]).find(function(subview){
      return subview.model == card;
    });

    this.removeSubview(".list" + this.model.id, cardShowView)
  },

  removeList: function(event){
    event.preventDefault();
    this.model.destroy()
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
    this.makeSortable();
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
    Trellino.Data.cards.fetch()
    $('#card-title' + this.model.id).val("");
    $('#card-description' + this.model.id).val("");
   }

})