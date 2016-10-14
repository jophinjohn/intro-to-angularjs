(function() {
     function SongPlayer() {
          var SongPlayer = {};
          var currentSong = null;
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
        currentBuzzObject.stop();
        currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
    currentSong = song; 
 };
 var playSong = function(song) {
        currentBuzzObject.play();
        song.playing = true;
};
         /**
        * @function playSong
        * @desc Plays the loaded currentBuzzObject
        * @param {Object} song
        */
         
SongPlayer.play = function(song) {
             if (currentSong !== song) {
                setSong(song); 
                playSong(song);
             } else if (currentSong === song) {
             if (currentBuzzObject.isPaused()) {
             currentBuzzObject.play();
             }
            }  
          
         
};

SongPlayer.pause = function(song) {
           currentBuzzObject.pause();
           song.playing = false;
         
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