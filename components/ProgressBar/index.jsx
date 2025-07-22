import { useEffect } from 'react';

import { motion } from 'framer-motion';

const ProgressBar = (props) => {
  const { bgcolor, completed, goal, type = 1, pitched, unpitched } = props;

  const progress = (completed / goal) * 100;
  const pitchProgress = (pitched / goal) * 100;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: '#363636',
    borderRadius: 50,
    position: 'relative',
  };

  const fillerStyles = {
    height: '100%',
    width: `0%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    position: type == 2 && 'absolute',
  };

  const labelStyles = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const secondBar = {
    height: '100%',
    width: `0%`,
    backgroundColor: '#5e5e5e',
    borderRadius: 'inherit',
    textAlign: 'right',
    position: type == 2 && 'absolute',
  };

  const type2Label = {
    position: 'absolute',
    bottom: '-30px',
    right: 0,

    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '12px',
    textAlign: 'center',
    letterSpacing: '0.428571px',
    display: 'flex',
    flexDirection: 'column',

    color: '#4A4A4A',
  };

  function nFormatter(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    <div style={{ width: '100%', marginTop: '0px' }}>
      {type == 1 ? (
        <div style={containerStyles}>
          <motion.div
            style={fillerStyles}
            animate={{ width: `${progress > 100 ? 100 : progress}%` }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
          >
            <span style={labelStyles}>{`${completed}`}</span>
          </motion.div>
        </div>
      ) : type == 2 ? (
        <div style={containerStyles}>
          {pitchProgress != 0 && (
            <motion.div
              style={secondBar}
              animate={{ width: `${pitchProgress}%` }}
              transition={{ delay: 0.25, type: 'spring', stiffness: 100 }}
            >
              {pitched != 0 && (
                <span style={type2Label}>
                  {`${nFormatter(pitched - completed)}`}
                  <label>pitched</label>
                </span>
              )}
            </motion.div>
          )}

          {completed != 0 && (
            <motion.div
              style={{ ...fillerStyles }}
              animate={{ width: `${progress > 100 ? 100 : progress}%` }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            >
              <span style={{ ...type2Label, color: '#1ED760' }}>
                {`${nFormatter(completed)}`} <label>accepted</label>
              </span>
            </motion.div>
          )}

          {unpitched > 0 && (
            <span style={{ ...type2Label, right: '-15px' }}>
              {`${nFormatter(unpitched)}`} <label>unpitched</label>
            </span>
          )}
        </div>
      ) : (
        type == 3 && (
          <div style={containerStyles}>
            <motion.div
              style={fillerStyles}
              animate={{ width: `${progress > 100 ? 100 : progress}%` }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 100 }}
            ></motion.div>
          </div>
        )
      )}
    </div>
  );
};

export default ProgressBar;
