import React, { Component } from "react";

import GraphInput from "../components/graph/GraphInput";
import GraphPreview from "../components/graph/GraphPreview";
import GraphInfo from "../components/graph/GraphInfo";
import axios from "axios";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.addData = this.addData.bind(this);
    this.state = {
      url: "http://localhost:5000/",
      data: [],
      enumerateData: [],
      isloaded: false,
    };
  }
  render() {
    return (
      <div className="space-y-4">
        <GraphInput submit={this.addData}></GraphInput>
        <div className="flex space-x-2">
          {this.state.isloaded && <GraphPreview data={this.state.data} name="stack"></GraphPreview>}
          <GraphInfo></GraphInfo>
        </div>
        <div className="flex space-x-2">
          {this.state.isloaded && <GraphPreview data={this.state.enumerateData} name="enum"></GraphPreview>}
          <GraphInfo></GraphInfo>
        </div>
      </div>
    );
  }
  addData() {
    console.log("data added");
  }

  getEnumerateData(data){
    let prevelem = null;
    let enumerateData = [];
    data.forEach(elem => {
      if (prevelem) {
        enumerateData.push({
          date: prevelem.data,
          firstDose: elem.firstDose - prevelem.firstDose,
          secondDose: elem.secondDose - prevelem.secondDose
        })
      } else{
        prevelem = elem;
      }
    });
    return enumerateData;
  }

  componentDidMount() {
    axios.get(this.state.url + "vaccinated").then((res) => {
      this.setState({
        data: res.data,
        enumerateData: this.getEnumerateData(res.data)
      });
    }).then(()=>{
      this.setState({
        isloaded: true
      })
    });
  }
}

export default Graph;
