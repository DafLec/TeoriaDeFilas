import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {Route} from 'react-router-dom';
import Mm1 from './MM1/mm1';
import Mms from './MMS/mms';
import Mmsk from './MMSK/mmsk';
import Mg1 from './MG1/mg1';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class Home extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Modelo M/M/1" />
                        <Tab label="Modelo M/M/S" />
                        <Tab label="Modelo M/M/S/K" />
                        <Tab label="Modelo M/G/1" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer> <Route exact path = "/" component = {Mm1} /></TabContainer>}
                {value === 1 && <TabContainer> <Route exact path = "/" component = {Mms} /></TabContainer>}
                {value === 2 && <TabContainer> <Route exact path = "/" component = {Mmsk} /></TabContainer>}
                {value === 3 && <TabContainer> <Route exact path = "/" component = {Mg1} /></TabContainer>}
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);