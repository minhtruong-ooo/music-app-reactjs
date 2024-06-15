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
            <a href={song.path} download={`${song.name}.mp3`}><i className="fas fa-download"></i></a>
        </div>
      </div>
    ))}
  </div>
  );
}

export default Playlist;
