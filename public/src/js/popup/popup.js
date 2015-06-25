var Popup = function(){
  //Initialisation du popup
  this.init = function (posX,posY,width,height,title,html,closeBut){
    this.posX = formatPosX(posX);
    this.posY = formatPosY(posY);
    this.width = formatWidth(width);
    if(this.width > 500)
        this.width = 500;
    this.height = formatHeight(height);
    this.title = title;
    this.html = html;
    this.closeBut = closeBut;
  };

  //Ouvrir le popup
  this.draw = function(){
    //Creation de l'ombre
    $('body').append("<div class='popupShadow'>");

    //Creation du contenu du popup
    $('.popupShadow')
      .append("<div class='popupContainer'>");
    $('.popupContainer')
      .css("width",this.width+"px")
      .css("height",this.height+"px")
      .css("margin-top",this.posY+"px")
      .css("margin-left",this.posX+"px");

    if(this.closeBut){
    //Creation du bouton de fermeture du popup
      $('.popupContainer')
        .append("<button class='popupClose'>");
      $('.popupClose')
        .css("margin-top",-15)
        .css("margin-left",this.width-15);
    }
    
    $('.popupContainer')
      .append("<h1 class='popupTitle'>")
      .append("<p class='popupHtml'>");

    $('.popupTitle')
      .append(this.title);
    $('.popupHtml')
      .append(this.html);
  };

  this.center = function(){
    this.posX = null;
    this.remove();
    this.draw();
  };

  //Fermer le popup
  this.remove = function(){
    popupClose();
  };

  function formatWidth(width){
    if(width) {
      width = width.toString();
      if (width.indexOf("%") != -1) {
        width = width.split("%")[0];
        width = parseInt((width * $(window).width()) / 100);
      }
    }
    return width;
  }

  function formatHeight(height){
    if(height) {
      height = height.toString();
      if (height.indexOf("%") != -1) {
        height = height.split("%")[0];
        height = parseInt((height * $(window).height()) / 100);
      }
    }
    return height;
  }

  function formatPosX(posX){
    if(posX) {
      posX = posX.toString();
      if (posX.indexOf("%") != -1) {
        posX = posX.split("%")[0];
        posX = parseInt((posX * $(window).height()) / 100);
      }
    }
    return posX;
  }

  function formatPosY(posY){
    if(posY) {
      posY = posY.toString();
      if (posY.indexOf("%") != -1) {
        posY = posY.split("%")[0];
        posY = parseInt((posY * $(window).height()) / 100);
      }
    }
    return posY;
  }
};

//Ferme le popup
function popupClose(){
  $('.popupShadow').remove();
}

//Click sur la croix pour fermer le popup
$('body').on('click','.popupClose',function(){
  popupClose();
});

$('head').append('<link rel="stylesheet" href="src/js/popup/popup.css">');




