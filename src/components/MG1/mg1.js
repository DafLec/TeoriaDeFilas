import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Mg1 extends Component{
    render() {
        return (<React.Fragment>
            <Typography variant="h3" gutterBottom>
                M/M/G/1
            </Typography>

            <form id="form">
                <Grid container spacing={18}>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="lambda"
                                   label="lambda"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="mu"
                                   label="mu"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="s"
                                   label="s"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="k"
                                   label="k"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="pn"
                                   label="pn"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="p0"
                                   label="p0"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="n"
                                   label="n"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="cs"
                                   label="cs"/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="cw"
                                   label="cw"/>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary">Aceptar</Button>
            </form>
        </React.Fragment>);
    }
}
export default Mg1;