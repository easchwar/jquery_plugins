
$.Thumbnail = function(el) {
  this.$el = $(el);
  this.gutterIdx = 0;
  this.$activeDiv = this.$el.find('.active');
  this.$activeImg = this.$el.find('.gutter-images').children().eq(0);
  this.activate(this.$activeImg);
  this.$images = this.$el.find('.gutter-images').children();
  this.fillGutterImages();
  this.setEventHandler();
};


$.Thumbnail.prototype.setEventHandler = function() {
  this.$el.find('.gutter-images').on('click', 'img', function(event) {
    this.$activeImg = $(event.currentTarget);
    this.activate(this.$activeImg);
  }.bind(this));

  this.$el.find('.gutter-images').on('mouseenter', 'img', function(event) {
    this.activate($(event.currentTarget));
  }.bind(this));

  this.$el.find('.gutter-images').on('mouseleave', 'img', function(event) {
    this.activate(this.$activeImg);
  }.bind(this));

  this.$el.find('.gutter').children('a:last-child').data('value', 1);
  this.$el.find('.gutter').children('a:first-child').data('value', -1);

  this.$el.find('.gutter').on('click', 'a', function(event) {
    var numImages = this.$images.length;
    var dir = $(event.currentTarget).data('value');
    this.gutterIdx += dir;
    if (this.gutterIdx < 0) { this.gutterIdx = 0; }
    if (this.gutterIdx > numImages - 5) { this.gutterIdx = numImages - 5; }
    this.fillGutterImages();
  }.bind(this));

};

$.Thumbnail.prototype.fillGutterImages = function() {
  this.$el.find('.gutter-images').empty();
  for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
    this.$el.find('.gutter-images').append(this.$images[i]);
  }
};

$.Thumbnail.prototype.activate = function($img) {
  this.$activeDiv.empty();
  this.$activeDiv.append($img.clone());
};
