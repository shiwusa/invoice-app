import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Statistics = () => {
  const [chartData, setChartData] = useState({});
  const [isChartVisible, setChartVisible] = useState(false);
  const [chartId, setChartId] = useState(1);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/invoices/statistics/${chartId}`);
        const data = await res.json();
        let labels = [];
        let values = [];

        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        switch (chartId) {
          case 1:
            labels = data.map((row) => row.status);
            values = data.map((row) => row.count);
            break;
          case 2:
            labels = data.map((row) => row.status);
            values = data.map((row) => row.amount);
            break;
          case 3:
            labels = data.map((row) => row.date);
            values = data.map((row) => row.amount);
            break;
        }

        setChartData({
          labels,
          datasets: [
            {
              label: `Chart ${chartId}`,
              data: values,
              backgroundColor: [
                "#5926C7",
                "#756694",
                "#476DF9",
                "#FBD087",
                "#C77826",
                "#C76B67",
                "#948770",
                "#34C778",
              ],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [chartId]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (isChartVisible) {
      const ctx = document.getElementById("chart").getContext("2d");
      chartRef.current = new Chart(ctx, {
        type: chartId === 1 ? "bar" : chartId === 2 ? "polarArea" : "line",
        data: chartData,
      });
    }
  }, [chartData, isChartVisible, chartId]);

  const toggleChartVisibility = () => {
    setChartVisible(!isChartVisible);
  };

  const handleChartButtonClick = (id) => {
    setChartId(id);
    setChartVisible(true);
  };

  const buttons = [
    {
      id: 1,
      label: "Quantity by status",
    },
    {
      id: 2,
      label: "Amount by status",
    },
    {
      id: 3,
      label: "Paid amount",
    },
  ];

  return (
    <div className="stats">
      <div className="stats-title">Statistics</div>
      <div>
        {buttons.map((button) => (
          <button
            key={button.id}
            className="stats-button"
            onClick={() => handleChartButtonClick(button.id)}
          >
            {button.label}
          </button>
        ))}
      </div>
      {isChartVisible && (
        <div className="chart-overlay">
          <div className="chart-wrapper">
            <div className="chart-header">
              <button className="close-button" onClick={toggleChartVisibility}>
                &#10005;
              </button>
            </div>
            <canvas id="chart" width="400" height="300" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
