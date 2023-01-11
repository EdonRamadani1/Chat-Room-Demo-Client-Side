import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Card,
 CardHeader,
 CardContent,
 Typography,
 TextField,
 Autocomplete,
 Radio,
 Table,
 TableContainer,
 TableRow,
 TableCell,
 TableBody,
 TableHead,
 RadioGroup,
 FormControl,
 FormControlLabel,
 FormLabel,
} from "@mui/material";
import theme from "../../theme";

const GRAPHURL = "/graphql";

const ListComponent = (props) => {
    
 const initialState = {
 msg: "",
 contactServer: false,
 alerts: [],
 options:[],
 region:false,
subregion:false,
travelername:false,
 };
 const sendParentData = (msg) => {
    props.dataFromChild(msg);
  };
 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 useEffect(() => {
    TravelerButton();
 }, []);

 const [selectedName, setNameSelection] = useState("");
 const [selectedRegion, setRegionSelection] = useState("");
 const [selectedSubRegion, setSubRegionSelection] = useState("");
 const getAdvisories = async () => {

 try 
 {
 setState({
snackBarMsg: "Loading alerts...",
 contactServer: true,
 });
 let response = await fetch(GRAPHURL, {
 method: "POST",
 headers: {
 "Content-Type": "application/json; charset=utf-8",
 },
 body: JSON.stringify({ query: `query {advisorytraveler(name:"${selectedName}"){name,country,text, date}}` }),
 });
 let payload = await response.json();
 state.alerts=payload.data.advisorytraveler;
 setState({
 snackBarMsg: `found ${payload.data.advisorytraveler.length} advisories`,
 contactServer: true,
 alerts: payload.data.advisorytraveler,
 names: payload.data.advisorytraveler.map((a) => a.name),
 });
 sendParentData( `found ${payload.data.advisorytraveler.length} advisories`);
 } catch (error) {
 console.log(error);
 setState({
 msg: `Problem loading server data - ${error.message}`,
 });
 }
 };

 const getRegion = async () => {
    try 
    {
    setState({
   snackBarMsg: "Loading alerts...",
    contactServer: true,
    });
    let response = await fetch(GRAPHURL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({ query: `query {alertbyregion(region:"${selectedRegion}"){country,name,text, date, region, subregion}}` }),
    });
    let payload = await response.json();
    state.alerts=payload.data.alertbyregion;
    setState({
    snackBarMsg: `found ${payload.data.alertbyregion.length} alerts`,
    contactServer: true,
    alerts:payload.data.alertbyregion,
    names: payload.data.alertbyregion.map((a) => a.name),
    });
    sendParentData( `found ${payload.data.alertbyregion.length} alerts`);
    } catch (error) {
    console.log(error);
    setState({
    msg: `Problem loading server data - ${error.message}`,
    });
    }
    };


const getSubregion = async () => {
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
    body: JSON.stringify({ query: `query {alertbysubregion(subregion:"${selectedSubRegion}"){country,name,text, date, region, subregion}}` }),
    });
    let payload = await response.json();
    state.alerts=payload.data.alertbysubregion;
    setState({
    snackBarMsg: `found ${payload.data.alertbysubregion.length} alerts`,
    contactServer: true,
    alerts:payload.data.alertbysubregion,
    names: payload.data.alertbysubregion.map((a) => a.name),
    });
    sendParentData( `found ${payload.data.alertbysubregion.length} alerts`);
    } catch (error) {
    console.log(error);
    setState({
    msg: `Problem loading server data - ${error.message}`,
    });
    }
    };


const TravelerButton = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  try {
  let query = JSON.stringify({
  query: `query {advisorytraveler{name,country,text,date}}`,
  });
  console.log(query);
  let response = await fetch(GRAPHURL, {
  method: "POST",
  headers: {
  "Content-Type": "application/json; charset=utf-8",
  },
  body: query,
  });
  let payload = await response.json();
  state.options = [...new Set(payload.data.advisories.map((item) => item.name))];
  state.region=false;
  state.subregion=false;
  state.travelername=true;
  setState({
showMsg: true,
});
} catch (error) {
setState({
snackbarMsg: `${error.message} - alert not added`,
showMsg: true,
});
}
};

const RegionButton = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  try {
  let query = JSON.stringify({
  query: `query {alerts{country,name,text, date, region, subregion}}`,
  });
  console.log(query);
  let response = await fetch(GRAPHURL, {
  method: "POST",
  headers: {
  "Content-Type": "application/json; charset=utf-8",
  },
  body: query,
  });
  let payload = await response.json();
  state.options = [...new Set(payload.data.alerts.map((item) => item.region))];
  state.region=true;
  state.subregion=false;
  state.travlername=false;
setState({
showMsg: true,
});
} catch (error) {
setState({
snackbarMsg: `${error.message} - alert not added`,
showMsg: true,
});
}
};

const SubRegionButton = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  try {
  let query = JSON.stringify({
  query: `query {alerts{country,name,text, date, region, subregion}}`,
  });
  console.log(query);
  let response = await fetch(GRAPHURL, {
  method: "POST",
  headers: {
  "Content-Type": "application/json; charset=utf-8",
  },
  body: query,
  });
  let payload = await response.json();
  state.options = [...new Set(payload.data.alerts.map((item) => item.subregion))];
  state.region=false;
state.subregion=true;
state.travelername=false;
setState({
showMsg: true,
});
} catch (error) {
setState({
snackbarMsg: `${error.message} - alert not added`,
showMsg: true,
});
}
};
 
const onButtonClick = (e, selectedOption) => {
    if(state.region===true)
    {
        setRegionSelection(selectedOption);
        getRegion();
    }
    else if(state.subregion===true)
    {
        setSubRegionSelection(selectedOption);
        getSubregion();
    }
    else if(state.travlername===true)
    {
        setNameSelection(selectedOption);
        getAdvisories();
    }
};
   
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
List Advisories By: 
 </Typography>

 <FormControl style={{alignItems: "center", margin: 20}}>
  <FormLabel id="radio-buttons-group-label"></FormLabel>
  <RadioGroup style={{alignItems: "center", color: "primary"}}
    aria-labelledby="demo-radio-buttons-group-label"
    defaultValue="traveler"
    name="radio-buttons-group"
    row
  >
    <FormControlLabel value="traveler" control={<Radio  onChange={TravelerButton} />} label="Traveler" />
    <FormControlLabel value="region" control={<Radio  onChange={RegionButton}/>} label="Region" />
    <FormControlLabel value="sub-region" control={<Radio onChange={SubRegionButton}/>} label="Sub-Region" />
  </RadioGroup>
</FormControl>

<Autocomplete
 data-testid="autocomplete"
 options={state.options}
 getOptionLabel={(option) => option}
 style={{ width: 300, margin: 20, alignItems: "center" }}
 onChange={onButtonClick}
 renderInput={(params) => (
 <TextField
 {...params}
 label="options"
 variant="outlined"
 fullWidth
 />
 )}
 />
 <p />
 <TableContainer style={{margin: 20}}>
 <Table aria-label="table">
<TableHead>
 <TableRow>
<TableCell style={{color: theme.palette.primary.main, textAlign: "center"}}>Country</TableCell>
<TableCell style={{color: theme.palette.primary.main, textAlign: "center"}}>Alert Information</TableCell>
 </TableRow>
 </TableHead>
 <TableBody>
{state.alerts.map((row) => (
 <TableRow>
 <TableCell>{row.name}</TableCell>
<TableCell>{row.text + " " + row.date}</TableCell>
</TableRow>
 ))}
</TableBody>
</Table>
</TableContainer>
 <CardContent>
 <div>
 <Typography color="error">{state.msg}</Typography>
 </div>
 </CardContent>
 </Card>
 </ThemeProvider>
 );
};
export default ListComponent;