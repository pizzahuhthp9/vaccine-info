import React, { Component } from 'react';

import GraphInput from '../components/graph/GraphInput'

class Graph extends Component {
    constructor(props) {
        super(props);
        this.addData = this.addData.bind(this);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <GraphInput submit={this.addData}></GraphInput>
            </div>
         );
    }
    addData(){
        console.log("data added");
    }
}
 
export default Graph;