import React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
 Button,
 Card,
 CardHeader,
 CardContent,
 Typography,
} from "@material-ui/core";
import theme from "../../theme";
import "../../App.css";
const MaterialUIEx7b = (props) => {
 const sendParentSomeData = () => {
 props.dataFromChild("child component sent this!");
 };
 return (
 <MuiThemeProvider theme={theme}>
 <Card style={{ marginTop: "10%", border: "dotted", textAlign: "center" }}>
 <CardHeader
 title="Exercise #7b - Child Component"
 color="inherit"
 style={{ textAlign: "center" }}
 />
 <CardContent>
 <Typography
 color="secondary"
 style={{ fontSize: "large", fontWeight: "bold" }}
 >
 {props.dataForChild}
 </Typography>
 <br />
 <Button
 color="primary"
 variant="contained"
 onClick={sendParentSomeData}
 >
 Return Data
 </Button>
 </CardContent>
 </Card>
 </MuiThemeProvider>
 );
};
export default MaterialUIEx7b;