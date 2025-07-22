import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

import Explanation from '/public/icons/explanation.jsx';
import nFormatter from '/lib/Formatter/number';

import { Line } from 'react-chartjs-2';

import ToolTipCustom from '/components/Tooltip';

import styles from './graph.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Graph = (props) => {
  const {
    label,
    sliderValues = false,
    activeService,
    graphInfo,
    mobile = false,
  } = props;

  let streams = 0;
  let min_streams = 0;
  let max_streams = 0;
  let min_followers = 0;
  let max_followers = 0;
  let playlists = 0;
  let followers = 0;

  sliderValues &&
    sliderValues.values.map((item) => {
      streams = streams + item.value.streams;
      min_streams = min_streams + item.value.min_streams;
      min_followers = min_followers + item.value.min_followers;
      max_streams = max_streams + item.value.max_streams;
      max_followers = max_followers + item.value.max_followers;
      playlists = playlists + item.value.playlists;
      followers = followers + item.value.value;
    });

  function range(minimal = 0) {
    return Array(31)
      .fill()
      .map(
        (_, idx) =>
          Math.floor(
            Math.random() * (streams / 28 - streams / 31 + 1) + streams / 31
          ) - minimal
      );
  }

  const minimalStreams = range(100);
  const maximalStreams = range();

  const days = Array(31)
    .fill()
    .map((_, idx) => 'Day ' + idx * 1);

  const labels = days;
  activeService;

  const colorScheme = {
    minimal: {
      borderColor:
        activeService == 'spotify'
          ? 'rgba(30, 215, 96, 0.5)'
          : activeService == 'soundcloud'
          ? 'rgba(255, 85, 2, 0.5)'
          : activeService == 'tiktok' && 'rgba(177, 101, 237, 0.5)',
    },
    maximal: {
      borderColor:
        activeService == 'spotify'
          ? 'rgb(30, 215, 96)'
          : activeService == 'soundcloud'
          ? 'rgba(255, 85, 2)'
          : activeService == 'tiktok' && 'rgba(177, 101, 237)',
      backgroundColor:
        activeService == 'spotify'
          ? 'rgb(30, 215, 96, 0.1)'
          : activeService == 'soundcloud'
          ? 'rgba(255, 85, 2, 0.1)'
          : activeService == 'tiktok' && 'rgba(177, 101, 237, 0.1)',
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Min streams',
        data: [0, [minimalStreams[0] / 2], ...minimalStreams],
        borderColor: colorScheme.minimal.borderColor,
        //backgroundColor: 'rgba(30, 215, 96, 0)',
        tension: 0.5,
      },
      {
        label: 'Max streams',
        data: [maximalStreams[0] / 3, maximalStreams[1], ...maximalStreams],
        borderColor: colorScheme.maximal.borderColor,
        backgroundColor: colorScheme.maximal.backgroundColor,
        fill: '-1',
        tension: 0.5,
      },
    ],
  };

  const dummyData = {
    labels,
    datasets: [
      {
        label: 'Min streams',
        data: [],
        borderColor: 'rgba(30, 215, 96, 0.5)',
        //backgroundColor: 'rgba(30, 215, 96, 0)',
        tension: 0.1,
      },
      {
        label: 'Max streams',
        data: [],
        borderColor: 'rgb(30, 215, 96)',
        backgroundColor: 'rgb(30, 215, 96, 0.1)',
        fill: '-1',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
      title: {
        text: ['Additional Daily Streams'],
        display: true,
        color: '#FDFDFD',
        align: 'start',
        font: {
          size: 14,
          lineHeight: 1.6,
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        displayColors: false,
        bodyColor: 'rgba(255, 255, 255, 1)',
        interaction: {
          mode: 'nearest',
        },
        bodyFont: {
          size: 14,
          lineHeight: 1.6,
          weight: '900',
        },

        callbacks: {
          title: function () {},
        },
      },
    },
    elements: {
      line: {
        borderWidth: 4,
      },
      point: {
        radius: 4,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: true,
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.13)',
          drawBorder: false,
        },
        afterFit: function (scale) {
          scale.width = 90; //<-- set value as you wish
        },
        min: 0,
        max:
          streams / 2 >= 45000
            ? 6000
            : streams / 2 >= 25000
            ? 3000
            : streams / 2 >= 14000
            ? 1500
            : streams / 2 >= 1500
            ? 1000
            : 100,
        ticks: {
          // forces step size to be 50 units
          stepSize:
            streams / 2 >= 45000
              ? 1200
              : streams / 2 >= 25000
              ? 600
              : streams / 2 >= 14000
              ? 300
              : streams / 2 >= 1500
              ? 200
              : 20,

          beginAtZero: true,
          padding: 30,

          font: {
            family: 'Montserrat',
            size: 14,
            weight: 600,
          },
        },
      },
    },
  };

  const estimateds =
    activeService == 'youtube'
      ? [
          {
            min: nFormatter(Math.floor(followers)),
            max: nFormatter(Math.floor(followers)),
          },
          {
            min: nFormatter((streams / 100) * 80),
            max: nFormatter((streams / 100) * 120),
          },
        ]
      : [
          // {
          //   min: playlists / 2,
          //   max: playlists + playlists / 2,
          // },
          {
            min: nFormatter(min_followers),
            max: nFormatter(max_followers),
          },
          {
            min: nFormatter(min_streams),
            max: nFormatter(max_streams),
          },
        ];

  return (
    <section className={styles.container}>
      <div className={styles.graphLabels}>
        {graphInfo &&
          graphInfo.map((item, index) => (
            <div
              key={index}
              className={
                activeService == 'spotify'
                  ? styles.item
                  : [styles.item, styles.item__sc].join(' ')
              }
            >
              <div>
                {estimateds[index] && (
                  <span>
                    {`${estimateds[index].min} to ${estimateds[index].max}`}
                  </span>
                )}

                <sub>{item.title}</sub>
              </div>
              {item.info && (
                <ToolTipCustom label={''} text={item.info}>
                  <Explanation />
                </ToolTipCustom>
              )}
            </div>
          ))}
      </div>
      {mobile != true && (
        <div className={styles.graphContainer}>
          <legend>
            <span
              className={[
                styles.min,
                activeService == 'soundcloud' && styles.min__sc,
              ].join(' ')}
            >
              Min
            </span>
            <span
              className={[
                styles.max,
                activeService == 'soundcloud' && styles.max__sc,
              ].join(' ')}
            >
              Max
            </span>
          </legend>
          {streams / 2 >= 1500 ? (
            <>
              <Line options={options} data={data} />
              <div className={styles.disclaimer}>
                *Disclaimer: All statistics are estimates & your actual results
                may differ.
              </div>
            </>
          ) : (
            <div style={{ height: 260 }}>
              <div className={styles.overlay}>
                <div className={styles.content}>
                  <p>
                    Graphics unavailable <br /> Build a{' '}
                    <span>
                      <b>bigger campaign</b>
                    </span>{' '}
                    for extra insights.
                  </p>
                </div>
              </div>
              <Line options={options} data={dummyData} />
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Graph;
