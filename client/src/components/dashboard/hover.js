import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import {
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import './style.css'

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
      }
    }
  }
});

class ControlledTooltips extends React.Component {
  state = {
    open: false
  };
  
  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <div style={{marginLeft: '80px', fontSize: '1em'}}>
      <MuiThemeProvider theme={theme}>
      <Tooltip
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        title={this.props.des}
        placement='left'
      >
        <Button>{this.props.name}</Button>
      </Tooltip>
      </MuiThemeProvider>
      <br/>
      </div>
    );
  }
}

export default ControlledTooltips;
