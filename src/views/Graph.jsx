import React, { Component } from 'react';

import GraphInput from '../components/graph/GraphInput'

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <GraphInput></GraphInput>
            </div>
         );
    }
}
 
export default Graph;