import React, { Component } from "react";

class GraphInput extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {};
  }
  render() {
    return (
      <div className="mt-8">
        <form className="flex flex-col mx-96 px-24 space-y-4" onSubmit={this.submit}>
          <div className="flex space-x-6">
            <input
              type="text"
              className="border py-1.5 px-2 flex-grow"
              placeholder="first dose amount"
            />
            <input
              type="text"
              className="border py-1.5 px-2 flex-grow"
              placeholder="second dose amount"
            />
          </div>
          <input type="submit" className="py-1 w-48 self-center" />
        </form>
      </div>
    );
  }

  submit(e){
      e.preventDefault();
      console.log("submit");
  }
}

export default GraphInput;
