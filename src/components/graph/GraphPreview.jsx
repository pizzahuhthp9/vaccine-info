import React, { Component } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

class GraphPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="w-3/5">
        <canvas id={this.props.name} className="w-full h-auto"></canvas>
      </div>
    );
  }

  componentDidMount() {
    console.log(this.props.data);
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
    new Chart(ctx, {
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

  }
}

GraphPreview.propTypes = {
  data: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired
};

export default GraphPreview;
