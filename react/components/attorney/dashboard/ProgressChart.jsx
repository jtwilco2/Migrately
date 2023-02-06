import React from "react";
import ApexCharts from "components/dashboard/analytics/ApexCharts";
import PropTypes from "prop-types";

function ProgressChart(props) {
  const { value } = props;
  const TaskSectionChartSeries = [value];
  const TaskSectionChartOptions = {
    chart: { height: 40, width: 40, type: "radialBar" },
    grid: {
      show: true,
      padding: { left: -15, right: -15, top: -12, bottom: -15 },
    },
    colors: ["#19cb98"],
    plotOptions: {
      radialBar: {
        hollow: { size: "30%" },
        dataLabels: {
          showOn: "always",
          name: {
            show: true,
            fontSize: "11px",
            fontFamily: undefined,
            fontWeight: 600,
            color: undefined,
            offsetY: 4,
          },
          value: { show: true },
        },
      },
    },
    stroke: { lineCap: "round" },
    labels: [value + "%"],
  };

  return (
    <ApexCharts
      options={TaskSectionChartOptions}
      series={TaskSectionChartSeries}
      type="radialBar"
      height={40}
      width={40}
    />
  );
}

ProgressChart.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({
            progress: PropTypes.number.isRequired
        })
    )
};

export default ProgressChart;
