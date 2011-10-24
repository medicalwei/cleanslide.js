page = 0;
subpage = 0;
$(document).ready(function(){
  blocks = $('body>*');

  $.prototype.setToCenter = function(subpage){
    $("body>*").removeClass("current");
    this.addClass("current");
    var innerOffset;

    // check if it is a big block
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

  $(window).keydown(function(event){
    switch (event.keyCode)
    {
      case 40: case 38:
        event.stopPropagation();
        event.preventDefault();
        break;
    }
  });

  $(window).keyup(function(event){
    var current = blocks.eq(page);

    switch (event.keyCode)
    {
      case 40:
        innerBottom = current.position().top + (current.outerHeight()-current.height()) / 2 + current.height();
        console.log(innerBottom);
        if (innerBottom > $(window).height()) { // if the block does not reach the screen bottom
          subpage += 1;
        } else if (page < (blocks.size()-1)) {
          page += 1;
          subpage = 0;
        }
        break;

      case 38:
        if (subpage > 0) {
          subpage -= 1;
        } else if (page > 0) {
          page -= 1;
          subpage = 0;
        }
        break;
    }

    blocks.eq(page).setToCenter(subpage);
    window.location.hash = "#" + page;
  });

  // get hash
  var hashpage = parseInt(window.location.hash.substring(1));
  if (hashpage) {
    page = hashpage;
  }

  blocks.eq(page).setToCenter(subpage);
});

