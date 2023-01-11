import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Card,
 CardHeader,
 CardContent,
 Typography,
 TextField,
 Autocomplete,
 Button,
} from "@mui/material";
import theme from "../../theme";

const GRAPHURL = "/graphql";

const AddComponent = (props) => {
    
 const initialState = {
 msg: "",
 contactServer: false,
 };
 const sendParentData = (msg) => {
    props.dataFromChild(msg);
  };
 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 useEffect(() => {
 fetchUsers();
 }, []);
 const fetchUsers = async () => {
 try {
 setState({
snackBarMsg: "Loading alerts...",
 contactServer: true,
 });
 let response = await fetch(GRAPHURL, {
 method: "POST",
 headers: {
 "Content-Type": "application/json; charset=utf-8",
 },
 body: JSON.stringify({ query: "query {alerts{country,name,text, date, region, subregion}}" }),
 });
 let payload = await response.json();
 setState({
 snackBarMsg: `found ${payload.data.alerts.length} alerts`,
 contactServer: true,
 alerts:payload.data.alerts,
 names: payload.data.alerts.map((a) => a.name),
 });
 sendParentData( `found ${payload.data.alerts.length} alerts`);
 } catch (error) {
 console.log(error);
 setState({
 msg: `Problem loading server data - ${error.message}`,
 });
 }
 };
 
 const [selection, setSelection] = useState();
 const [travlername, setTravelerName] = useState("");
 const onChange = (e, selectedOption) => {
    for(let i=0; i<state.alerts.length;i++){
    if(selectedOption=== state.alerts[i].name){
    selectedOption
    ? setSelection(state.alerts[i])
    : setSelection();
    }
}
    };
    const onAddClicked = async () => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        try {
        let query = JSON.stringify({
        query: `mutation {addalert(name: "${travlername}",country: "${selection.name}", text: "${selection.text}", date: "${selection.date.toString()}" ){ name, country, text, date }}`,
        });
        console.log(query);
        let response = await fetch(GRAPHURL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json; charset=utf-8",
        },
        body: query,
        });
        let json = await response.json();
 setState({
 showMsg: true,
 snackbarMsg: `added advisory on ${selection.date.toString()}`,
 });
 sendParentData(`added advisory on ${selection.date.toString()}`);
 } catch (error) {
 setState({
 snackbarMsg: `${error.message} - alert not added`,
 showMsg: true,
 });
 sendParentData(state.snackBarMsg);
 }
 };
 const emptyorundefined =
 selection === undefined ||
 travlername === undefined ||
 travlername === "";
 return (
 <ThemeProvider theme={theme}>
 <Card style={{ marginTop: "10vh" }}> 
 <CardHeader
 title="World Wide Travel Alerts"
 style={{ color: theme.palette.primary.main, textAlign: "center" }}
 />
<Typography
 style={{ color: theme.palette.primary.dark, textAlign: "center" }}
 >
Add Advisory
 </Typography>
<TextField style={{margin: 10}}
placeholder="Travelers Name"
onChange={(v) => setTravelerName(v.target.value) }></TextField>
<Autocomplete
 data-testid="autocomplete"
 options={state.names}
 getOptionLabel={(option) => option}
 style={{ width: 300 }}
 onChange={onChange}
 renderInput={(params) => (
 <TextField style={{margin: 10}}
 {...params}
 label="available countries"
 variant="outlined"
 fullWidth
 />
 )}
 />
 <p />
 <Button 
 variant="outlined" 
 onClick={onAddClicked}
 disabled={emptyorundefined}
 style={{marginLeft: 250}}
 >Add Advisory</Button>
 <CardContent>
 <div>
 <Typography color="error">{state.msg}</Typography>
 </div>
 </CardContent>
 </Card>
 </ThemeProvider>
 );
};
export default AddComponent;