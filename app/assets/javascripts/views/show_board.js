window.Trellino.Views.ShowBoard = Backbone.CompositeView.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync add', this.render);
    this.listenTo(this.model.lists(), 'add', this.addList);
    this.listenTo(this.model.lists(), 'remove', this.removeList)
    this.refreshLists();
  },

  template: JST['board/show'],

  events: {
    "click button#new-list": "newListForm",
    "submit form#new-list-form": "createList",
    "click button#delete-board": "deleteBoard",
    "click button#never-mind": "newListForm",
    "sortupdate .lists": "updateSort",
    "sortstart .lists": "startTurn"
  },

  startTurn: function(event, ui){
    ui.item.children().toggleClass(".dragged")
  },

  updateSort: function(event, ui){
    var i = 1;
    var that = this;
    $(".lists").children().children().each(function(){
      var listId = parseInt($(this).attr("id").slice(9));
      var list = that.model.lists().get(listId);
      list.save({rank: i});
      i ++;
    });
  },

  makeSortable: function(){
    $(".lists").sortable({
      patch: true
    })
  },

  removeList: function(list){
    var boardView = this;
    var listShowView =
    _(this.subviews()['.lists']).find(function(subview){
      return subview.model == list
    });
    this.removeSubview(".lists", listShowView)
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
    this.model.lists().sort()
    var renderedContent = this.template({ board: this.model });
    this.$el.html(renderedContent)

    this.renderSubviews();

    this.makeSortable();
    return this
  },

  deleteBoard: function(event){
    event.preventDefault();
    this.model.destroy({
         success: function(){
           Backbone.history.navigate("", {trigger: true})
         }
       });
  },

  newListForm: function(event){
    event.preventDefault();
    $("#list-form").toggleClass("hidden")
    $("#new-list-button").toggleClass("hidden")
   },

  createList: function(event){
    event.preventDefault();
    this.newListForm(event)
    var list = $(event.currentTarget).serializeJSON()["list"];
    list.board_id = this.model.id;
    list.rank = this.model.lists().length + 1
    this.model.lists().create(list)
    $('#list-title').val("");
   }

})