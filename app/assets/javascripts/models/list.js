window.Trellino.Models.List = Backbone.Model.extend({

  parse: function(jsonResp){
    if(jsonResp.cards){
      this.cards().set(jsonResp.cards);
      delete jsonResp.cards;
    }
      return jsonResp
  },

  cards: function(){
    if(!this._cards){
      this._cards = new Trellino.Collections.Cards([], {list: this});
    }

    return this._cards;
  }

})