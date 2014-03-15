window.Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: '/api/boards',

  parse: function(jsonResp){
    var board = this
    if(jsonResp.lists){
      jsonResp.lists.forEach(function(list){
        board.lists().set(Trellino.Models.List.prototype.parse(list));
      })
      delete jsonResp.lists;
    }
      return jsonResp
  },

  lists: function(){
    if(!this._lists){
      this._lists = new Trellino.Collections.Lists([], {board: this});
    }

    return this._lists;
  }


});