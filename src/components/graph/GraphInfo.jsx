import React, { Component } from 'react';

class GraphInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            averageFirst: 0,
            averageSecond: 0,
            averageAll: 0
        }
    }
    render() { 
        return ( 
            <div className="flex flex-col items-start mx-8">
                <h1 className="text-lg font-bold self-center">Vaccinated Info</h1>
                <p>average 1st Dose injected per day: {this.state.averageFirst}</p>
                <p>average 2nd Dose injected per day: {this.state.averageSecond}</p>
                <p>average all Dose injected per day: {this.state.averageAll}</p>
            </div>
         );
    }
    componentDidMount(){
        let duration = this.props.data.length;
        let totalFirstDose = 0;
        let totalSecondDose = 0;
        let totalAllDose = 0;
        this.props.data.forEach(elem => {
            totalFirstDose += elem.firstDose;
            totalSecondDose += elem.secondDose;
        });
        totalAllDose = totalFirstDose + totalSecondDose;
        

        this.setState({
            averageFirst: Math.round(totalFirstDose/duration),
            averageSecond: Math.round(totalSecondDose/duration),
            averageAll: Math.round(totalAllDose/duration),
        })
    }
}
 
export default GraphInfo;