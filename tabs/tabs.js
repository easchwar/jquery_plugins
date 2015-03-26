
$.Tabs = function(el) {
  this.$el = $(el);
  this.$contentTabs = $(this.$el.attr('data-content-tabs'));
  this.$activeTab = this.$contentTabs.find('.active');
  this.setupEventHandler();
};

$.Tabs.prototype.setupEventHandler = function() {
  this.$el.on('click','a', function(event) {
    event.preventDefault();
    this.clickTab($(event.currentTarget));
  }.bind(this));

};

$.Tabs.prototype.clickTab = function($a) {
  //set active class to only clicked link
  this.$el.find('a').removeClass("active");
  $a.addClass('active');

  //set transition
  this.$activeTab.removeClass('active');
  this.$activeTab.addClass('transitioning');

  this.$contentTabs.one('transitionend', '.tab-pane', function(event) {
    $(event.currentTarget).removeClass('transitioning');
    this.$activeTab.addClass('active transitioning');
    setTimeout(function() {
      this.$activeTab.removeClass('transitioning');
    }.bind(this), 0);
  }.bind(this));

  this.$activeTab = this.$contentTabs.find($a.attr('href'));
};
