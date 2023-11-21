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
      <div className="space-y-12 grid grid-cols-3">
        <div className="col-span-3 ">
          <GraphInput submit={this.addData}></GraphInput>
        </div>
        <div className="col-span-2">
          {this.state.isloaded && (
            <GraphPreview data={this.state.data} name="stack"></GraphPreview>
          )}
        </div>
        <div className="row-span-2">
          {
            this.state.isloaded && (
              <GraphInfo data={this.state.enumerateData}></GraphInfo>
          )}
        </div>
        <div className="col-span-2">
        {this.state.isloaded && (
          <GraphPreview
            data={this.state.enumerateData}
            name="enum"
          ></GraphPreview>
        )}
        </div>
      </div>
    );
  }
  addData(inputData) {
    inputData.firstDoseAmount = parseInt(inputData.firstDoseAmount);
    inputData.secondDoseAmount = parseInt(inputData.secondDoseAmount);

    let date = new Date(this.state.data[this.state.data.length - 1].date);

    this.setState(
      (state) => {
        let data = [...state.data];
        let enumerateData = [...state.enumerateData];
        const newEnumerateDate = {
          firstDose:
            inputData.firstDoseAmount - data[data.length - 1].firstDose,
          secondDose:
            inputData.secondDoseAmount - data[data.length - 1].secondDose,
          date: this.toDateFormat(date),
        };
        enumerateData.push(newEnumerateDate);

        date.setDate(date.getDate() + 1);
        const newData = {
          date: this.toDateFormat(date),
          firstDose: inputData.firstDoseAmount,
          secondDose: inputData.secondDoseAmount,
        };
        data.push(newData);

        return {
          data,
          enumerateData,
        };
      },
      () => {
        axios.post(
          this.state.url + "vaccinated",
          this.state.data[this.state.data.length - 1]
        );
      }
    );
  }

  toDateFormat(date) {
    const format = date.toString().split(" ");
    return parseInt(format[2]) + "-" + format[1] + "-" + format[3];
  }

  getEnumerateData(data) {
    let prevelem = null;
    let enumerateData = [];
    data.forEach((elem) => {
      if (prevelem) {
        enumerateData.push({
          date: prevelem.date,
          firstDose: elem.firstDose - prevelem.firstDose,
          secondDose: elem.secondDose - prevelem.secondDose,
        });
      }
      prevelem = elem;
    });
    return enumerateData;
  }

  componentDidMount() {
    axios
      .get(this.state.url + "vaccinated")
      .then((res) => {
        this.setState({
          data: res.data,
          enumerateData: this.getEnumerateData(res.data),
        });
      })
      .then(() => {
        this.setState({
          isloaded: true,
        });
      });
  }
}

export default Graph;
