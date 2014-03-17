window.Trellino.Collections.Cards = Backbone.Collection.extend({
  initialize: function(models, options){
  },

  url: "/api/cards",

  model: Trellino.Models.Card,

  comparator: function(card){
    return card.get("rank")
  },

  getOrFetch: function(id){
    var model;
    var cards = this;

    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new Trellino.Models.Card({ id: id });
      model.fetch({
      success: function () { cards.add(model) }
      });
     return model;
    }
  }
})