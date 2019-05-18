import React, { Component } from "react";
import { Link } from "react-router-dom";

console.log("hi")

class PredictDisease extends Component {
    state = {
        response: {}
    }
    componentWillMount = () => {
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
        // console.log(body)
        const response = {
            "mnb": [
                {
                    "prob": 2.333,
                    "About": "about me",
                    "Self-Care": "take care"
                },
                {
                    "prob": 20.333,
                    "About": "about me",
                    "Self-Care": "take care",
                    "rest": "rest le lo baby"
                }
            ]
        }
        this.setState({response: response})
        
    }
    render () {
        console.log(this.state.response)
        const items = Object.keys(this.state.response.mnb).map(index => 
            Object.entries(this.state.response.mnb[index]).map(([key,value]) => 
                <p>{key} : {value.toString()}</p>
            )
            // console.log(key)
        );
        // const items = this.state.response.mnb.map(link => <li key={link.prob}>{link.prob}</li>)
        return (
            <div>
            <h1>HI there</h1>
            {items}
            {/* {items} */}
            {/* {console.log(this.state.response.mnb)} */}
            <Link to="/map" className="btn-flat waves-effect">
                Health Centers
            </Link>
            </div>
        )
    }
}

export default PredictDisease
