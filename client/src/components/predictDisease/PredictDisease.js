import React, { Component } from "react";
import { Link } from "react-router-dom";

console.log("hi")

class PredictDisease extends Component {
    state = {
        response: {}
    }
    componentDidMount = () => {
        const symptoms = this.props.location.state
        // console.log(symptoms)
        let body = []
        for(let i = 0; i < symptoms.length; ++i)
            body.push(symptoms[i].value)

        // fetch("http://localhost:5002/predict", {
        //     method: 'POST',
        //     body: {"symptom": body}
        // })
        // .then(res => console.log(res))
        console.log(body)
        const response = {
            "mnb": [
                {
                    "prob": 2.333,
                    "About": "about me",
                    "Self-Care": "take care"
                },
                {
                    "prob": 2.333,
                    "About": "about me",
                    "Self-Care": "take care",
                    "rest": "rest le lo baby"
                }
            ]
        }
        this.setState({response: response}, () => console.log(this.state))
        
    }
    render () {

        return (
            <div>
            <h1>HI there</h1>
            {/* {this.state.response.mnb.map((value, index) => {
                <p></p>
            })} */}
            
            <Link to="/map" className="btn-flat waves-effect">
                Health Centers
            </Link>
            </div>
        )
    }
}

export default PredictDisease
