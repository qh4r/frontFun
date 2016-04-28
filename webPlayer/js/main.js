define(['domReady', 'jquery'], function (domReady) {
    domReady(function () {
        var playButton = $('#play');
        var pauseButton = $('#pause');
        var stopButton = $('#stop');
        var volumeBar = $('#volume');
        var duration = $('#duration');
        var progress = $('#progress');
        var audio = new Audio('media/Canon.mp3');
        playButton.on('click', function () {
            audio.play();
            togglePlayerState(playButton, pauseButton);
        });

        pauseButton.on('click', function () {
            audio.pause();
            togglePlayerState(playButton, pauseButton);
        });

        stopButton.on('click', function () {
            audio.pause();
            audio.currentTime = 0;
            goToStopState(playButton, pauseButton);
        });

        volumeBar.on('change', function () {
            console.log('change', this.value);
            audio.volume = parseFloat(this.value / 40);
        });
        showDuration(audio, duration, progress);

        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        console.log("dziala");
    });

    function togglePlayerState(play, pause) {
        pause.toggleClass('hide');
        play.toggleClass('hide');
    }

    function goToStopState(play, pause) {
        play.removeClass('hide');
        pause.addClass('hide');
    }

    function showDuration(audio, duration, progress) {
        var value = 0;

        audio.addEventListener('timeupdate', function (time) {
            var s = parseInt(audio.currentTime % 60);
            var m = parseInt(audio.currentTime / 60) % 60;
            s = s < 10 ? "0"+s : s;
            duration.text(m + ':' + s);

            if(audio.currentTime > 0){
                value = Math.floor((100 / audio.duration) * audio.currentTime);
            }
            progress.css('width', value+'%');
        });
    }
});