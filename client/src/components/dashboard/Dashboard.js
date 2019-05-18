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

  handleSubmit = evt => {
    const { symptoms } = this.state;
    alert(`Incorporated: ${symptoms.length} symptoms`);
  };

  onChange = (symptoms) => {
    // console.log(symptoms)
    
    this.setState({ symptoms: symptoms }, () => {
      const label = this.state.symptoms[this.state.symptoms.length - 1]
      console.log(label.value)
      // fetch("http://127.0.0.1:5002/similar_symptoms", {
      // method: 'POST',
      // body: {'symptom': label.label},
      // }).then(res => console.log(res))

      const ans = {"similar_symptoms": [
        {val: "fever", des: "i am fever"},
        {val: "pain", des: "i am pain"}
      ]}
      this.setState({suggested: ans.similar_symptoms}, () => {
        for(let i = 0; i < this.state.suggested.length; ++i) {
          console.log(this.state.suggested[i].val)
        }
      })
    })
  }

  // onPredictDisease = e => {
  //   e.preventDefault()
  //   fetch
  // }

  render() {
    const { user } = this.props.auth;
    // const { res }
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
      <form onSubmit={this.handleSubmit}>
        <h4>
          <b>Hey there,</b> {user.name.split(" ")[0]}
        </h4>
        <Select
          closeMenuOnSelect={false}
          components={makeAnimated()}
          // defaultValue={[colourOptions[4], colourOptions[5]]}
          isMulti
          options={options}
          onChange={this.onChange}
        />
        <br />
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          // onClick={this.onPredictDisease}
        ><Link to={{ pathname: '/predictDisease', state: this.state.symptoms }}>Predict Disease</Link>
        </button><br/><br />
        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem"
          }}
          onClick={this.onLogoutClick}
          className=" btn-large waves-effect waves-light hoverable blue accent-3"
          >
          Logout
        </button>  
 
        </form>
        <div styles={{
          marginTop: "100px"
        }}>
          <h5>Suggested Symptoms</h5>
          {this.state.suggested.map((symptom, index) => (
              <ControlledTooltips name={symptom.val} des={symptom.des}/>
          ))}  
          
        </div>
        </div> 
    );
  }
  // openMap() {
  //   let path = `/map`
  //   fetch(path).then(console.log("hi"))
  // };

  // render() {
  //   const { user } = this.props.auth;

  //   return (
  //     <div style={{ height: "75vh" }} className="container valign-wrapper">
  //       <div className="row">
  //         <div className="landing-copy col s12 center-align">
  //           <h4>
  //             <b>Hey there,</b> {user.name.split(" ")[0]}
  //             <p className="flow-text grey-text text-darken-1">
  //               You have entered the world of BAYMAX{" "}
  //                👏
  //             </p>
  //           </h4>
  //           <button
  //             style={{
  //               width: "150px",
  //               borderRadius: "3px",
  //               letterSpacing: "1.5px",
  //               marginTop: "1rem"
  //             }}
  //             onClick={this.onLogoutClick}
  //             className=" btn-large waves-effect waves-light hoverable blue accent-3"
  //           >
  //             Logout
  //           </button>
  //           <br /><br />
  //           <Link to="/map" className="btn-flat waves-effect">
  //             Health Centers
  //           </Link>
              
  //         </div>
  //       </div>
  //     </div>
  //     // <Route path="/" exact component={Index} />
  //   );
  // }
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
