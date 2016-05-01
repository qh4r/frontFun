define(['domReady', 'jquery'], function (domReady) {
    domReady(function () {
        var controls = {
            playButton: $('#play'),
            nextButton: $('#next'),
            previousButton: $('#previous'),
            pauseButton: $('#pause'),
            stopButton: $('#stop'),
            volumeBar: $('#volume'),
            duration: $('#duration'),
            progress: $('#progress'),
            playlist: $('#playlist li'),
            cover: $('#audio-image img')[0]
        };

        controls.audioInfo = $('#audio-info');
        controls.artist = $(controls.audioInfo).find('.artist')[0];
        controls.title = $(controls.audioInfo).find('.title')[0];
        console.log(controls)
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
        duration.text('0:00');
        progress.css('width', '0%');

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

    function setNewAudio(element, titleElement, artistElement, coverElement, current) {
        var title = element.innerText && element.innerText;
        var song = element.getAttribute('data-song');
        var source = element.getAttribute('data-source');
        var cover = element.getAttribute('data-cover');
        var artist = element.getAttribute('data-artist');

        // if(current){
        //     current.className = "";
        // }
        current = element;
        element.className = "active";

        titleElement.innerText = title;
        artistElement.innerText = artist;
        coverElement.setAttribute('src', cover);
        var audio = new Audio(source);
        return {
            audio: audio,
            current: current
        };
    }

    function initializeAudio(controls) {

        function startPlayingElement(element) {
            console.log(element);
            var wasPaused = audio.paused;
            controls.playlist.removeClass('active');
            audio.pause();
            var result = setNewAudio(element, controls.title, controls.artist, controls.cover, current);
            current = result.current;
            audio = result.audio;
            showDuration(audio, controls.duration, controls.progress);
            if (!wasPaused) {
                audio.play();
            }
        }

        var current = {};
        var result = setNewAudio(controls.playlist[0] || {}, controls.title, controls.artist, controls.cover, current);
        current = result.current;
        audio = result.audio;

        controls.playlist.on('click', function () {
            startPlayingElement(this);
        });

        controls.nextButton.on('click', function () {
            var next = $(current).next();
            if (!next || !next.length) {
                next = controls.playlist;
            }
            startPlayingElement(next[0]);
        });

        controls.previousButton.on('click', function () {
            var next = $(current).prev();
            if (!next || !next.length) {
                next = controls.playlist;
            }
            startPlayingElement(next[next.length - 1]);
        });

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