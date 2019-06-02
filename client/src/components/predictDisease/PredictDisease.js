import React, { Component } from "react";
import { Link } from "react-router-dom";
import ControlledExpansionPanels from './DiseaseCard';

var items=<p>hi</p>
// const res = {
//         "mnb": [
//             {
//                 "prob": 2.333,
//                 "About": "about me",
//                 "Self-Care": "take care",
//                 "disease": "Dis1"
//             },
//             {
//                 "prob": 20.333,
//                 "About": "about me",
//                 "Self-Care": "take care",
//                 "rest": "rest le lo baby",
//                 "disease": "Dis2"
//             }
//         ]
//     }
class PredictDisease extends Component {
    state = {
        done: false,
        response: {}
    }
    componentWillMount = () => {
        const symptoms = this.props.location.state
        // console.log(symptoms)
        let body = []
        for(let i = 0; i < symptoms.length; ++i)
            body.push(symptoms[i].value)
        console.log("about to fetch")
        fetch("http://localhost:5001/predict", {
            method: 'POST',
            body: JSON.stringify({"symptom": body})
        })
        .then(res => res.json())
        .then(data => this.setState({done: true, response: data})
        )
        .catch(error => console.error('MyError:', error));
        console.log("already fetched")
        console.log(this.state.response)
    }
    render () {
        if(this.state.done) {
            items = Object.keys(this.state.response.mnb).map(index => 
                <ControlledExpansionPanels card={this.state.response.mnb[index]} />
            );
            return (
                <div>
                    <br style={{lineHeight: '5'}} />
                    {items}
                    {/* <ControlledExpansionPanels card={res.mnb[0]} /> */}
                    {/* <ControlledExpansionPanels card={res.mnb[1]} /> */}
                    <br style={{lineHeight: '5'}} />
                    <div
                        style={{
                            marginLeft: '40%'
                        }}
                    >   
                        <h5>Locate nearby health centers</h5><br />
                        <button
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginLeft: '3em'
                            }}
                            className=" btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            <Link to="/map" style={{color:'white'}}>
                                Health Centers
                            </Link>
                        </button>
                    </div>
                </div>
            )
        }
        else return(<p>Loading..</p>)
    }
}

export default PredictDisease
