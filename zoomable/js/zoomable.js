
$.Zoomable = function(el) {
  this.$el = $(el);
  this.setEventHandler();
};

$.Zoomable.prototype.setEventHandler = function() {
  this.$el.on('mouseover', function(event) {
    this.$focusbox = new $.FocusBox(this.$el, 40, 40);
    // this.$el.append(this.$focusbox);
  }.bind(this));
};


$.FocusBox = function($el, height, width) {
  this.height = height;
  this.width = width;
  this.$zoomable = $el;
  this.$focusbox = $('<div class="focusbox"></div>');
  this.setEventHandler();
  this.$zoomable.append(this.$focusbox);
};

$.FocusBox.prototype.setEventHandler = function() {
  this.$zoomable.mousemove(function(event) {
    var msg = "Handler for .mousemove() called at ";
    msg += event.pageX + ", " + event.pageY;
    $(".log").children().remove();
    $(".log").append( "<div>" + msg + "</div>" );
    this.showFocusBox(event);
  }.bind(this));

  this.$zoomable.mouseleave(function(event) {
    this.removeFocusBox();
  }.bind(this));
};

$.FocusBox.prototype.showFocusBox = function(event) {
  this.$focusbox.hide();
  this.$focusbox.css({'top': event.pageY, 'left': event.pageX, 'width': '40px', 'height': '40px'});
  this.$focusbox.show();
};

$.FocusBox.prototype.removeFocusBox = function() {
  this.$focusbox.remove();
};
