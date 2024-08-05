document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeControl = document.getElementById('volume');
    const searchInput = document.getElementById('search');
    const playlistElement = document.getElementById('playlist');

    let playlist = [
        { title: 'song 1', src: 'song1.mp3' },
        { title: 'Song 2', src: 'song2.mp3' },
        { title: 'Song 3', src: 'song3.mp3' }
    ];

    let currentSongIndex = 0;

    function loadSong(index) {
        audio.src = playlist[index].src;
        audio.play();
        playButton.style.display = 'none';
        pauseButton.style.display = 'inline';
    }

    function populatePlaylist() {
        playlistElement.innerHTML = playlist.map((song, index) => `
            <li data-index="${index}">${song.title}</li>
        `).join('');
    }

    function playSong(event) {
        const index = event.target.getAttribute('data-index');
        if (index !== null) {
            currentSongIndex = parseInt(index, 10);
            loadSong(currentSongIndex);
        }
    }

    function playPauseToggle() {
        if (audio.paused) {
            audio.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'inline';
        } else {
            audio.pause();
            playButton.style.display = 'inline';
            pauseButton.style.display = 'none';
        }
    }

    function playPrevious() {
        currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(currentSongIndex);
    }

    function playNext() {
        currentSongIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(currentSongIndex);
    }

    function adjustVolume() {
        audio.volume = volumeControl.value;
    }

    function searchPlaylist() {
        const query = searchInput.value.toLowerCase();
        const filteredPlaylist = playlist.filter(song => song.title.toLowerCase().includes(query));
        playlistElement.innerHTML = filteredPlaylist.map((song, index) => `
            <li data-index="${index}">${song.title}</li>
        `).join('');
    }

    playButton.addEventListener('click', playPauseToggle);
    pauseButton.addEventListener('click', playPauseToggle);
    prevButton.addEventListener('click', playPrevious);
    nextButton.addEventListener('click', playNext);
    volumeControl.addEventListener('input', adjustVolume);
    searchInput.addEventListener('input', searchPlaylist);
    playlistElement.addEventListener('click', playSong);

    populatePlaylist();
});
