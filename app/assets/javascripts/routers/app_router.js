window.Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": 'boardIndex',
    "boards/:id": "showBoard"
  },

  boardIndex: function(){
    var boardIndexView = new Trellino.Views.BoardIndex({
      collection: Trellino.Data.boards
    });

    Trellino.Data.boards.fetch();
    this._swapView(boardIndexView)
  },

  showBoard: function(id){
    var board = Trellino.Data.boards.getOrFetch(id);
    var showBoardView = new Trellino.Views.ShowBoard({
      model: board
    });
    this._swapView(showBoardView)
  },

  _swapView: function(view){
    if(this.currentView){
      this.currentView.remove();
    }
    this.currentView = view
    $('div#content').html(view.render().$el)
  }
});