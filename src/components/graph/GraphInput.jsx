import React, { Component } from "react";
import PropTypes from "prop-types";

class GraphInput extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.inputHandle = this.inputHandle.bind(this);
    this.state = {
      input: {
        firstDoseAmount: undefined,
        secondDoseAmount: undefined,
        errors: [],
      },
    };
  }
  render() {
    return (
      <div className="mt-8">
        <form
          className="flex flex-col w-3/5 mx-auto space-y-4"
          onSubmit={this.submit}
        >
          <div className="flex space-x-6">
            <input
              type="number"
              className="border py-1.5 px-2 flex-grow"
              id="firstDoseAmount"
              name="firstDoseAmount"
              value={this.state.input.firstDoseAmount}
              placeholder="first dose amount"
              onChange={this.inputHandle}
            />
            <input
              type="number"
              className="border py-1.5 px-2 flex-grow"
              id="secondDoseAmount"
              name="secondDoseAmount"
              value={this.state.input.secondDoseAmount}
              placeholder="second dose amount"
              onChange={this.inputHandle}
            />
          </div>
          <div className="flex justify-between">
            <div>
              {this.state.input.errors.map((error) => {
                return <p className="text-red-500"  key={error}>{error}</p>;
              })}
            </div>
            <input type="submit" className="py-1 w-2/5" />
          </div>
        </form>
      </div>
    );
  }

  inputHandle(e) {
    this.setState((state) => {
      let input = { ...state.input };
      input[e.target.name] = e.target.value;
      return {
        input: input,
      };
    });
  }

  submit(e) {
    e.preventDefault();
    if (
      this.state.input.firstDoseAmount === undefined ||
      this.state.input.firstDoseAmount === undefined
    ) {
      this.setState((state) => {
        let input = { ...state.input };
        input.errors = input.errors.filter((error) => {
          return error !== "please fill all blank form";
        });
        input.errors.push("please fill all blank form");

        return {
          input: input,
        };
      });
      console.log(this.state.input);
    } else {
      this.props.submit();
    }
  }
}

GraphInput.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default GraphInput;
