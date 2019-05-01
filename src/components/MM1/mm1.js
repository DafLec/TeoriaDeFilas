import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    paper:{
        margin: theme.spacing.unit,
        padding: 50
    }
});

class Mm1 extends Component{

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>

                    <Typography variant="h3" gutterBottom>
                        Valida tu tequila
                    </Typography>

                    <form id="myform">
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6}>
                                <TextField margin="normal" onChange={this.handleChange}  value={this.state.serial} id="serial"
                                           label="Número de serie" fullWidth/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField  margin="normal" onChange={this.handleChange}  value={this.state.user}
                                            id="user" label="Usuario" fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField  margin="normal" onChange={this.handleChange}  value={this.state.pwd}
                                            id="password" label="Contraseña" fullWidth type="password"
                                />
                            </Grid>
                        </Grid><br/>
                        <Button onClick={this.showTequila.bind(this)} variant="contained" component="span" className={classes.button}
                                type="submit" disabled={!this.validateForm()}>
                            Validar
                        </Button>
                    </form>
                </Paper>
            </React.Fragment>
        );
    }
}
Mm1.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mm1);