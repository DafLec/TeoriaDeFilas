import React, { Component } from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//User variables
const lambda = 0,  m = 0, p = 0, pn = 0, p0 = 0, n = 0, s = 0, k = 0;

//Cost and function variables
const l = 0, lq = 0, w = 0, wq = 0;
const cs = 0, cw = 0, ct = 0;
const showResults = false;

class Mmsk extends Component{

    constructor(props){
        super(props);
        this.state = {lambda, m, p, pn, p0, n, s, k, l, lq, w, wq, cs, cw, ct, showResults};
        this.lambdaChange = this.lambdaChange.bind(this);
        this.mChange = this.mChange.bind(this);
        this.calculateP = this.calculateP.bind(this);
        this.calculatePn = this.calculatePn.bind(this);
        this.calculateP0 = this.calculateP0.bind(this);
        this.calculatePk = this.calculatePk.bind(this);
        this.nChange = this.nChange.bind(this);
        this.sChange = this.sChange.bind(this);
        this.kChange = this.kChange.bind(this);
        this.calculateL = this.calculateL.bind(this);
        this.calculateLq = this.calculateLq.bind(this);
        this.calculateW = this.calculateW.bind(this);
        this.calculateWq = this.calculateWq.bind(this);
        this.csChange = this.csChange.bind(this);
        this.cwChange = this.cwChange.bind(this);
        this.calculateCt = this.calculateCt.bind(this);
        this.effectiveLambda = this.effectiveLambda.bind(this);

        this.handleClick = this.handleClick.bind(this);
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

    kChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({k : 0}, () => {
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
            this.setState({k : evt.target.value}, () => {
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
        return res;
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
        const k = this.state.k;
        const p0 = this.calculateP0();
        let res;
        if(n <= s){
            res = (Math.pow(lambda/m,n)/ Mmsk.factorial(n)) * p0;
        }else if(n > s && n <= k){
            res = (Math.pow(lambda/m,n)/(Mmsk.factorial(s) * Math.pow(s,n-s))) * p0;
        }else{
            res = 0;
        }
        this.setState({pn: res.toFixed(4)});
    }

    calculateP0(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const s = this.state.s;
        const k = this.state.k;
        let sum = 0, mult = 0, factor2 = 0;
        for(let i = 0; i < s; i++){
            sum += (Math.pow(lambda/m,i)/ Mmsk.factorial(i));
        }
        let factor1 = (Math.pow(lambda/m,s)/ Mmsk.factorial(s));
        for(let j = parseInt(s)+1; j <= k; j++){
            factor2 += (Math.pow(lambda/(s*m),j-s));
        }
        mult = factor1 * factor2;
        let p0 = 1/(sum+mult);
        this.setState({p0: p0.toFixed(4)});
        return p0;
    }

    calculatePk(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const s = this.state.s;
        const k = this.state.k;
        const p0 = this.calculateP0();
        let res;
        if(k < s){
            res = (Math.pow(lambda/m,k)/Mmsk.factorial(k)) * p0;
        }else{
            res = (Math.pow(lambda/m,k)/(Mmsk.factorial(s) * Math.pow(s,k-s))) * p0;
        }
        return res;
    }

    effectiveLambda(){
        const lambda = this.state.lambda;
        const pk = this.calculatePk();
        return lambda * (1-pk);
    }

    calculateL(){
        const w = this.calculateW();
        const eLambda = this.effectiveLambda();
        let res = w * eLambda;
        this.setState({l: res.toFixed(4)});
    }

    calculateLq(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const s = this.state.s;
        const k = this.state.k;
        const p = this.calculateP();
        const p0 = this.calculateP0();
        let numerator = Math.pow(lambda/m,s) * lambda * m * p0;
        let denominator = Mmsk.factorial(s-1) * Math.pow(s * (m-lambda),2);
        let mult = 1 - Math.pow(p, k-s) - ((k-s) * Math.pow(p,k-s) * (1-p));
        let res = (numerator/denominator) * mult;
        this.setState({lq: res.toFixed(4)});
        return res;
    }

    calculateW(){
        const m = this.state.m;
        const wq = this.calculateWq();
        let res = wq + (1/m);
        this.setState({w: res.toFixed(4)});
        return res;
    }

    calculateWq(){
        const lq = this.calculateLq();
        const eLambda = this.effectiveLambda();
        let res = lq/eLambda;
        this.setState({wq: res.toFixed(4)});
        return res;
    }

    calculateCt(){
        const s = this.state.s;
        const cs = this.state.cs;
        const cw = this.state.cw;
        const lq = this.calculateLq();
        let res = (lq * cw) + (s * cs);
        this.setState({ct: res.toFixed(4)});
    }

    handleClick() {
        this.setState({showResults: true});
    }

    render() {
        return (<React.Fragment>
            <Typography variant="h3" gutterBottom>
                M/M/S/K
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
                                   id="k"
                                   label="k"
                                   type="number"
                                   inputProps={{ min: "1"}}
                                   onChange={this.kChange}/>
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
export default Mmsk;