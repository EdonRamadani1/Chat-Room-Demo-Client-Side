import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Autocomplete,
 Toolbar,
 Card,
 AppBar,
 CardHeader,
 CardContent,
 Typography,
 TextField,
} from "@mui/material";
import theme from "../../theme";
import "../../App.css";
// An example of a React Functional Component using JSX syntax
const FunctionalStateHookComponent = () => {
 const [message, addToMessage] = useState("");
 const onChange = (e, selectedOption) => {
    selectedOption
    ? addToMessage(message + " " + selectedOption)
    : addToMessage("");
    };
 return (
    <ThemeProvider theme={theme}>
    <AppBar color="primary">
    <Toolbar>
    <Typography variant="h6" color="inherit">
    INFO3139 - Lab 12
    </Typography>
    </Toolbar>
    </AppBar>
    <Card>
    <CardHeader
    title="Sentence Builder"
    style={{ textAlign: "center" }}
    />
    <CardContent>
    <Typography variant="h5" color="inherit" style={{ textAlign: "center", marginBottom: 20, padding:50 }}>
    Sentence Builder Using Autocomplete
    </Typography>
    <Autocomplete
    data-testid="autocomplete"
    options={words}
    getOptionLabel={(option) => option}
    style={{ width: 300 }}
    onChange={onChange}
    renderInput={(params) => (
    <TextField
    {...params}
    label="pick a word"
    variant="outlined"
    fullWidth
    />
    )}
    />
    <p />
    <Typography variant="h6" color="error">
    {message}
    </Typography>
    </CardContent>
    </Card>
    </ThemeProvider>
 );
};
const words = ['Here', 'is','a', 'sentence', 'about', 'nothing', 'by', 'Edon', 'Ramadani'];
export default FunctionalStateHookComponent;