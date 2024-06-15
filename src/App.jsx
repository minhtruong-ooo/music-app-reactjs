import React, { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import Playlist from "./components/playlist/Playlist";
import ChungTaCuaHienTai from "./assets/music/ChungTaCuaHienTai-SonTungMTP-6892340.mp3";
import EmCuaNgayHomQua from "./assets/music/EmCuaNgayHomQua-SonTungMTP-2882720.mp3";
import HayTraoChoAnh from "./assets/music/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3";
import LacTroi from "./assets/music/LacTroi-SonTungMTP-4725907.mp3";
import NangAmXaDan from "./assets/music/NangAmXaDan-SonTungMTP-2697291.mp3";
import NoiNayCoAnh from "./assets/music/NoiNayCoAnh-SonTungMTP-4772041.mp3";

const songs = [
  {
    name: "Hãy Trao Cho Anh",
    singer: "Sơn Tùng M-TP x Snoop Dogg",
    path: HayTraoChoAnh,
    image:
      "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/b/a/2/d/ba2dc0a1c982fa0b1fca5ed2530fe7a9.jpg",
  },
  {
    name: "Nơi Này Có Anh",
    singer: "Sơn Tùng M-TP",
    path: NoiNayCoAnh,
    image:
      "https://upload.wikimedia.org/wikipedia/vi/1/1d/N%C6%A1i_n%C3%A0y_c%C3%B3_anh_-_Single_Cover.jpg",
  },
  {
    name: "Chúng Ta Của Hiện Tại",
    singer: "Sơn Tùng M-TP",
    path: ChungTaCuaHienTai,
    image:
      "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/f/0/c/6/f0c6b74652e9ed643f3183c7617aaa30.jpg",
  },
  {
    name: "Em Của Ngày Hôm Qua",
    singer: "Sơn Tùng M-TP",
    path: EmCuaNgayHomQua,
    image:
      "https://upload.wikimedia.org/wikipedia/vi/thumb/5/5d/Em_c%E1%BB%A7a_ng%C3%A0y_h%C3%B4m_qua.png/220px-Em_c%E1%BB%A7a_ng%C3%A0y_h%C3%B4m_qua.png",
  },
  {
    name: "Lạc Trôi",
    singer: "Sơn Tùng M-TP",
    path: LacTroi,
    image:
      "https://upload.wikimedia.org/wikipedia/vi/5/5d/Lac_troi_single_sontungmtp.jpg",
  },
  {
    name: "Nắng Ấm Xa Dần",
    singer: "Sơn Tùng M-TP",
    path: NangAmXaDan,
    image: "https://i.scdn.co/image/ab67616d0000b27306a4d1fd269dc47911d37eb3",
  },
];

function App() {
  const [currentSong, setCurrentSong] = useState(0);

  const handleNextSong = () => {
    setCurrentSong((prevIndex) => (prevIndex + 1) % songs.length);
  };
  const handlePreviousSong = () => {
    setCurrentSong((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };
  const handleRandomSong = () => {
    setCurrentSong(Math.floor(Math.random() * (songs.length)));
  };

  return (
    <>
      <div className="player">
        <Dashboard currentSong={songs[currentSong]} onNextSong={handleNextSong} onPreviousSong={handlePreviousSong} onRandomSong={handleRandomSong}></Dashboard>
        <Playlist songs={songs} setCurrentSong={(song) => setCurrentSong(songs.indexOf(song))}></Playlist>
      </div>
    </>
  );
}

export default App;
