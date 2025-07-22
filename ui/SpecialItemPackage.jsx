import cslx from 'clsx';
import { useState, useEffect } from 'react';

const SpecialItemPackage = ({
  streams,
  followers,
  originalPrice,
  newPrice,
  setSelectedPackage,
  budget,
  min_streams,
  max_streams,
}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    active &&
      setSelectedPackage([
        {
          index: 2,
          label: 'Campaign: ',
          value: {
            baseCostExcl: newPrice,
            budget: budget,
            cost: newPrice,
            costEUR: 0,
            originalPrice: originalPrice,
            max_followers: followers,
            max_streams: max_streams,

            min_followers: followers,
            min_streams: min_streams,
            playlists: 0,
            streams: streams,
            value: followers,

            specialPackage: true,
            text: 'Spotify Dominance🔥 (One time only)',
          },
        },
      ]);
  }, [active]);

  return (
    <div
      onClick={() => setActive(!active)}
      className={cslx(
        'border-2 border-solid border-[#1db954] shadow-[#1db954] p-5 rounded-[10px] bg-[#ffffff26] shadow-md cursor-pointer hover:scale-105 flex flex-col'
      )}
    >
      <span>
        <b>Spotify Dominance🔥</b>
      </span>
      <label className='mt20'>
        <u>Your song:</u>
      </label>
      <ul className='mt-0'>
        <li>1. Internally reviewed</li>
        <li>2. Pitched to Curators</li>
        <li>3. Featured & monitored</li>
      </ul>
      <label>Result?</label>
      <span>
        <b>At least {min_streams}(!) streams!</b>
      </span>
      <div className='flex flex-col mt20'>
        <span>
          Value <s>${originalPrice},-</s>
        </span>
        <span>
          <b>One-Time-Only: ${newPrice},-</b>
        </span>
      </div>
    </div>
  );
};

export default SpecialItemPackage;
