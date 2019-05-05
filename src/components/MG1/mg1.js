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
const lambda = 0,  m = 0, p = 0, pn = 0, p0 = 0, n = 0;

//Cost and function variables
const l = 0, lq = 0, w = 0, wq = 0;
const cs = 0, cw = 0, ct = 0;
const showResults = false;
const funSelected = '';

class Mg1 extends Component{

   constructor(props) {
        super(props);
        this.state = {lambda, m, p, pn, p0, n, l, lq, w, wq, cs, cw, ct, showResults, funSelected};
        this.lambdaChange = this.lambdaChange.bind(this);
        this.mChange = this.mChange.bind(this);
        this.nChange = this.nChange.bind(this);
        this.kChange = this.kChange.bind(this);
        this.calculateP = this.calculateP.bind(this);
        this.calculatePn = this.calculatePn.bind(this);
        this.calculateP0 = this.calculateP0.bind(this);
        this.calculateL = this.calculateL.bind(this);
        this.calculateLq = this.calculateLq.bind(this);
        this.calculateW = this.calculateW.bind(this);
        this.calculateWq = this.calculateWq.bind(this);
        this.csChange = this.csChange.bind(this);
        this.cwChange = this.cwChange.bind(this);
        this.calculateCt = this.calculateCt.bind(this);

        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClick() {
        this.setState({showResults: true}, () => {
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

    validateForm() {
        return this.state.lambda.length > 0 && this.state.m.length > 0 && this.state.n.length > 0 &&
            this.state.cs.length > 0 && this.state.cw.length > 0;
    }

    //Handle changes in variables
    lambdaChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({lambda : 0});
        }else{
            this.setState({lambda : evt.target.value});
        }
    }

    mChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({m: 0});
        }else{
            this.setState({m: evt.target.value});
        }
    }

    nChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({n: 0});
        }else{
            this.setState({n: evt.target.value});
        }
    }

    kChange(evt){
        if(Number(evt.target.value) < 0){
            this.setState({k : 0});
        }else{
            this.setState({k : evt.target.value});
        }
    }

    csChange(evt){
        if(Number(evt.target.value < 0)){
            this.setState({cs : 0});
        }else{
            this.setState({cs : evt.target.value});
        }
    }

    cwChange(evt){
        if(Number(evt.target.value < 0)){
            this.setState({cw : 0});
        }else{
            this.setState({cw : evt.target.value});
        }
    }

    calculateP(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        let res = lambda/m;
        this.setState({p: res.toFixed(4)});
        return res.toFixed(4);
    }

    calculatePn(){
        const lambda = this.state.lambda;
        const m = this.state.m;
        const n = this.state.n;
        let res = (1-(lambda/m))*(Math.pow(lambda/m,n));
        this.setState({pn: res.toFixed(4)});
    }

    calculateP0(){
        let res = 1-this.calculateP();
        this.setState({p0: res.toFixed(4)});
    }

    calculateL() {
      const lambda = Number(this.state.lambda);
      const m = Number(this.state.m);
      const lq = this.calculateLq();
      const w = this.calculateW();
      let res = 0;
      if (this.state.funSelected === 3) {
          res = lambda * w;
          this.setState({l: res.toFixed(4)});
      } else {
          res = (lambda / m) + lq;
          this.setState({l: res.toFixed(4)});
      }
      return res;
    }

    calculateLq(){
        const func = this.state.funSelected;
        const lambda = Number(this.state.lambda);
        const m = Number(this.state.m);
        const p = this.calculateP();
        let k = Number(this.state.k);
        let variance = 1/Math.pow(lambda,2);
        let res = 0;
        switch(func){
            case 1:
                res = (Math.pow(p,2))/(2 * (1-p));
                this.setState({lq: Number(res).toFixed(4)});
                break;
            case 2:
                res = (Math.pow(lambda, 2) * variance + Math.pow(p,2))/(2*(1-p));
                this.setState({lq: Number(res).toFixed(4)});
                break;
            case 3:
                if(k !== null){
                    res = ((1+k)/(2*k)) * (Math.pow(lambda,2)/(m * (m-lambda)));
                }else{
                    k = 0;
                    res = ((1+k)/(2*k)) * (Math.pow(lambda,2)/(m * (m-lambda)));
                }
                this.setState({lq: Number(res).toFixed(4)});
                break;
            default:
                break;
        }
        return res;
    }

    calculateW(){
        const m = Number(this.state.m);
        const wq = this.calculateWq();
        let res = 0
        res =  wq + (1 / m);
        console.log(res);
        this.setState({w: Number(res).toFixed(4)});
        return res;
    }

    calculateWq(){
        const lambda = Number(this.state.lambda);
        const lq = this.calculateLq();
        let res = 0
        res = lq / lambda;
        this.setState({wq: Number(res).toFixed(4)});
        return res;
    }

    calculateCt(){
        const cs = Number(this.state.cs);
        const cw = Number(this.state.cw);
        const lq = Number(this.state.lq);
        let res = 0
        res = (lq * cw) +  cs;
        this.setState({ct: Number(res).toFixed(4)});
        return res;
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
                <Button variant="contained" color="primary" onClick={this.handleClick} disabled={!this.validateForm()}>Calcular</Button>
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