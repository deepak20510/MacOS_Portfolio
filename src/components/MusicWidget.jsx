import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const MusicWidget = () => {
  // ============================================
  // 🎵 MUSIC LIBRARY FROM PUBLIC/MUSIC FOLDER
  // ============================================
  const playlist = [
    {
      id: 1,
      title: "Ambient Waves",
      artist: "Nature Sounds",
      album: "Relaxing Tunes",
      audioSrc: "/music/music1.mp3",
      albumArt: "/images/song1.jpg",
    },
    {
      id: 2,
      title: "Chill Vibes",
      artist: "Lo-Fi Dreams",
      album: "Study Beats",
      audioSrc: "/music/music2.mp3",
      albumArt: "/images/song4.jpg",
    },
    {
      id: 3,
      title: "Urban Echoes",
      artist: "City Nights",
      album: "Night Drive",
      audioSrc: "/music/music3.mp3",
      albumArt: "/images/song3.jpg",
    },
    {
      id: 4,
      title: "Serene Flow",
      artist: "Peaceful Mind",
      album: "Meditation",
      audioSrc: "/music/music4.mp3",
      albumArt: "/images/song2.jpg",
    },
    // Add more songs here following the same format
  ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const widgetRef = useRef(null);

  // Get current song from playlist
  const currentSong = playlist[currentIndex];

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
      
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);
      
      return () => {
        if (audioRef.current) {
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

  useEffect(() => {
    if (widgetRef.current) {
      Draggable.create(widgetRef.current, {
        type: "x,y",
        bounds: "body",
        inertia: true,
        cursor: "grab",
        activeCursor: "grabbing",
        onDragStart: function () {
          gsap.to(widgetRef.current, {
            scale: 1.05,
            duration: 0.2,
          });
        },
        onDragEnd: function () {
          gsap.to(widgetRef.current, {
            scale: 1,
            duration: 0.2,
          });
        },
      });
    }
  }, []);

  // Sync audio playback with play/pause state
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % playlist.length);
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
    // If we were playing, continue playing with the new song
    if (isPlaying && audioRef.current) {
      setTimeout(() => {
        audioRef.current.play().catch(e => console.log("Audio play error:", e));
      }, 100);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={currentSong.audioSrc} 
        preload="auto" 
        onError={(e) => console.error("Audio error:", e)}
      />
      <div ref={widgetRef} className="music-widget">
        {/* Album Art */}
        <div className="music-album-art">
          <img
            src={currentSong.albumArt}
            alt={currentSong.album}
            onError={(e) => {
              e.target.src = "/images/deepak-2.png"; // Fallback image
            }}
          />
        </div>

        {/* Song Info */}
        <div className="music-info">
          <div className="music-title">{currentSong.title}</div>
          <div className="music-artist">{currentSong.artist}</div>
          <div className="music-counter">
            {currentIndex + 1} / {playlist.length}
          </div>
        </div>

        {/* Music Controls */}
        <div className="music-controls">
          <button className="music-control-btn" onClick={playPrevious} title="Previous">
            <SkipBack size={18} strokeWidth={2.5} fill="currentColor" />
          </button>
          
          <button className="music-control-btn music-play-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <Pause size={22} strokeWidth={2.5} fill="currentColor" />
            ) : (
              <Play size={22} strokeWidth={2.5} fill="currentColor" />
            )}
          </button>
          
          <button className="music-control-btn" onClick={playNext} title="Next">
            <SkipForward size={18} strokeWidth={2.5} fill="currentColor" />
          </button>
        </div>
      </div>
    </>
  );
};

export default MusicWidget;
