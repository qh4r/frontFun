define(['domReady', 'jquery'], function (domReady) {
    domReady(function () {
        var controls = {
            playButton: $('#play'),
            pauseButton: $('#pause'),
            stopButton: $('#stop'),
            volumeBar: $('#volume'),
            duration: $('#duration'),
            progress: $('#progress')
        };
        initializeAudio(controls);
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
            s = s < 10 ? "0" + s : s;
            duration.text(m + ':' + s);

            if (audio.currentTime > 0) {
                value = Math.floor((100 / audio.duration) * audio.currentTime);
            }
            progress.css('width', value + '%');
        });
    }

    function setNewAudio(element) {
        var song= element.attr && element.attr('song');
        var title= element.text && element.text();
        var audio = new Audio('media/sch_theme.mp3');
        return audio;
    }

    function initializeAudio(controls) {

        var audio = setNewAudio({});

        controls.playButton.on('click', function () {
            audio.play();
            togglePlayerState(controls.playButton, controls.pauseButton);
        });

        controls.pauseButton.on('click', function () {
            audio.pause();
            togglePlayerState(controls.playButton, controls.pauseButton);
        });

        controls.stopButton.on('click', function () {
            audio.pause();
            audio.currentTime = 0;
            goToStopState(controls.playButton, controls.pauseButton);
        });

        controls.volumeBar.on('change', function () {
            audio.volume = parseFloat(this.value / 40);
        });
        showDuration(audio, controls.duration, controls.progress);

        console.log("dziala");
    }
});