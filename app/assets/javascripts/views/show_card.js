window.Trellino.Views.ShowCard = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.model,
                  "add sync change remove reset",
                  this.render)
  },

  template: JST['card/show'],

  render: function(){
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent)
    return this
  }
});