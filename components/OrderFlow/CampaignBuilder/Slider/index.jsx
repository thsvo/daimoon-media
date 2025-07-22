import { useState } from 'react';
import Slider from '@mui/material/Slider';

import slider from './slider.module.scss';

const CampaignSlider = (props) => {
  const { setData, data, values, label, service, endValue, itemIndex } = props;
  const [value, setValue] = useState();
  const [fieldInfo, setFieldInfo] = useState();
  const [active, setActive] = useState(false);

  const handleChange = (event, newValue) => {
    if (value != newValue) {
      if (active == true) {
        setActive(false);
      }

      setValue(newValue);
      const selectedValue = values.find((e) => e.value === newValue);

      const sliderObject = {
        value: selectedValue.obj.value,
        streams: selectedValue.obj.streams,
        min_streams: selectedValue.obj.min_streams,
        max_streams: selectedValue.obj.max_streams,
        min_followers: selectedValue.obj.min_followers,
        text: selectedValue.obj.text,
        max_followers: selectedValue.obj.max_followers,
        playlists: selectedValue.obj.playlists,
        cost: selectedValue.obj.cost,
        baseCostExcl: selectedValue.obj.cost,
        budget: selectedValue.obj.budget,
      };

      setFieldInfo(selectedValue);

      const trackIndex = data.findIndex((o) => o.itemIndex == itemIndex);

      if (trackIndex == -1) {
        const campaignObject = {
          itemIndex: itemIndex,
          index: selectedValue.value,
          values: [{ label: label, value: { ...sliderObject } }],
        };
        setData([...data, campaignObject]);
      } else {
        const updatedValue = data[trackIndex].values.findIndex(
          (o) => o.label == label
        );

        if (updatedValue == -1) {
          data[trackIndex].values = [
            ...data[trackIndex].values,

            {
              label: label,
              index: selectedValue.value,
              value: { ...sliderObject },
            },
          ];

          setData([...data]);
        } else {
          data[trackIndex].values[updatedValue] = {
            label: label,
            index: selectedValue.value,
            value: { ...sliderObject },
          };
          setData([...data]);
        }
      }
    }
  };

  const defaultValue = () => {
    let selectedValue;

    if (data[itemIndex]) {
      const updatedValue = data[itemIndex].values.findIndex(
        (o) => o.label == label
      );

      if (updatedValue != -1) {
        selectedValue = values.find(
          (e) => e.value === data[itemIndex].values[updatedValue].index
        );
      }
    }
    if (selectedValue) {
      setFieldInfo(selectedValue);

      return selectedValue.value;
    }
  };

  const style = {
    color:
      service == 'spotify'
        ? '#1db954'
        : service == 'youtube'
        ? '#FF0000'
        : service == 'soundcloud' && '#FF5502',
  };

  return (
    <div className={slider.sliderItem}>
      <label className={service == 'spotify' && slider.spotifyLabel}>
        {label}{' '}
        <span>{fieldInfo && fieldInfo.obj.text ? fieldInfo.obj.text : 0}</span>
        {/* <ToolTipCustom label={''} text={explanation}>
          <Explanation />
        </ToolTipCustom> */}
      </label>
      <Slider
        className={slider.slider}
        style={style}
        defaultValue={defaultValue}
        marks={values}
        step={0}
        max={endValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default CampaignSlider;
