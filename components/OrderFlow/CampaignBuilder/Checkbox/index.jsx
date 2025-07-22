import { useEffect } from 'react';

import ToolTipCustom from '/components/Tooltip';
import Explanation from '/public/icons/explanation.jsx';

import checkbox from './checkbox.module.scss';

const CampaignCheckbox = (props) => {
  const {
    values,
    label,
    service,
    setData,
    data,
    itemIndex,
    setRegion,
    region,
    previousValues,
    explanation,
  } = props;

  const toggleCountry = (index) => {
    const updatedValue = region.findIndex((i) => i == index);

    if (updatedValue == -1) {
      setRegion([...region, index]);
    } else {
      region.splice(updatedValue, 1);
      setRegion([...region]);
    }
  };

  useEffect(() => {
    let targets = [];
    let baseCostExcl = data[itemIndex].values[0].value.baseCostExcl;
    //let additionalCost = 0;

    region.map((i) => {
      const percentage = values[i].cost.replace('%', '');
      const value = {
        ...values[i],
        costExcl: (baseCostExcl * (parseFloat(percentage) / 100)).toFixed(2),
        index: i,
      };
      targets = [...targets, value];

      //additionalCost = additionalCost + values[i].cost;
    });

    if (data[itemIndex]) {
      data[itemIndex].targets = targets;

      setData(data);
    }
  }, [region, data[itemIndex].values[0].value.baseCostExcl]);

  const style = {
    backgroundColor:
      service == 'spotify'
        ? '#1db954'
        : service == 'youtube'
        ? '#FF0000'
        : service == 'soundcloud' && '#FF5502',
  };

  return (
    <div className={checkbox.sliderItem}>
      <label>
        {label}
        <ToolTipCustom label={''} text={explanation}>
          <Explanation />
        </ToolTipCustom>
      </label>
      <ul>
        {values.map((item, index) => (
          <li
            onClick={() => toggleCountry(index)}
            className={checkbox.checkboxContainer}
            key={index}
          >
            <div className={checkbox.checkbox}>
              <input type='checkbox' />
              {region.findIndex((i) => i == index) != -1 && (
                <span style={style} className={checkbox.checkmark}></span>
              )}
            </div>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignCheckbox;
