import WindowWrapper from "#hoc/WindowWrapper";
import MobileWindowHeader from "#components/MobileWindowHeader";
import { Pause, Play, SkipBack, SkipForward, Music as MusicIcon } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

const Music = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
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

  const playNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setProgress(0);
    // If we were playing, continue playing with the new song
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }, 100);
    }
  }, [playlist.length, isPlaying]);

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
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
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
          const currentAudio = audioRef.current;
          currentAudio.removeEventListener('loadedmetadata', handleLoadedMetadata);
          currentAudio.removeEventListener('ended', handleEnded);
          currentAudio.removeEventListener('error', handleError);
        }
      };
    }
  }, [currentIndex, currentSong.audioSrc, playNext]);

  // When the song changes, play it if currently playing
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      // Add a small delay to ensure the audio is loaded before playing
      setTimeout(() => {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }, 100);
    }
  }, [currentIndex, isPlaying]);

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
          const current = audioRef.current.currentTime;
          const dur = audioRef.current.duration;
          const calculatedProgress = dur > 0 ? (current / dur) * 100 : 0;
          setProgress(calculatedProgress);
          setCurrentTime(current);
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
      setCurrentTime(newTime);
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
              {duration > 0 ? (
                <>
                  <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
                  <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
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

const MusicWindow = WindowWrapper(Music, "music");

export default MusicWindow;
