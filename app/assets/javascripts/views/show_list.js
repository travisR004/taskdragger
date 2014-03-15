window.Trellino.Views.ShowList = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.cards(), 'add', this.addCard);
    this.refreshCards();
  },

  template: JST['list/show'],

  events: {
    "click button#add-card": "newCardForm",
    "submit form#card-form": "createCard"
  },

  refreshCards: function(){
    this.model.cards().each(this.addCard.bind(this));
  },

  addCard: function(card) {
    var cardShowView = new Trellino.Views.ShowCard({
      model: card
    })
    this.addSubview(".cards" + this.model.id, cardShowView);
    cardShowView.render();
  },

  render: function(){
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent)
    this.renderSubviews();
    return this
  },

  newCardForm: function(event){
    event.preventDefault()
    $("#card-form").toggleClass("hidden")
    $("#add-card").toggleClass("hidden")
   },

  createCard: function(event){
    event.preventDefault();
    $("#card-form").toggleClass("hidden")
    $("#add-card").toggleClass("hidden")
    var card = $(event.currentTarget).serializeJSON()["card"];
    card.list_id = this.model.id;
    var listView = this
    // hack
    if(this.model.cards().length > 0){
      card.rank = parseInt(this.model.cards().models[this.model.cards().length - 1].escape("rank")) + 1
    } else {
      card.rank = 1
    }
    this.model.cards().create(card)
   }

})