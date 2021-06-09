import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

class GraphPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null
    };
  }
  render() {
    return (
      <div className="">
        <canvas id={this.props.name}></canvas>
      </div>
    );
  }

  componentDidMount() {
    const labels = this.props.data.map((data)=>{
      return data.date
    })
    const firstDose = this.props.data.map((data)=>{
      return data.firstDose
    })
    const secondDose = this.props.data.map((data)=>{
      return data.secondDose
    })
    
    const ctx = document.getElementById(this.props.name);
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels, 
            datasets: [{
                label: 'first dose injected',
                data: firstDose,
                backgroundColor: 'rgba(0,0,255, 1)',
                borderColor: "rgba(0,0,255, 0.3)",
                borderWidth: 1
            },{
                label: 'second dose injected',
                data: secondDose,
                backgroundColor: 'rgba(255,0,0, 1)',
                borderColor: "rgba(255,0,0, 0.3)",
                borderWidth: 1
            }]
        },
    })
    this.setState({
      chart
    })
  }

  componentDidUpdate(prevprops){
    if (prevprops === this.props) {
      return
    }
    this.state.chart.data.labels.push(this.props.data[this.props.data.length - 1].date)
    this.state.chart.data.datasets[0].data.push(this.props.data[this.props.data.length - 1].firstDose)
    this.state.chart.data.datasets[1].data.push(this.props.data[this.props.data.length - 1].secondDose)

    this.state.chart.update();
  }
}

GraphPreview.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default GraphPreview;
