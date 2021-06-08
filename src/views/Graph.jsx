import React, { Component } from "react";

import GraphInput from "../components/graph/GraphInput";
import GraphPreview from "../components/graph/GraphPreview";
import axios from "axios";

class Graph extends Component {
  constructor(props) {
    super(props);
    this.addData = this.addData.bind(this);
    this.state = {
      url: "http://localhost:5000/",
      data: [],
    };
  }
  render() {
    return (
      <div>
        <GraphInput submit={this.addData}></GraphInput>
        <GraphPreview data={this.state.data}></GraphPreview>
      </div>
    );
  }
  addData() {
    console.log("data added");
  }

  componentDidMount() {
    axios.get(this.state.url + "vaccinated")
    .then((res)=>{
        this.setState({
            data: res.data
        })
    })
  }
}

export default Graph;
