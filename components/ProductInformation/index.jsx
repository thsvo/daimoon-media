import Image from 'next/image';

import styles from './information.module.scss';

import Tick from '/public/icons/tick';
import head from '/public/images/daimoon-head.png';

const ProductInformation = (props) => {
  const { service, content, title, sub } = props;

  const color = {
    color:
      service == 'spotify'
        ? '#1ED760'
        : service == 'youtube'
        ? '#FF0000'
        : service == 'soundcloud' && '#FF5502',
  };

  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p dangerouslySetInnerHTML={{ __html: sub }}></p>
      <div
        style={{
          border: ' 3px solid ' + color.color,
          boxShadow: `0px 0px 37px 10px ` + color.color,
        }}
        className={styles.demoGraph}
      >
        <div className={styles.detailsContainer}>
          {content.details.map((block, index) => (
            <div className={styles.details} key={index}>
              <label style={color}>{block.name}</label>
              <ul>
                {block.list.map((entry, index) => (
                  <li key={index}>
                    <Tick fill={color.color} />
                    {entry}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{ backgroundColor: color.color }}
          className={styles.button}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          Explore your opportunities!
        </div>
        <div className={styles.head}>
          <Image objectFit={'cover'} fill src={head} alt={'daimoon'} />
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
