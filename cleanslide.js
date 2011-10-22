page = 0;
subpage = 0;
$(window).ready(function(){
  $.prototype.setToCenter = function(subpage){
    $("body>*").removeClass("current");
    this.addClass("current");
    var innerOffset;
    if (this.height() <= $(window).height()) {
      innerOffset = (this.outerHeight() - $(window).height()) / 2;
    } else {
      innerOffset = (this.outerHeight()-this.height()) / 2 + $(window).height() * subpage * 0.8; // overflow
    }
    var overallTop = parseFloat($("body").css("margin-top")) - (this.position().top + innerOffset);
    $("body").css("margin-top", overallTop);
  }

  $(window).resize(function(){
    $('body>*').eq(page).setToCenter();
  });

  $(window).keyup(function(event){
    console.log(event);
    var blocks = $('body>*');
    var current = blocks.eq(page);
    if (event.keyCode == 40) { // down
      innerBottom = current.position().top + (current.outerHeight()-current.height()) / 2 + current.height();
      console.log(innerBottom);
      if (innerBottom > $(window).height())
      {
        subpage += 1;
      }
      else if (page < (blocks.size()-1))
      {
        page += 1;
        subpage = 0;
      }
    } else if (event.keyCode == 38) { // up
      if (subpage > 0)
      {
        subpage -= 1;
      }
      else if (page > 0)
      {
        page -= 1;
        subpage = 0;
      }
    }
    blocks.eq(page).setToCenter(subpage);
  });

  blocks.eq(page).setToCenter(subpage);
});

