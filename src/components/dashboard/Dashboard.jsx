import React, { useEffect, useRef, useState } from "react";

function Dashboard({ currentSong, onNextSong, onPreviousSong, onRandomSong }) {
  if (!currentSong) {
    console.log("Can't load music");
    return null;
  }

  const cdThumbRef = useRef(null);
  const audioRef = useRef(null);
  const timelineRef = useRef(null);
  const cdThumbAnimationRef = useRef(null);
  const [isRandom, setIsRandom] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleIsRandom = () => {
    setIsRandom((prevState) => !prevState);
  };

  const toggleIsRepeat = () => {
    setIsRepeat((prevState) => !prevState);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.path;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Error playing audio:", error);
      });

      // Set up time update and onended event handlers
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current && timelineRef.current) {
          timelineRef.current.value = Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          );
        }
      };

      audioRef.current.onended = () => {
        if (isRepeat) {
          HandleReplaySong();
        } else {
          handleNextSong();
        }
      };
    }
  }, [currentSong, isRepeat, onNextSong]);

  const handleNextSong = () => {
    if (isRandom) {
      onRandomSong();
    } else {
      onNextSong();
    }
  };

  const HandlePlayPauseClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const TimelineChange = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.floor(
        (audioRef.current.duration * e.target.value) / 100
      );
    }
  };

  const HandleReplaySong = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const cdThumbElement = cdThumbRef.current;
    if (cdThumbElement && !cdThumbAnimationRef.current) {
      // Initialize the animation only once
      cdThumbAnimationRef.current = cdThumbElement.animate(
        [{ transform: "rotate(360deg)" }],
        {
          duration: 10000, // 10 seconds
          iterations: Infinity,
        }
      );
      cdThumbAnimationRef.current.pause();
    }
  }, []);

  useEffect(() => {
    if (cdThumbAnimationRef.current) {
      if (isPlaying) {
        cdThumbAnimationRef.current.play();
      } else {
        cdThumbAnimationRef.current.pause();
      }
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
          className="cd-thumb"
          src={currentSong.image}
          alt={currentSong.name}
        />
      </div>

      <div className="control">
        <div className={`btn btn-s btn-repeat ${isRepeat ? "active" : ""}`} onClick={toggleIsRepeat}>
          <i className="fas fa-redo"></i>
        </div>
        <div className="btn btn-s btn-prev" onClick={onPreviousSong}>
          <i className="fas fa-step-backward"></i>
        </div>
        <div className="btn btn-toggle-play" onClick={HandlePlayPauseClick}>
          {isPlaying ? (
            <i className="fas fa-pause icon-pause"></i>
          ) : (
            <i className="fas fa-play icon-play"></i>
          )}
        </div>
        <div className="btn btn-s btn-next" onClick={handleNextSong}>
          <i className="fas fa-step-forward"></i>
        </div>
        <div className={`btn btn-s btn-random ${isRandom ? "active" : ""}`} onClick={toggleIsRandom}>
          <i className="fas fa-random"></i>
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
