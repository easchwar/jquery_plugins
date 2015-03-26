
$.Carousel = function(el) {
  this.$el = $(el);
  this.activeIdx = 0;
  this.$items = this.$el.find('.items');
  // this.$items.children().eq(this.sumIdx(-1)).addClass('left');
  // this.$items.children().eq(this.sumIdx(1)).addClass('right');
  this.$items.children().eq(0).addClass('active');
  this.setEventHandler();
  this.inTransition = false;
};

$.Carousel.prototype.setEventHandler = function() {
  this.$el.on('click', 'a', function(event) {
    event.preventDefault();
    var $link = $(event.currentTarget);
    var direction = $link.hasClass('slide-left') ? 1 : -1;
    this.slide(direction);
  }.bind(this));
};

$.Carousel.prototype.slide = function(direction) {
  if (this.inTransition) {
    return;
  }
  this.inTransition = true;

  // increment idx and set new idx to active
  this.activeIdx = this.sumIdx(direction);
  var $curItems = this.$items.children();

  var toClass = direction < 0 ? 'left' : 'right';
  var fromClass = direction < 0 ? 'right' : 'left';

  //determine direction new active class is coming from
  $curItems.eq(this.sumIdx(- direction)).addClass(fromClass);

  $curItems.eq(this.activeIdx).addClass('active ' + toClass);
  // for sliding: remove previous location class as soon as event loop ends to allow for sliding in
  setTimeout(function() {
    $curItems.eq(this.activeIdx).removeClass('left right');
  }.bind(this), 0);

  // remove all classes from old picture once it transitions off screen
  $curItems.eq(this.sumIdx(- direction)).one('transitionend', function(event) {
    $curItems.eq(this.sumIdx(- direction)).removeClass('active left right');
    setTimeout(function() {
      this.inTransition = false;
    }.bind(this), 10);
  }.bind(this));
};

$.Carousel.prototype.sumIdx = function (val) {
  var numItems = this.$el.find('.items').children().length;
  return (this.activeIdx + val + numItems) % numItems;
};
