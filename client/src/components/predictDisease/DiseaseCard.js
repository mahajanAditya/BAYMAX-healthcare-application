import React from 'react';
import { makeStyles} from '@material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const fontSize = 14 // px
const htmlFontSize = 16
const coef = fontSize / 14;

const theme = createMuiTheme({
  typography: {
    pxToRem: size => `${(size / htmlFontSize) * coef}rem`,
  },
});
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    // color: theme.palette.text.secondary,
  },
}));

function ControlledExpansionPanels(props) {
  console.log(props) 
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const features = Object.entries(props.card).map(([key,value]) => 
      (value) && (key != 'prob') && (key != 'disease') && (key != 'rest') && <li>{key}: {value}</li>
  )
  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>Disease: {props.card.disease}</Typography>
            <Typography className={classes.secondaryHeading}>Probability: {props.card.prob}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {features}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </MuiThemeProvider>
    </div>
  );
}

export default ControlledExpansionPanels;
