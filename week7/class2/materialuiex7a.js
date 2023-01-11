import React, { useReducer } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Snackbar } from "@material-ui/core";
import theme from "../../theme";
import MaterialUIEx7b from "./materialuiex7b";
import "../../App.css";
const MaterialUIEx7a = () => {
 const initialState = {
 snackbarMsg: "",
 msgFromParent: "data from parent",
 gotData: false,
 };
 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 const snackbarClose = (event, reason) => {
 if (reason === "clickaway") {
 return;
 }
 setState({ gotData: false });
 };
 const msgFromChild = (msg) => {
 setState({ snackbarMsg: msg, gotData: true });
 };
 return (
 <MuiThemeProvider theme={theme}>
 <div style={{ border: "solid", padding: "10vw", textAlign: "center" }}>
 <div
 style={{
 fontSize: "x-large",
 fontFamily: "verdana",
 fontWeight: "bold",
 color: "#417505",
 }}
 >
 Exercise #7a - Parent Component
 </div>
 <MaterialUIEx7b
 dataFromChild={msgFromChild}
 dataForChild={state.msgFromParent}
 />
 </div>
 <Snackbar
 open={state.gotData}
 message={state.snackbarMsg}
 autoHideDuration={4000}
 onClose={snackbarClose}
 />
 </MuiThemeProvider>
 );
};
export default MaterialUIEx7a;