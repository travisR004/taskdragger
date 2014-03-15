window.Trellino.Collections.Lists = Backbone.Collection.extend({
  initialize: function(models, options){
    this.board = options.board;
  },

  url: function(){
    var url = this.board.url() + "/lists";
    return url;
  },

  model: Trellino.Models.List,

  getOrFetch: function(id){
    var model;
    var lists = this;

    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new Trellino.Models.List({ id: id });
      model.fetch({
      success: function () { lists.add(model) }
      });
     return model;
    }
  }
})