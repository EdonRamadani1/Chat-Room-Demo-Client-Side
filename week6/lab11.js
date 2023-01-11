//Name: Edon Ramadani

import React, { useState } from "react";
import "../App.css";
import { ThemeProvider } from "@mui/material/styles";
import {
 Toolbar,
 Card,
 AppBar,
 CardHeader,
 Typography,
 Button,
 OutlinedInput,
} from "@mui/material";

import theme from "./theme";

// An example of a React Functional Component using JSX syntax
const FunctionalStateHookComponent = () => {
 const [message, addToMessage] = useState("");
 const [word, addWord] = useState("");
 return (
  <ThemeProvider theme={theme}>
  <AppBar color="primary">
  <Toolbar>
  <Typography variant="h6" color="inherit">
  INFO3139 - Lab 11
  </Typography>
  </Toolbar>
  </AppBar>
  <Card style={{ marginTop: 50, padding: 10}}>
  <CardHeader title="Sentence Builder" style={{ textAlign: "center", margin: 5, marginTop: 30}} />
  <Typography variant="h7" color="secondary" style={{margin: 20}}>The message is:</Typography>
  <Typography color="primary" style={{margin: 20}}>{message}</Typography>
  <OutlinedInput size="small" title="Addword" placeholder="Add Word" style={{ marginLeft: 30, maxWidth: 150 }} onChange={(v) => addWord(v.target.value) }>add word</OutlinedInput>
  <Button variant="contained" data-testid="addbutton" color="inherit" title="Submit" style={{ margin: 10, }} onClick={() => addToMessage(message + " " + word)}>Submit</Button>
  <Button variant="contained" color="inherit" title="Clear msg"  onClick={() => addToMessage("")}>Clear msg</Button>
  </Card>
  </ThemeProvider>
 );
 
};
export default FunctionalStateHookComponent;