var setSong = function(songNumber)  {
    
    if (currentSoundFile) {
        currentSoundFile.stop();
     }
 
	currentlyPlayingSongNumber = parseInt(songNumber);
	currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    // #1
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2
         formats: [ 'mp3' ],
         preload: true
     });
    
     setVolume(currentVolume);
    
};

// Added checkpoint-21
 var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 }
 
var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };

var getSongNumberCell = function(number)  {

	return $('.song-item-number[data-song-number="' + number + '"]');
};

 

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'    
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>' 
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
    
//
//  clickHandler function
//
     var clickHandler = function() {
       var songNumber = parseInt($(this).attr('data-song-number'));   
       if (currentlyPlayingSongNumber !== null) { 
           var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
           currentlyPlayingCell.html(currentlyPlayingSongNumber);       
	   }

/*
    clickHandler function ...  REMOVE AFTER CERTAIN 
    
    var clickHandler = function() {
        // clickHandler logic
       
       //var songNumber = $(this).attr('data-song-number');
       var songNumber = parseInt($(this).attr('data-song-number'));
	   //if (currentlyPlayingSong !== null) {
       if (currentlyPlayingSongNumber !== null) { 
		  // Revert to song number for currently playing song because user started playing new song.
		  //var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
          
           //var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
           var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
           
           //$('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		   //currentlyPlayingCell.html(currentlyPlayingSong);
           currentlyPlayingCell.html(currentlyPlayingSongNumber);
           
	   }
    
*/
         
	  
       if (currentlyPlayingSongNumber !== songNumber) {
		  // Switch from Play -> Pause button to indicate new song is playing.		  
          $(this).html(pauseButtonTemplate);		  
          setSong(songNumber);
          // Line below added Ckpt-20 clickHandler Refractor
          currentSoundFile.play();
          // Removed at checkpoint-21
          updateSeekBarWhileSongPlays();                   
          // Added lines for checkpoint-21
          var $volumeFill = $('.volume .fill');
          var $volumeThumb = $('.volume .thumb');
          $volumeFill.width(currentVolume + '%');
          $volumeThumb.css({left: currentVolume + '%'});
          $(this).html(pauseButtonTemplate);
          updatePlayerBarSong();
           
           
/*

        Second part of click handler functionssss ....
        
        	   //if (currentlyPlayingSong !== songNumber) {
       if (currentlyPlayingSongNumber !== songNumber) {
		  // Switch from Play -> Pause button to indicate new song is playing.
		  // Moved lline for before updatePlayerBarSong() - GitHub doc shows it moved.
          $(this).html(pauseButtonTemplate);
		  //currentlyPlayingSong = songNumber;
          // Replaced with Ckpt-19-Assignment
          //currentlyPlayingSongNumber = songNumber;
          setSong(songNumber);
          // Line below added Ckpt-20 clickHandler Refractor
          currentSoundFile.play();
          // Removed at checkpoint-21
          updateSeekBarWhileSongPlays();
          // Removed next line - Ckpt-19 Assignment   
          //currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
           
          // Added lines for checkpoint-21
          var $volumeFill = $('.volume .fill');
          var $volumeThumb = $('.volume .thumb');
          $volumeFill.width(currentVolume + '%');
          $volumeThumb.css({left: currentVolume + '%'});
          $(this).html(pauseButtonTemplate);
          updatePlayerBarSong();
           
        
        
*/
           
	 
        } else if (currentlyPlayingSongNumber === songNumber) {
		  // Switch from Pause -> Play button to pause currently playing song.
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
                // Added at checkpoint-21
                updateSeekBarWhileSongPlays();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
                // Added at checkpoint-21
                updateSeekBarWhileSongPlays();
            }
	   }  //  End of else if (currentlyPlayingSongNumber === songNumber)
         
/*
        Part 3 of clickHandler - else if (currentlyPlayingSongNumber === songNumber)
        
        	  // } else if (currentlyPlayingSong === songNumber) {
        } else if (currentlyPlayingSongNumber === songNumber) {
		  // Switch from Pause -> Play button to pause currently playing song.
		  //$(this).html(playButtonTemplate);
          //$('.main-controls .play-pause').html(playerBarPlayButton);  
		  //currentlyPlayingSong = null;
          // Line below did not exist in this version os album.js added.
          //currentSongfromAlbum = null;    
            
            // Added line below and commented out next two lines Ckpt-19-Assign.... I hope this works
            // setSong Commented out but not listed as to be removed from Ckpt-20 instructions - clickHandler
            //setSong(null);
            //currentlyPlayingSongNumber = null;
            //currentSongFromAlbum = null;
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
                currentSoundFile.play();
                // Added at checkpoint-21
                updateSeekBarWhileSongPlays();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
                currentSoundFile.pause();   
                // Added at checkpoint-21
                updateSeekBarWhileSongPlays();
            }
	   }  //  End of else if (currentlyPlayingSongNumber === songNumber)
*/
    
     }; // End of clickHandler function
 
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number'); 
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));         
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
         
     };
    
/*
    Part 1 of onHover ... REMOVE WHEN CERTAIN
    
var onHover = function(event) {
         
        // Placeholder for function logic
        // Code below from Github:Bloc - Not sure if needed
        //var songNumber = parseInt($(this).attr('data-song-number'));
        var songNumberCell = $(this).find('.song-item-number'); 
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));         
         
        //if (songNumber !== currentlyPlayingSong) {
         if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
         
     };
     
*/
    
    
    // Noticed something with seek bar for song...
     var offHover = function(event) {   
        var songNumberCell = $(this).find('.song-item-number'); 
        var songNumber = parseInt(songNumberCell.attr('data-song-number')); 
        if (songNumber !== currentlyPlayingSongNumber) { 
            songNumberCell.html(songNumber);
        }
      console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);   
     };
    
/*
    Original - offHover = function(event) {

        var offHover = function(event) {
         // Placeholder for function logic
         // Code below from Hithub:Bloc - Not sure if needed
        //var songNumber = parseInt($(this).attr('data-song-number'));
        var songNumberCell = $(this).find('.song-item-number'); 
        var songNumber = parseInt(songNumberCell.attr('data-song-number')); 

        //if (songNumber !== currentlyPlayingSong) {
        if (songNumber !== currentlyPlayingSongNumber) { 
            songNumberCell.html(songNumber);
        }
      console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);   
     };

*/
    
    
     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
     
 }; //  End of createSongRow function



 var setCurrentAlbum = function(album) {
     // #1   
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     // #2    
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     // #3    
     $albumSongList.empty();
 
     // #4
     for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
     }
 };

// updateSeekBarWhileSongPlays()
// Added at checkpoint-21
// ++?
 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {             
         
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
             
             // Ckpt-21 #1
             var currentTime = currentSoundFile.getTime();           
             
             updateSeekPercentage($seekBar, seekBarFillRatio);
             
             // Ckpt-21 #4           
             //var startTime = filterTimeCode(currentTime);
             
             setCurrentTimeInPlayerBar( currentTime  )
             
             // Ckpt-21 #2
             // //var totalTime = currentSoundFile.getDuration();
                         
             // Ckpt-21 #4
             // //setTotalTimeInPlayerBar( totalTime );
    
         })
     }
 }      // End of updateSeekBarWhileSongPlays function

 //
 // Ckpt 21 Assignments
 //
 
     // Ckpt-21 Assignment #1   
     function setCurrentTimeInPlayerBar(currentTime)  {
        
         // Ckpt-21 #3        
         console.log(currentTime);
        $(".current-time").text( filterTimeCode(currentTime) )  
        }

    // Ckpt-21 Assignment #2
    
    function  setTotalTimeInPlayerBar(totalTime)  {    
        // Ckpt-21 #4 - Set time format 
        //  filterTimeCode(totalTime);  
        console.log( totalTime );
        $(".total-time").text( filterTimeCode(totalTime) ) 
        }





// Ckpt-21 Assignment #3 - filterTimeCode    
// Format time MM:SS

function    filterTimeCode(timeInSeconds)  { 
    
  //   Use the parseFloat() method to get the seconds in number form  
  var newTimeInSeconds = parseFloat(timeInSeconds); //.toFixed(2); ? ? - not yet
 
  //  ++++ Store variables for whole minutes and whole seconds  +++++
  // Seperate interger from decimal   
  var mins = Math.floor( newTimeInSeconds / 60);  // number only
  var secs = Math.floor( newTimeInSeconds % 60 ); // remainder only  
 
    // Line below suggested by Mentor - Ckpt-21 Assignment #3    
  return (mins  + ":" + (secs < 10 ? "0" + secs : secs));  
}
  
/*
    timeFilterCode Function original
  
 function    filterTimeCode(timeInSeconds)  {
//var startTime = function    filterTimeCode(timeInSeconds)  {   
  
  // ++++  Use the parseFloat() method to get the seconds in number form  +++++
  var newTimeInSeconds = parseFloat(timeInSeconds); //.toFixed(2); ? ? - not yet
 
  //  ++++ Store variables for whole minutes and whole seconds  +++++
  // Seperate interger from decimal 
  //var Q = Math.floor(parseFloat(timeInSeconds) / 60);  // Interger only
  //var X = Math.floor(parseFloat(timeInSeconds) % 60);  // Remainder only
  
  var mins = Math.floor( newTimeInSeconds / 60);  // number only
  var secs = Math.floor( newTimeInSeconds % 60 ); // remainder only
 
  //if (secs < 10 ) {    // fix no zero preceeding remainder < then 10 ... cheezy
    //X.toFixed(2); need better understanding of the syntax, is there a toFixed(-2) 
 //  secs = ("0" + secs); // This is dumb but it works...sad
  //}
 
 // See var result = filterTimeCode code on function call 
 //return (mins  + ":" + secs);  // Why have this ? ?
 // Line below suggested by Mentor - Ckpt-21 Assignment #3
    
  return (mins  + ":" + (secs < 10 ? "0" + secs : secs));  
} 
  
  
*/




// Added at checkpoint-21
 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };


// Added checkpoint-21
var setupSeekBars = function() {
    // 
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;
         
         // Added if statement for checkpoint-21
         if ( $(this).parent().attr("class") == "seek-control" ) {
             seek(seekBarFillRatio * currentSoundFile.getDuration());
         } else {
             setVolume(seekBarFillRatio * 100);             
         }
         
         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
     });
//};
          // #7
     $seekBars.find('.thumb').mousedown(function(event) {
         // #8
         var $seekBar = $(this).parent();
 
         // #9
         $(document).bind('mousemove.thumb', function(event){
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
             
             // Added if statement for checkpoint-21
             //if ( $(this).parent().attr("class") == "seek-control" ) {
             if ( $seekBar.parent().attr("class") == "seek-control" ) {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
            } else {
                setVolume(seekBarFillRatio);             
            }
             
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
 
         // #10
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });   
    


 

}; // End of setupSeekBars function

// Github Ckpt-19 update-player-song.js
//  ++? 
 var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    // from updateSeekBarWhileSongPlays function
    // Ckpt-21 #2
    //var totalTime = currentSoundFile.getDuration();
    var totalTime = currentSongFromAlbum.duration;                     
     
    // Ckpt-21 #4
    setTotalTimeInPlayerBar( totalTime );
         
};

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

// Added Github next-song.js - Not sure where in file this should go?
var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing the song here
    currentSongIndex++;
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
        // Added by myself..testing only
        //console.log("currentSongIndex is: " + currentSongIndex);
    }

    // Next two lines added at suggestion of mentor
    var lastSongNumber = currentSongIndex === 0 ?
    currentAlbum.songs.length : currentSongIndex;
   
    // Set a new current song
    // Update Ckpt-19-Assign... setSong
    setSong(currentSongIndex + 1);
    // Line below added as part of Ckpt-20
    currentSoundFile.play();
    // Added Checkpoint-21
    updateSeekBarWhileSongPlays();
    // Update the Player Bar information
    updatePlayerBarSong();
    
    // Included Ckpt-19-Assignment
    var $nextSongNumberCell =  getSongNumberCell(currentlyPlayingSongNumber);     
    var $lastSongNumberCell =  getSongNumberCell(lastSongNumber); 
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};  // End of nextSong function

/*
    Original - nextSong function
    
  var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing the song here
    currentSongIndex++;
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
        // Added by myself..testing only
        //console.log("currentSongIndex is: " + currentSongIndex);
    }

    // Save the last song number before changing it
    //var lastSongNumber = currentlyPlayingSongNumber;
    //var lastSongNumber = currentSongIndex;
    // Next two lines added at suggestion of mentor
    var lastSongNumber = currentSongIndex === 0 ?
    currentAlbum.songs.length : currentSongIndex;
    // Added at suggestion of mentor
    //var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    // Set a new current song
    // Update Ckpt-19-Assign... setSong
    setSong(currentSongIndex + 1);
    // Line below added as part of Ckpt-20
    currentSoundFile.play();
    // Added Checkpoint-21
    updateSeekBarWhileSongPlays();
    //currentlyPlayingSongNumber = currentSongIndex + 1;
    //currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();
    //if ( )
    
    //var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    //var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    //console.log(lastSongNumber, currentlyPlayingSongNumber);
    
    // Included Ckpt-19-Assignment
    var $nextSongNumberCell =  getSongNumberCell(currentlyPlayingSongNumber); 
    //$('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell =  getSongNumberCell(lastSongNumber); 
    //$('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    // Added at suggestion of mentor... issue has been fixed
    //console.log(lastSongNumber, $lastSongNumberCell);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};  // End of nextSong function
  
  
*/

// Added Hithub previous-song.js - Not sure where in file this should go?
var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Next line suggest by mentor
    var lastSongNumber = currentSongIndex === currentAlbum.songs.length -1 ? 1 : currentSongIndex + 2;
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    // Set a new current song
    // Update Ckpt-19-Assign... setSong
    setSong(currentSongIndex + 1);
    // Added line below as part of Ckpt-20
    currentSoundFile.play();
    // Added checkpoint-21
    updateSeekBarWhileSongPlays();

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);
                            
    // Added Ckpt-19 Assignment getSongNumberCell(currentlyPlayingSongNumber);  
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber); 
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber); 
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

/*
    Original previousSong function
    
  var previousSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Save the last song number before changing it
    //var lastSongNumber = currentlyPlayingSongNumber;
    //var lastSongNumber = currentSongIndex + 2;
    // Next line suggest by mentor
    var lastSongNumber = currentSongIndex === currentAlbum.songs.length -1 ? 1 : currentSongIndex + 2;
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    

    // Set a new current song
    // Update Ckpt-19-Assign... setSong
    setSong(currentSongIndex + 1);
    // Added line below as part of Ckpt-20
    currentSoundFile.play();
    // Added checkpoint-21
    updateSeekBarWhileSongPlays();
    //currentlyPlayingSongNumber = currentSongIndex + 1;
    //currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    $('.main-controls .play-pause').html(playerBarPauseButton);
                            
    //var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    //var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    // Added Ckpt-19 Assignment getSongNumberCell(currentlyPlayingSongNumber);  
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber); 
    //$('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');   
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber); 
    //$('.song-item-number[data-song-number="' + lastSongNumber + '"]');    
    

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};
   
*/



// Added Ckpt-20-assignment-toggle #2

 function togglePlayFromPlayerBar()  { 
  var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
  if ( currentSoundFile.isPaused())  {
      $(this).html(pauseButtonTemplate);
      currentlyPlayingCell.html(pauseButtonTemplate);
      $(".main-controls .play-pause").html(playerBarPauseButton);                 
      currentSoundFile.play();
  } else {     
      $(this).html(playButtonTemplate);
      currentlyPlayingCell.html(playButtonTemplate);
      $(".main-controls  .play-pause").html(playerBarPlayButton);
      currentSoundFile.pause();
    }
 }



//  Add at ckpt13-pause buttom 

 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
 var currentlyPlayingSong = null;   // Not sure about this line ckpt-19 ?
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;

 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 // Added Ckpt-20-assignment-toggle #1
 var $mainControls = $('.main-controls .play-pause');

 $(document).ready(function() {    
     setCurrentAlbum(albumPicasso);
     setupSeekBars();
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
     // Added Ckpt-20-assignment-toggle #1
     $mainControls.click(togglePlayFromPlayerBar);
 });