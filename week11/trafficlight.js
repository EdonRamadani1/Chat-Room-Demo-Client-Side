
import { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import "../App.css";
import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    TextField,
    Button,
    Snackbar,
   } from "@mui/material";

const Lab16 = (props) => {
 const initialState = { 
     msg: "",
     roomMsg: "",
     street: "",
     };

 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 useEffect(() => {
 serverConnect();
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const [color, setColor] = useState("red");

 const getStateColor = (c) => (color === c ? color : "white");

 // lamp handler code, lamp data from server
 const handleTurnLampOn = async (lampData, socket) => {
    socket.disconnect(); // don't need server anymore once we have data
    while (true) { // loop until browser closes
    // wait on current colour, then set next color
    await waitSomeSeconds(lampData.red, "green");
    //green and yellow lamps go here
    await waitSomeSeconds(lampData.green, "red");
    await waitSomeSeconds(lampData.yellow, "yellow");
    }
    };
   
    const waitSomeSeconds = (waitTime, nextColorToIlluminate) => {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
    setColor(nextColorToIlluminate); // update state variable
    resolve();
    }, waitTime);
    });
    };

 const serverConnect = () => {
 try {
 // connect to server locally
//  const socket = io.connect("localhost:5000", {
//  forceNew: true,
//  transports: ["websocket"],
//  autoConnect: true,
//  reconnection: false,
//  timeout: 5000,
//  });
// connect to server on Heroku
const socket = io.connect();



 socket.emit("join", { streetName: props.street }, (err) => {});
 socket.on("turnLampOn", (data) => handleTurnLampOn(data,socket));
 setState({ socket: socket, msg: "disconnected" });
 } catch (err) {
 console.log(err);
 setState({ msg: "connecting..." });
 }
 };
 return (
     <div>

    <div>{state.msg}</div>
        <div className="light">
            <div className="lamp" style={{ backgroundColor: getStateColor("red"), margin: ".5rem" }} />
            <div className="lamp" style={{ backgroundColor: getStateColor("yellow"), margin: ".5rem" }} />
            <div className="lamp" style={{ backgroundColor: getStateColor("green"), margin: ".5rem" }} />
        <div style={{ textAlign: "center", fontName: "Helvetica" }}>{props.street}</div>
        </div>
    </div>
 );
};

export default Lab16;
   