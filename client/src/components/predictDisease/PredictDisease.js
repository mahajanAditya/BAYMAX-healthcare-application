import React, { Component } from "react";
import { Link } from "react-router-dom";
import ControlledExpansionPanels from './DiseaseCard';
console.log("hi")
var items;
const res = {
        "mnb": [
            {
                "prob": 2.333,
                "About": "about me",
                "Self-Care": "take care",
                "Disease": "Dis1"
            },
            {
                "prob": 20.333,
                "About": "about me",
                "Self-Care": "take care",
                "rest": "rest le lo baby",
                "Disease": "Dis2"
            }
        ]
    }
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

        fetch("http://localhost:5001/predict", {
            method: 'POST',
            body: JSON.stringify({"symptom": body})
        })
        .then(res => res.json())
        .then(data => this.setState({response: data}, () => {
            items = Object.keys(this.state.response.mnb).map(index => 
                <ControlledExpansionPanels card={this.state.response.mnb[index]} />
            );
        })
        )
        .catch(error => console.error('MyError:', error));
        // console.log(body)
        // const res = {
        //     "mnb": [
        //         {
        //             "prob": 2.333,
        //             "About": "about me",
        //             "Self-Care": "take care"
        //         },
        //         {
        //             "prob": 20.333,
        //             "About": "about me",
        //             "Self-Care": "take care",
        //             "rest": "rest le lo baby"
        //         }
        //     ]
        // }
        // this.setState({response: response})
        
        
    }
    render () {
        console.log(this.state.response)
        
        // const items = this.state.response.mnb.map(link => <li key={link.prob}>{link.prob}</li>)
        return (
            <div>
            {items}
            <Link to="/map" className="btn-flat waves-effect">
                Health Centers
            </Link>
            </div>
        )
    }
}

export default PredictDisease
