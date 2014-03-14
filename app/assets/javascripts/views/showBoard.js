window.Trellino.Views.ShowBoard = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model,
                  'add sync change remove reset',
                  _.debounce(this.render, 50));
  },

  template: JST['board/show'],

  render: function(){
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent)
    return this
  }

})