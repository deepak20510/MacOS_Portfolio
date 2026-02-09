import WindowWrapper from "#hoc/WindowWrapper";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { Pause, Play, SkipBack, SkipForward, Music as MusicIcon } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Music = () => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Playlist data
  const playlist = [
    {
      id: 1,
      title: "Ambient Waves",
      artist: "Nature Sounds",
      album: "Relaxing Tunes",
      audioSrc: "/music/music1.mp3",
      albumArt: "/images/song1.jpg",
      duration: 210, // seconds (estimated)
    },
    {
      id: 2,
      title: "Chill Vibes",
      artist: "Lo-Fi Dreams",
      album: "Study Beats",
      audioSrc: "/music/music2.mp3",
      albumArt: "/images/song4.jpg",
      duration: 180, // seconds (estimated)
    },
    {
      id: 3,
      title: "Urban Echoes",
      artist: "City Nights",
      album: "Night Drive",
      audioSrc: "/music/music3.mp3",
      albumArt: "/images/song3.jpg",
      duration: 240, // seconds (estimated)
    },
    {
      id: 4,
      title: "Serene Flow",
      artist: "Peaceful Mind",
      album: "Meditation",
      audioSrc: "/music/music4.mp3",
      albumArt: "/images/song2.jpg",
      duration: 260, // seconds (estimated)
    },
  ];

  const currentSong = playlist[currentIndex];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up audio element when current song changes
  useEffect(() => {
    if (audioRef.current) {
      // Set the primary source
      audioRef.current.src = currentSong.audioSrc;
      
      // Try to load the audio
      const loadAudio = () => {
        try {
          audioRef.current.load();
        } catch (error) {
          console.error(`Failed to load audio: ${currentSong.audioSrc}`, error);
          // Move to next song if loading fails
          setTimeout(() => playNext(), 1000);
        }
      };
      
      // Update duration when metadata is loaded
      const handleLoadedMetadata = () => {
        // Update the duration when the audio is loaded
        // We don't modify the playlist duration here to keep it static
      };
      
      // Handle when audio ends
      const handleEnded = () => {
        playNext();
      };
      
      // Handle audio errors
      const handleError = (e) => {
        console.error(`Error loading audio: ${currentSong.audioSrc}`, e);
        // Try to play next song if current one fails
        setTimeout(() => {
          if (audioRef.current?.error) {
            playNext();
          }
        }, 1000);
      };
      
      // Attempt to load the audio
      loadAudio();
      
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [currentIndex]);

  // When the song changes, play it if currently playing
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      // Add a small delay to ensure the audio is loaded before playing
      setTimeout(() => {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }, 100);
    }
  }, [currentIndex]);

  // Progress bar animation and audio sync
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Sync progress with audio playback
  useEffect(() => {
    let progressInterval;
    
    if (isPlaying && audioRef.current) {
      progressInterval = setInterval(() => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
          const currentTime = audioRef.current.currentTime;
          const duration = audioRef.current.duration;
          const calculatedProgress = duration > 0 ? (currentTime / duration) * 100 : 0;
          setProgress(calculatedProgress);
        }
      }, 1000); // Update every second
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setProgress(0);
    // If we were playing, continue playing with the new song
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }, 100);
    }
  };

  const playPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? playlist.length - 1 : prevIndex - 1
    );
    setProgress(0);
    // If we were playing, continue playing with the new song
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }, 100);
    }
  };

  // Handle seeking in the audio
  const handleSeek = (e) => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      const newTime = pos * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(pos * 100);
    }
  };

  // Always render something to ensure the window opens
  // Determine mobile state fresh each render to ensure accuracy
  const currentIsMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  
  if (currentIsMobile) {
    // Mobile version
    return (
      <>
        <MobileWindowHeader target="music" title="Music" />
        
        <audio 
          ref={audioRef} 
          src={currentSong.audioSrc} 
          preload="auto" 
          onError={(e) => console.error("Audio error:", e)}
        />
        <div className="music-player">
          {/* Album Art */}
          <div className="music-artwork">
            <img
              src={currentSong.albumArt}
              alt={currentSong.album}
              onError={(e) => {
                e.target.src = "/images/music1.png";
              }}
            />
          </div>

          {/* Song Info */}
          <div className="music-info">
            <h2 className="music-title">{currentSong.title}</h2>
            <p className="music-artist">{currentSong.artist}</p>
            <p className="music-album">{currentSong.album}</p>
          </div>

          {/* Progress Bar */}
          <div className="music-progress-container">
            <div 
              className="music-progress-bar"
              ref={progressRef}
              onClick={handleSeek}  // Make the progress bar clickable for seeking
            >
              <div 
                className="music-progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="music-time">
              {audioRef.current && !isNaN(audioRef.current.duration) ? (
                <>
                  <span>{Math.floor(audioRef.current.currentTime / 60)}:{String(Math.floor(audioRef.current.currentTime % 60)).padStart(2, '0')}</span>
                  <span>{Math.floor(audioRef.current.duration / 60)}:{String(Math.floor(audioRef.current.duration % 60)).padStart(2, '0')}</span>
                </>
              ) : (
                <>
                  <span>0:00</span>
                  <span>{Math.floor(currentSong.duration / 60)}:{String(Math.floor(currentSong.duration % 60)).padStart(2, '0')}</span>
                </>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="music-controls">
            <button className="music-btn" onClick={playPrevious} title="Previous">
              <SkipBack size={24} strokeWidth={2} />
            </button>
            
            <button 
              className="music-btn music-play-btn" 
              onClick={togglePlay} 
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause size={32} strokeWidth={2} />
              ) : (
                <Play size={32} strokeWidth={2} />
              )}
            </button>
            
            <button className="music-btn" onClick={playNext} title="Next">
              <SkipForward size={24} strokeWidth={2} />
            </button>
          </div>

          {/* Playlist Counter */}
          <div className="music-counter">
            <MusicIcon size={16} />
            <span>{currentIndex + 1} of {playlist.length}</span>
          </div>
        </div>
      </>
    );
  } else {
    // Desktop version - return null since we only want the widget on desktop
    // But still return an empty fragment so the window can open/close properly
    return <></>;
  }
};

export default WindowWrapper(Music, "music");
