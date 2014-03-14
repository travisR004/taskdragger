window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  Data: {},
  initialize: function() {
    window.Trellino.Data.boards = new Trellino.Collections.Boards();
    new Trellino.Routers.AppRouter();
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Trellino.initialize();
});
