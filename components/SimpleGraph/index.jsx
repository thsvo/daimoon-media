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

import { Line } from 'react-chartjs-2';

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

const SimpleGraph = (props) => {
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

  const colorScheme = {
    minimal: {
      borderColor:
        activeService == 'spotify'
          ? 'rgba(30, 215, 96, 0.5)'
          : 'rgba(255, 85, 2, 0.5)',
    },
    maximal: {
      borderColor:
        activeService == 'spotify' ? 'rgb(30, 215, 96)' : 'rgb(255, 85, 2)',
      backgroundColor:
        activeService == 'spotify'
          ? 'rgb(30, 215, 96, 0.1)'
          : 'rgb(255, 85, 2, 0.1)',
    },
  };

  const dummyData = {
    labels: ['a', 'b', 'c', 'd'],
    datasets: [
      {
        label: 'Total streams',
        data: [10, 11, 21, 31],
        borderColor: 'rgba(30, 215, 96, 1)',
        //backgroundColor: 'rgba(30, 215, 96, 0)',
        tension: 0.1,
      },
      {
        label: 'Delivered streams',
        data: [0, 10, 10, 20],
        borderColor: 'rgba(177, 101, 237, 1)',
        backgroundColor: 'rgba(177, 101, 237, 0.1)',

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
        display: false,
      },
    },
    elements: {
      line: {
        borderWidth: 4,
      },
      point: {
        radius: 0,
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

  function nFormatter(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    <div className={styles.container}>
      <div className={styles.graphHeader}>
        <label className={styles.head}>Streams</label>
        <div className={styles.legend}>
          <span>Total streams</span>
          <span>Delivered streams</span>
        </div>
      </div>
      <Line options={options} data={dummyData} />
    </div>
  );
};

export default SimpleGraph;
