$.getScript('src/js/howler/howler.min.js',function(){
  initSounds();
});

var SOUNDS = {};

function initSounds(){
    SOUNDS.etat = readData('SOUNDS');
    if(SOUNDS.etat == null)
      SOUNDS.etat = true;

    var soundPath = 'src/audio/';
    SOUNDS.login = new Howl({ urls: [soundPath+'login.mp3'] });
    SOUNDS.join = new Howl({ urls: [soundPath+'join.mp3'] });
    SOUNDS.leave = new Howl({ urls: [soundPath+'leave.mp3'] });
    SOUNDS.error = new Howl({ urls: [soundPath+'error.mp3'] });
    SOUNDS.mention = new Howl({ urls: [soundPath+'mention.mp3'] });
    SOUNDS.newMsg = new Howl({ urls: [soundPath+'newMsg.mp3'] });
    SOUNDS.quit = new Howl({ urls: [soundPath+'quit.mp3'] });

    storeData('SOUNDS',SOUNDS.etat);
}

function playSound(sound){
  if(SOUNDS.etat){
    SOUNDS[sound].play();
  }
}
