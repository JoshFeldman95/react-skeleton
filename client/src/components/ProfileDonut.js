import React, { Component } from 'react'
import Chart from "chart.js";


Chart.defaults.global.defaultFontFamily = "'roboto', sans-serif"
const styles = {
  canvasContainer: {
    marginBottom: 80,
  }
}


export default class ProfileDonut extends Component {
    chartRef = React.createRef();

    componentDidMount() {

      // const data = {
      //       datasets: [{
      //           data: [10, 20, 30],
      //           backgroundColor: ["#95c6ff", "#ffd895", "#ffa395"]
      //       }],
    // };

    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
        ctx.save();
        var fontSize = (height / 300).toFixed(2);
        ctx.font = "300 " + fontSize + "em roboto";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#777777";
        var text = "4.7 hours",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2 + 10;

        var text2 = "7 sessions",
            textY2 = textY+ 20;


        ctx.fillText(text, textX, textY);
        ctx.fillText(text2, textX, textY2)
        ctx.restore();

      }
    });
      const data = {
        labels: [
          "Word Quest",
          "Rhyme Racer",
          "Story Book"
        ],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [
              "#95c6ff",
              "#ffd895",
              "#ffa395"
            ],
            hoverBackgroundColor: [
              "#95c6ff",
              "#ffd895",
              "#ffa395"
            ]
          }]
      };
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'doughnut',
            data: data,
            options: {
              responsive:true,
            }
        });
//         new Chart($('#myChart')[0].getContext('2d')).DoughnutTextInside(data, {
//     responsive: true
// });
    }
    render() {
        return (
            <div style={styles.canvasContainer}>
                <canvas
                    id="myChart"
                    style={{
                      width: 380,
                      height: 370
                    }}
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
