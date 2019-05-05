import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

//User variables
const lambda = 0,  m = 0, p = 0, pn = 0, p0 = 0, n = 0, s = 0;

//Cost and function variables
const l = 0, lq = 0, w = 0, wq = 0;
const cs = 0, cw = 0, ct = 0;
var showResults = false;

class Mg1 extends Component{

   constructor(props) {
        super(props);
        this.state = {lambda, m, p, pn, p0, n, s, l, lq, w, wq, cs, cw, ct, showResults, funSelected: ''};
        this.lambdaChange = this.lambdaChange.bind(this);
        this.mChange = this.mChange.bind(this);
        this.nChange = this.nChange.bind(this);
        this.kChange = this.kChange.bind(this);
        /*this.calculateP = this.calculateP.bind(this);
        this.calculatePn = this.calculatePn.bind(this);
        this.calculateP0 = this.calculateP0.bind(this);

        this.calculateL = this.calculateL.bind(this);
        this.calculateLq = this.calculateLq.bind(this);
        this.calculateW = this.calculateW.bind(this);
        this.calculateWq = this.calculateWq.bind(this);*/
        this.csChange = this.csChange.bind(this);
        this.cwChange = this.cwChange.bind(this);
        this.calculateCt = this.calculateCt.bind(this);
        this.getFunction = this.getFunction.bind(this);

        this.handleClick = this.handleClick.bind(this);
    }

    //Functions for handle changes in select
    getFunction(){
       if(this.state.funSelected === 1){
           let lambda = this.state.lambda;
           let m = this.state.m;
           let lq = Math.pow((lambda/m),2)/(2*(1-(lambda/m)));
           let l = (lambda/m) + lq;
           let wq = lq/lambda;
           let w = wq + (1/m);
           let p0 = 1-(lambda/m);
           this.setState({l: l.toFixed(4), lq: lq.toFixed(4), w: w.toFixed(4),
           wq: wq.toFixed(4), p0: p0.toFixed(4)});
       }else if(this.state.funSelected === 2){
           let lambda = this.state.lambda;
           let m = this.state.m;
           let sigma = 1/Math.pow(lambda,2);
           let lq = (Math.pow(lambda, 2) * sigma + Math.pow((lambda/m),2))/(2*(1-(lambda/m)));
           let l = lq + (lambda/m);
           let wq = lq/lambda;
           let w = wq + (1/m);
           let p0 = 1 - (lambda/m);
           this.setState({l: l.toFixed(4), lq: lq.toFixed(4), w: w.toFixed(4),
               wq: wq.toFixed(4), p0: p0.toFixed(4)});
       }else if(this.state.funSelected === 3) {
           let lambda = this.state.lambda;
           let m = this.state.m;
           let k = parseInt(this.state.k);
           let lq = 0;
           if(k !== null){
           lq = ((1+k)/(2*k)) * (Math.pow(lambda,2)/(m(m-lambda)));}
           let wq = lq/lambda;
           let w = wq + (1/m);
           let l = w * lambda;
           let p0 = 1 - (lambda/m);
           this.setState({l: l.toFixed(4), lq: lq.toFixed(4), w: w.toFixed(4),
               wq: wq.toFixed(4), p0: p0.toFixed(4)});

       }else{
           console.log("ERROR")
       }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClick() {
        this.setState({showResults: true}, () => {
            this.getFunction()
        });
    }



    //Handle changes in variables
    lambdaChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({lambda : 0}, () => {
                this.getFunction();
            });
        }else{
            this.setState({lambda : evt.target.value}, () => {
                this.getFunction();
            });
        }
    }

    mChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({m: 0}, () => {
                this.getFunction();
            });
        }else{
            this.setState({m: evt.target.value}, () => {
                this.getFunction();
            });
        }
    }

    nChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({n: 0}, () => {
                this.getFunction();
            });
        }else{
            this.setState({n: evt.target.value}, () => {
                this.getFunction();
            });
        }
    }

    kChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({k : 0}, () => {
                this.getFunction();
            });
        }else{
            this.setState({k : evt.target.value}, () => {
                this.getFunction();
            });
        }
    }

    csChange(evt){
        if(Number(evt.target.value < 0)){
            this.setState({cs : 0}, () => {
                this.calculateCt();
            });
        }else{
            this.setState({cs : evt.target.value}, () => {
                this.calculateCt();
            });
        }
    }

    cwChange(evt){
        if(Number(evt.target.value < 0)){
            this.setState({cw : 0}, () => {
                this.calculateCt();
            });
        }else{
            this.setState({cw : evt.target.value}, () => {
                this.calculateCt();
            });
        }
    }

    calculateCt(){
        const s = this.state.s;
        const cs = this.state.cs;
        const cw = this.state.cw;
        const lq = this.state.lq;
        let res = (lq * cw) + (s * cs);
        this.setState({ct: res.toFixed(4)});
    }

    render() {

        return (<React.Fragment>
            <Typography variant="h3" gutterBottom>
                M/M/G/1
            </Typography>

            <form id="form">
                <FormControl>
                    <Select
                        value={this.state.funSelected}
                        onChange={this.handleChange}
                        name="funSelected"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Selecciona la función
                        </MenuItem>
                        <MenuItem value={1}>Estándar</MenuItem>
                        <MenuItem value={2}>Exponencial</MenuItem>
                        <MenuItem value={3}>Erlang</MenuItem>
                    </Select>
                    <FormHelperText>Función</FormHelperText>
                </FormControl>
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="lambda"
                                   label="lambda"
                                   type="number"
                                   onChange={this.lambdaChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="m"
                                   label="m"
                                   type="number"
                                   onChange={this.mChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="k"
                                   label="k"
                                   type="number"
                                   onChange={this.kChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="n"
                                   label="n"
                                   type="number"
                                   onChange={this.nChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="cs"
                                   label="cs"
                                   type="number"
                                   onChange={this.csChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="cw"
                                   label="cw"
                                   type="number"
                                   onChange={this.cwChange}/>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={this.handleClick}>Calcular</Button>
            </form>
            { this.state.showResults ?
                Number(this.state.lambda) >= Number(this.state.m) ?
                    <div className="alert alert-danger" role="alert">
                        Sistema no estable
                    </div> :
                    <div>
                        <Typography variant="h4" gutterBottom>
                            Resultados
                        </Typography>
                        <ul className="list-group">
                            <li className="list-group-item">Factor de Utilización (Ρ): <strong>{ this.state.p }</strong></li>
                            <li className="list-group-item">Probabilidad 0 Clientes en la Sistema (P0): <strong>{ this.state.p0 }</strong></li>
                            <li className="list-group-item">Promedio Clientes en la Cola (LQ): <strong>{ this.state.lq }</strong></li>
                            <li className="list-group-item">Promedio Clientes en el Sistema (L): <strong>{ this.state.l }</strong></li>
                            <li className="list-group-item">Tiempo Esperado en la Cola (WQ): <strong>{ this.state.wq }</strong></li>
                            <li className="list-group-item">Tiempo Esperado en el Sistema (W): <strong>{ this.state.w }</strong></li>
                            <li className="list-group-item">Probabilidad (Pn): <strong>{ this.state.pn }</strong></li>
                            <li className="list-group-item">Costo Total Esperado (CT): <strong>{ this.state.ct }</strong></li>
                        </ul>
                    </div>
                :
                <div></div>
            }
        </React.Fragment>);
    }
}
export default Mg1;