window.Trellino.Views.BoardIndex = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection,
                  "add sync change remove reset",
                  _.debounce(this.render, 50))
  },

  template: JST['board/index'],

  render: function(){
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent)
    return this
  }

});