import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Play from '../../components/Play/Play';
export default function AdminPlays() {
  const plays = useSelector((state) => state.plays.plays);
  console.log(plays, 'plays');
  return (
    <>
      <div>
        {plays.length > 0 &&
          plays.map((play) => {
            return <Play key={play.id} {...play} />;
          })}
      </div>
    </>
  );
}
