import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './Record.css';

class Record extends Component{

    render(){

        let options = ["Income", "Payment"];
        let showOptions = null;

        showOptions = (
            <div className="ShowOptions">
                <div className="list-group">
                {options.map((option) => {
                    return(
                        <Link className="list-group-item" to={"record/" + option.toLowerCase()} key={option}>{option}</Link>
                    );
                })}
                </div>
            </div>
        );

        return(
            <div className="Record">
                <div className="Options">
                    <h4>What do you want to record</h4>
                    {showOptions}
                </div>
            </div>
        );
    }
}

export default Record;