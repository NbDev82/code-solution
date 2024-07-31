import { Doughnut } from 'react-chartjs-2';
import { registerCharts } from '../registerCharts';
import PropTypes from 'prop-types';
import { memo } from 'react';
import '../chart.scss';
const position = 'top';
registerCharts();
DoughnutChart.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.array,
  dataValues: PropTypes.array,
  backgroundColor: PropTypes.array,
  borderColor: PropTypes.array,
};
DoughnutChart.defaultProps = {
  title: 'DoughnutChart',
  labels: [''],
  dataValues: [100],
  backgroundColor: [
    'rgba(255, 99, 132)',
    'rgba(53, 162, 235)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
    'rgba(201, 203, 207)',
  ],
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(53, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(201, 203, 207)',
  ],
};

function DoughnutChart(props) {
  const labels = props.labels;
  const dataValues = props.dataValues;

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: props.backgroundColor,
        borderColor: props.borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2,
    plugins: {
      legend: {
        position: position,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  return (
    <div className="graph-container">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default memo(DoughnutChart);
