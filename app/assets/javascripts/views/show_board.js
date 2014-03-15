window.Trellino.Views.ShowBoard = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', _.debounce(this.render, 50));
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.refreshLists();
  },

  template: JST['board/show'],

  events: {
    "click button#new-list": "newListForm",
    "submit form#new-list-form": "createList"
  },

  refreshLists: function(){
    this.model.lists().each(this.addList.bind(this));
  },

  addList: function(list) {
    var listShowView = new Trellino.Views.ShowList({
      model: list
    })
    this.addSubview(".lists", listShowView);
    listShowView.render();
  },

  render: function() {
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent)

    this.renderSubviews();

    return this
  },

  newListForm: function(event){
    event.preventDefault()
    $("#list-form").toggleClass("hidden")
    $("#new-list-button").toggleClass("hidden")
   },

  createList: function(event){
    event.preventDefault();
    $("#list-form").toggleClass("hidden")
    $("#new-list-button").toggleClass("hidden")
    var list = $(event.currentTarget).serializeJSON()["list"];
    list.board_id = this.model.id;
    // hack
    if(this.model.lists().length > 0){
      list.rank = parseInt(this.model.lists().models[this.model.lists().length - 1].escape("rank")) + 1
    } else {
      list.rank = 1
    }
    this.model.lists().create(list)
   }

})