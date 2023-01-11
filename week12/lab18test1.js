import React, { useReducer, useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import io from "socket.io-client";
import {
 Card,
 CardHeader,
 CardContent,
 Typography,
 TextField,
 Button,
 Snackbar,
} from "@mui/material";
import theme from "../theme";

const Lab18client = (props) => {
    
 const initialState = {
 snackbarMsg: "",
 showMsg: false,
 username: "",
 roomName: "",
 msg: "", 
 roomMsg: "",
 currentMsg: "Current Messages",
 };

 const reducer = (state, newState) => ({ ...state, ...newState });
 const [state, setState] = useReducer(reducer, initialState);
 useEffect(() => {
    serverConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const serverConnect = () => {
    try {
    // connect to server locally
    const socket = io.connect("localhost:5000", {
    forceNew: true,
    transports: ["websocket"],
    autoConnect: true,
    reconnection: false,
    timeout: 5000,
    });
    socket.emit("join", { name: state.name, room: state.room }, (err) => {});
    socket.on("welcome", onWelcome);
    socket.on("newclient", newClientJoined);
    setState({ socket: socket });
    if (socket.io._readyState === "opening")
    // we'll see this if server is down or it'll get overwritten if its up
    setState({ msg: "Can't get connection - try later!" });
    } catch (err) {
    console.log(err);
    setState({ msg: "some other problem occurred" });
    }
};

    const onWelcome = (welcomeMsgFromServer) => {
    setState({ msg: welcomeMsgFromServer,snackbarMsg: welcomeMsgFromServer, showMsg: true });
};

    const newClientJoined = (joinMsgFromServer) => {
    setState({ roomMsg: joinMsgFromServer, snackbarMsg: joinMsgFromServer, showMsg: true});
};
 
    const onJoinClicked = () => {
        if (state.socket.io._readyState !== "closed") 
        {
            setState({ snackbarMsg: "Can't get connection - try later!", showMsg: true });
            serverConnect();
        } 
        else 
        {
            setState({ snackbarMsg: "no connection!", showMsg: true });
        }
 };

 const snackbarClose = () => {
    setState({ showMsg: false });
};
    const setUsername = (e) => {
    setState({ name: e.target.value });
};
    const setRoomName = (e) => {
   setState({ room: e.target.value });
};
    const disabledInfo =
    state.name === undefined ||
    state.name === "" ||
    state.room === undefined ||
    state.room === "";
 return (
 <ThemeProvider theme={theme}>
 <Card style={{ marginTop: "10vh", }}> 
 <CardHeader
 title="Lab 18 Scenarios 1 and 2 test"
 style={{ textAlign: "center",}}
 />

<CardContent>
<TextField style={{margin: 10}}
placeholder="User's Name"
onChange={setUsername}
value={state.name}></TextField>
<Typography style={{marginLeft: 20, fontSize: 12, color: "grey"}}>Enter user's name here</Typography>
<p/>
<TextField style={{margin: 10}}
placeholder="Room Name"
onChange={setRoomName}
value={state.room}></TextField>
<Typography style={{marginLeft: 20, fontSize: 12, color: "grey"}}>Enter room to join here</Typography>
</CardContent>

 <p />
 <Button 
 variant="contained" 
 onClick={onJoinClicked}
 style={{marginLeft: 30, marginBottom: 30}}
 disabled={disabledInfo}
 >Join</Button>

 <Snackbar
        open={state.showMsg}
        message={state.msg}
        autoHideDuration={10000}
        onClose={snackbarClose}
      />
 </Card>
 <p/>
 <div style={{marginLeft: 20}}> Current Messages
 {state.roomMsg && (
     <div>
        <div style={{ paddingTop: "2vh" }}>{state.roomMsg}</div>
     </div>
    
 )}
 </div>


 </ThemeProvider>
 );
};
export default Lab18client;