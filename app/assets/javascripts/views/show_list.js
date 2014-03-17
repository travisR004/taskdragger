window.Trellino.Views.ShowList = Backbone.CompositeView.extend({
  initialize: function(){
    this.$el = $('<li class="inline"></li>')
    this.listenTo(this.model, 'sync add', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
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
    "click #delete-list": "removeList",
    "sortupdate .list": "updateSort"
  },

  updateSort: function(event, ui, list){
    event.stopPropagation();
    var i = 1
    var that  = this;
    $(".list" + that.model.id).children().each(function(){
      var card;
      var cardId = parseInt($(this).children().attr("id").slice(4))
      Trellino.Data.lists.forEach(function(list){
         if(list.cards().get(cardId)){
           card = list.cards().get(cardId)
         }
      })
      card.save({"list_id": that.model.id, "rank": i})
      i ++;
    })
  },

  makeSortable: function(){
    var list = this.model
    $(".list" + list.id).sortable({
      connectWith: ".list",
      opacity: 0.8
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
    var listItem = this.$('.list-item')
    $(event.currentTarget).popover({html: true, container: listItem, animation: true})
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
    var listItem = this.$('.list-item');
    var deleteList = this.$(".delete-list");
    $(deleteList).popover({html: true, container: listItem, animation: true})
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