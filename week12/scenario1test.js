import { useReducer, useEffect } from "react";
import io from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
import { Button, TextField, Typography, AppBar, Toolbar } from "@mui/material";
import theme from "../../theme";
const Scenario1Test = () => {
 const initialState = {
 messages: [],
 status: "",
 showjoinfields: true,
 alreadyexists: false,
 chatName: "",
 roomName: "",
 users: [],
 };
 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 useEffect(() => {
 serverConnect();
 // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
 const serverConnect = () => {
 // connect to server
 const socket = io.connect("localhost:5000", {
 forceNew: true,
 transports: ["websocket"],
 autoConnect: true,
 reconnection: false,
 timeout: 5000,
 });
 socket.on("nameexists", onExists);
 socket.on("welcome", addMessage);
 socket.on("someonejoined", addMessage);
 setState({ socket: socket });
 };
}