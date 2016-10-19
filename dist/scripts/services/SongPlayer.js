(function() {
     function SongPlayer(Fixtures) {
          var SongPlayer = {};
          var currentAlbum = Fixtures.getAlbum();
          SongPlayer.currentArtist = currentAlbum.artist;
         
          var currentBuzzObject = null;
         /**
        * @desc Buzz object audio file
        * @type {Object}
        */ 
         /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */

var setSong = function(song) {
    if (currentBuzzObject) {
        stopSong(SongPlayer.currentSong);
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
    SongPlayer.currentSong = song; 
 };
var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };
         

         
 var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
};

 var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
         /**
        * @function playSong
        * @desc Plays the loaded currentBuzzObject
        * @param {Object} song
        */
          
SongPlayer.currentSong = null;   
SongPlayer.play = function(song) {
    song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                setSong(song); 
                playSong(song);
             } else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
             }
            }  
          
         
};

SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
           currentBuzzObject.pause();
           song.playing = false;
         
};
SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                currentSongIndex = 0;
            }else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
         /**
        * @function SongPlayer.previous
        * @desc Goes to the previous song
        */
SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
     if (currentSongIndex < 0) {
        stopSong(SongPlayer.currentSong);
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }

 };
       /**
         * @function SongPlayer.pause
        * @desc Uses currentBuzzObject to pause the song
        * @param {Object} song
         **/

 return SongPlayer;
}
  
    
angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();