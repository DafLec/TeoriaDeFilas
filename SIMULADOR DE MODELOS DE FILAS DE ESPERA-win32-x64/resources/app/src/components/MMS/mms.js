import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//User variables
const lambda = 0,  m = 0, p = 0, pn = 0, p0 = 0, n = 0, s = 0;

//Cost and function variables
const l = 0, lq = 0, w = 0, wq = 0;
const cs = 0, cw = 0, ct = 0;
const showResults = false;

class Mms extends Component{

    constructor(props){
        super(props);
        this.state = {lambda, m, p, pn, p0, n, s, l, lq, w, wq, cs, cw, ct, showResults};
        this.lambdaChange = this.lambdaChange.bind(this);
        this.mChange = this.mChange.bind(this);
        this.calculateP = this.calculateP.bind(this);
        this.calculatePn = this.calculatePn.bind(this);
        this.calculateP0 = this.calculateP0.bind(this);
        this.nChange = this.nChange.bind(this);
        this.sChange = this.sChange.bind(this);
        this.calculateL = this.calculateL.bind(this);
        this.calculateLq = this.calculateLq.bind(this);
        this.calculateW = this.calculateW.bind(this);
        this.calculateWq = this.calculateWq.bind(this);
        this.csChange = this.csChange.bind(this);
        this.cwChange = this.cwChange.bind(this);
        this.calculateCt = this.calculateCt.bind(this);

        this.handleClick = this.handleClick.bind(this);
    }

    validateForm() {
        return this.state.lambda.length > 0 && this.state.m.length > 0 && this.state.s.length > 0;
    }

    invalidData() {
        return (Number(this.state.lambda) <= 0 ||
            Number(this.state.lambda) >= Number(this.state.m) ||
            Number(this.state.s) <= 0 ||
            Number(this.state.s)%1 !== 0 ||
            Number(this.state.n) < 0 ||
            Number(this.state.n)%1 !==0);
    }

    //Handle changes in variables
    lambdaChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({lambda : 0}, () => {
                this.calculateP();
                this.calculatePn();
                this.calculateP0();
                this.calculateL();
                this.calculateLq();
                this.calculateW();
                this.calculateWq();
                this.calculateCt();
            });
        }else{
            this.setState({lambda : evt.target.value}, () => {
                this.calculateP();
                this.calculatePn();
                this.calculateP0();
                this.calculateL();
                this.calculateLq();
                this.calculateW();
                this.calculateWq();
                this.calculateCt();
            });
        }
    }

    mChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({m: 0}, () => {
                this.calculateP();
                this.calculatePn();
                this.calculateP0();
                this.calculateL();
                this.calculateLq();
                this.calculateW();
                this.calculateWq();
                this.calculateCt();
            });
        }else{
            this.setState({m: evt.target.value}, () => {
                this.calculateP();
                this.calculatePn();
                this.calculateP0();
                this.calculateL();
                this.calculateLq();
                this.calculateW();
                this.calculateWq();
                this.calculateCt();
            });
        }
    }

    nChange(evt){
        if(Number(evt.target.value < 0)){
            this.setState({n: 0}, () => {
                this.calculatePn();
            });
        }else{
            this.setState({n: evt.target.value}, () => {
                this.calculatePn();
            });
        }
    }

    sChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({s: 0}, () => {
                this.calculateP();
                this.calculatePn();
                this.calculateP0();
                this.calculateL();
                this.calculateLq();
                this.calculateW();
                this.calculateWq();
                this.calculateCt();
            });
        }else{
            this.setState({s: evt.target.value}, () => {
                this.calculateP();
                this.calculatePn();
                this.calculateP0();
                this.calculateL();
                this.calculateLq();
                this.calculateW();
                this.calculateWq();
                this.calculateCt();
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

    //Calculate required functions
    calculateP(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const s = this.state.s;
        let res = lambda/(m*s);
        this.setState({p: res.toFixed(4)});
    }

    static factorial(num){
        let fac = 1;
        while(num > 0){
            fac *= num;
            num = num-1;
        }
        return fac
    }

    calculatePn(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const s = this.state.s;
        const n = this.state.n;
        const p0 = this.calculateP0();
        let res;
        if(n <= s){
            res = (Math.pow(lambda/m,n)/ Mms.factorial(n)) * p0;
        }else{
            res = (Math.pow(lambda/m,n)/(Mms.factorial(s) * Math.pow(s,n-s))) * p0;
        }
        this.setState({pn: res.toFixed(4)});
    }

    calculateP0(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const s = this.state.s;
        let sum = 0;
        let mult = 0;
        for(let i = 0; i < s; i++){
            sum += (Math.pow(lambda/m,i)/ Mms.factorial(i));
        }
        let factor1 = (Math.pow(lambda/m,s)/ Mms.factorial(s));
        let factor2 = 1 / (1 - (lambda / (s*m)));
        mult = factor1 * factor2;
        let p0 = 1/(sum+mult);
        this.setState({p0: p0.toFixed(4)});
        return p0;
    }

    calculateL(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const lq = this.calculateLq();
        let res = lq + (lambda/m);
        this.setState({l: res.toFixed(4)});
    }

    calculateLq(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const s = this.state.s;
        const p0 = this.calculateP0();
        let numerator = Math.pow(lambda/m,s) * lambda * p0;
        let denominator = Mms.factorial(s) * s * m * Math.pow((1 - (lambda / (s*m))),2);
        let res = numerator/denominator;
        this.setState({lq: res.toFixed(4)});
        return res;
    }

    calculateW(){
        const m = this.state.m;
        const wq = this.calculateWq();
        let res = wq + (1/m);
        this.setState({w: res.toFixed(4)})
    }

    calculateWq(){
        const lambda = this.state.lambda;
        const lq = this.calculateLq();
        let res = lq/lambda;
        this.setState({wq: res.toFixed(4)});
        return res;
    }

    calculateCt(){
        const lq = this.calculateLq();
        const cs = this.state.cs;
        const cw = this.state.cw;
        const s = this.state.s;
        let res = (Number(lq) * Number(cw)) + (Number(s) * Number(cs));
        this.setState({ct: res.toFixed(4)});

    }

    handleClick() {
        this.setState({showResults: true});
    }

    render() {
        return (<React.Fragment>
            <Typography variant="h3" gutterBottom>
                M/M/S
            </Typography>

            <form id="form">
                <Grid container spacing={16}>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="lambda"
                                   label="lambda"
                                   type="number"
                                   inputProps={{ min: "1"}}
                                   onChange={this.lambdaChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="m"
                                   label="m"
                                   type="number"
                                   inputProps={{ min: "1"}}
                                   onChange={this.mChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="s"
                                   label="s"
                                   type="number"
                                   inputProps={{ min: "1"}}
                                   onChange={this.sChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="n"
                                   label="n"
                                   type="number"
                                   inputProps={{ min: "1"}}
                                   onChange={this.nChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="cs"
                                   label="cs"
                                   type="number"
                                   inputProps={{ min: "1"}}
                                   onChange={this.csChange}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField margin="normal"
                                   id="cw"
                                   label="cw"
                                   type="number"
                                   inputProps={{ min: "1"}}
                                   onChange={this.cwChange}/>
                    </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={this.handleClick} disabled={!this.validateForm()}>Calcular</Button>
            </form>
            <br/>
            { this.state.showResults ?
                this.invalidData() ?
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
export default Mms;