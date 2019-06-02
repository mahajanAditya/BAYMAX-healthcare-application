import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import { options } from "./options" 
import ControlledTooltips from "./hover"
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

console.log("in dashboard.js")

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  constructor() {
    super();
    this.state = {
      symptoms: [],
      suggested: []
    };
  }

  onChange = (symptoms) => {
    // console.log(symptoms)
    
    this.setState({ symptoms: symptoms }, () => {
      const label = this.state.symptoms[this.state.symptoms.length - 1]
      // console.log(label.value)
      if(label !== undefined) {
      fetch("http://127.0.0.1:5002/similar_symptoms", {
      method: 'POST',
      body: JSON.stringify({'symptom': label.label}),
      }).then(res => res.json())
      .then(data => this.setState({suggested: data.similar_symptoms}))
      .catch(error => console.error('MyError:', error));
      const ans = {"similar_symptoms": [
        {symptom: "fever", description: "i am fever hi threree gfghff hddjdj"},
        {symptom: "pain", description: "i am pain"}
      ]}
      this.setState({suggested: ans.similar_symptoms}, () => {
        for(let i = 0; i < this.state.suggested.length; ++i) {
          console.log(this.state.suggested[i].val)
        }
      })
      }
    })
    
  }

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <h4 style={{marginRight: '100px'}}>
          <b>Hey there,</b> {user.name.split(" ")[0]}
        </h4>
        <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "-5rem",
              marginLeft: '75rem'
            }}
            onClick={this.onLogoutClick}
            className=" btn-large waves-effect waves-light hoverable blue accent-3"
            >
            Logout
          </button> 
        <br />
        <h5 style={{marginLeft: '70px'}}>Enter the symptoms..</h5>
        <div 
          style={{ marginRight: '450px',   
                      marginLeft: '70px',
                      marginTop: '10px',
                }} 
        >
          <Select
            closeMenuOnSelect={false}
            components={makeAnimated()}
            // defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={options}
            onChange={this.onChange}
          />
          </div>
          <div
            style={{
              marginLeft: '1000px',
              marginTop: '-60px'
            }}
          >
            <button
              style={{
                borderRadius: "3px",
                letterSpacing: "1.5px",
              }}
              className=" btn-large waves-effect waves-light hoverable blue accent-3"
            // onClick={this.onPredictDisease}
            > <Link to={{ pathname: '/predictDisease', state: this.state.symptoms }} 
                  style={{color:'white'}}
              >Predict Disease
              </Link>
            </button>
        </div>
        <br style={{lineHeight:'5'}} />
        <div style={{
          marginTop: '-5%',
          marginLeft: '980px',
          // float: 'up',
          // merginRight: '100px'
        }}>
          <h5>Suggested Symptoms</h5>
          {this.state.suggested.map((symptom, index) => (
              <ControlledTooltips name={symptom.symptom} des={symptom.description}/>
          ))}  
        </div>  
        </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
