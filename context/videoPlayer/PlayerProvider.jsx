import React, { useState } from 'react';

export const PlayerContext = React.createContext({
  play: (playerId, ref) => true,
  pause: (playerId, ref) => true,
  isPlaying: (playerId, ref) => false,
});

function PlayerProvider({ children }) {
  // store the id of the current playing player
  const [playing, setPlaying] = useState('');

  // set playing to the given id
  const play = (playerId, ref) => setPlaying(ref);

  // unset the playing player
  const pause = () => setPlaying(false, ref);

  // returns true if the given playerId is playing
  const isPlaying = (playerId, ref) => ref === playing;

  return (
    <PlayerContext.Provider value={{ play, pause, isPlaying, playing }}>
      {children}
    </PlayerContext.Provider>
  );
}

export default PlayerProvider;
