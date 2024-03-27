import { registerCharts } from '../registerCharts';
import { memo } from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import '../chart.scss';
const position = 'top';
registerCharts();
BarChart.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.array,
  dataValues: PropTypes.array,
  backgroundColor: PropTypes.array,
  borderColor: PropTypes.array,
};
BarChart.defaultProps = {
  title: 'BarChart',
  labels: [''],
  dataValues: [{ dataLabel: '', dataValues: [100] }],
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

function BarChart(props) {
  const options = {
    responsive: true,
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

  const labels = props.labels;
  const dataValues = props.dataValues;
  const data = {
    labels,
    datasets: [],
  };
  for (let i = 0; i < dataValues.length; i++) {
    data.datasets.push({
      label: dataValues[i].dataLabel,
      data: dataValues[i].dataValues,
      backgroundColor: props.backgroundColor[i],
      borderColor: props.borderColor[i],
      borderWidth: 1,
    });
  }

  return (
    <div className="graph-container">
      <Bar options={options} data={data} />
    </div>
  );
}

export default memo(BarChart);
