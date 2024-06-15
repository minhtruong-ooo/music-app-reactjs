import React, { useEffect, useRef, useState } from "react";

function Dashboard({ currentSong, onNextSong, onPreviousSong, onRandomSong }) {
  if (!currentSong) {
    console.log("Can't load music");
    return null;
  }
  const cdThumbRef = useRef(null);
  const audioRef = useRef(null);
  const timelineRef = useRef(null);
  const cdThumbAnimationRef = useRef(null); // Store the animation instance

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.path;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          audioRef.current.ontimeupdate = () => {
            timelineRef.current.value = Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            );
          };
          audioRef.current.onended = onNextSong;
        })
        .catch((error) => {
          console.log("Error playing audio:", error);
        });
    }
  }, [currentSong]);

  const HandlePlayPauseClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      audioRef.current.ontimeupdate = () => {
        timelineRef.current.value = Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      };
      audioRef.current.onended = onNextSong;
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.ontimeupdate = () => {
        timelineRef.current.value = Math.floor(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      };
      audioRef.current.onended = onNextSong;
    }
  };

  const TimelineChange = (e) => {
    audioRef.current.currentTime = Math.floor(
      (audioRef.current.duration * e.target.value) / 100
    );
  };

  const HandleReplaySong = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  useEffect(() => {
    const cdThumbElement = cdThumbRef.current;
    if (cdThumbElement && !cdThumbAnimationRef.current) {
      // Initialize the animation only once
      cdThumbAnimationRef.current = cdThumbElement.animate(
        [{ transform: "rotate(360deg)" }],
        {
          duration: 10000, // 10 seconds
          iterations: Infinity
        }
      );
      cdThumbAnimationRef.current.pause();
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      cdThumbAnimationRef.current?.play();
    } else {
      cdThumbAnimationRef.current?.pause();
    }
  }, [isPlaying]);

  return (
    <div className="dashboard">
      <header>
        <h3>Now playing:</h3>
        <h1>{currentSong.name}</h1>
      </header>

      <div className="cd">
        <img
        ref={cdThumbRef}
          class="cd-thumb"
          src={currentSong.image}
          alt={currentSong.name}
        />
      </div>

      <div className="control">
        <div class="btn btn-s btn-repeat" onClick={HandleReplaySong}>
          <i class="fas fa-redo"></i>
        </div>
        <div class="btn btn-s btn-prev" onClick={onPreviousSong}>
          <i class="fas fa-step-backward"></i>
        </div>
        <div class="btn btn-toggle-play" onClick={HandlePlayPauseClick}>
          {isPlaying ? (
            <i class="fas fa-pause icon-pause"></i>
          ) : (
            <i class="fas fa-play icon-play"></i>
          )}
        </div>
        <div class="btn btn-s btn-next" onClick={onNextSong}>
          <i class="fas fa-step-forward"></i>
        </div>
        <div class="btn btn-s btn-random" onClick={onRandomSong}>
          <i class="fas fa-random"></i>
        </div>
      </div>
      <input
        ref={timelineRef}
        onChange={TimelineChange}
        id="progress"
        className="progress"
        type="range"
        value="0"
        step="1"
        min="0"
        max="100"
      />
      <audio id="audio" ref={audioRef}></audio>
    </div>
  );
}

export default Dashboard;
