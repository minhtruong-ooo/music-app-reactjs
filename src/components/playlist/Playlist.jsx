import React from "react";

function Playlist({ songs, setCurrentSong }) {
  return (
    <div className="playlist">
    {songs.map((song, index) => (
      <div key={index} className="song" onClick={() => setCurrentSong(song)}>
        <div>
          <img className="thumb" src={song.image} alt={song.name} />
        </div>
        <div className="body">
          <h3 className="title">{song.name}</h3>
          <p className="author">{song.singer}</p>
        </div>
        <div className="option">
          <i className="fas fa-ellipsis-h"></i>
        </div>
      </div>
    ))}
  </div>
  );
}

export default Playlist;
