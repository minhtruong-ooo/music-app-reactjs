import React from 'react';

function Dashboard({currentSong}) {
    return (
        <div className='dashboard'>
            <header>
                <h4>Now playing:</h4>
                <h2>{currentSong.name}</h2>
            </header>

            <div class="cd">
                <img class="cd-thumb" src={currentSong.image} alt={currentSong.name} />
            </div>

            <div className='control'>
                <div class="btn btn-repeat">
                    <i class="fas fa-redo"></i>
                </div>
                <div class="btn btn-prev">
                    <i class="fas fa-step-backward"></i>
                </div>
                <div class="btn btn-toggle-play">
                    {/* <i class="fas fa-pause icon-pause"></i> */}
                    <i class="fas fa-play icon-play"></i>
                </div>
                <div class="btn btn-next">
                    <i class="fas fa-step-forward"></i>
                </div>
                <div class="btn btn-random">
                    <i class="fas fa-random"></i>
                </div>
            </div>
            <input id="progress" className="progress" type="range" value="0" step="1" min="0" max="100" />
            <audio id="audio" src={currentSong.path}></audio>
        </div>
    );
}

export default Dashboard;