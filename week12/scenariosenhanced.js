import { useReducer, useEffect } from "react";
import io from "socket.io-client";
import { ThemeProvider } from "@mui/material/styles";
import { Button, TextField, Typography, AppBar, Toolbar } from "@mui/material";
import theme from "../theme";
import ChatMsg from "./chatmsg";
const Scenario1Test = () => {
 const initialState = {
 messages: [],
 status: "",
 showjoinfields: true,
 alreadyexists: false,
 chatName: "",
 roomName: "",
 users: [],
 typingMsg: "",
 isTyping: false,
 message: "",
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
 socket.on("someoneleft", addMessage);
 socket.on("someoneistyping", onTyping);
 socket.on("newmessage", onNewMessage);
 setState({ socket: socket });
 };
 const onExists = (dataFromServer) => {
    setState({ status: dataFromServer.text });
    };
    // generic handler for all other messages:
    const addMessage = (dataFromServer) => {
    console.log(dataFromServer);
    let messages = state.messages;
    messages.push(dataFromServer);
    setState({
    messages: messages,
    users: dataFromServer.users,
    showjoinfields: false,
    alreadyexists: false,
    });
    };
    // handler for join button click
 const handleJoin = () => {
    state.socket.emit("join", {
    chatName: state.chatName,
    roomName: state.roomName,
    });
    };
    // handler for name TextField entry
    const setUsername = (e) => {
    setState({ chatName: e.target.value, status: "" });
    };
    // handler for room TextField entry
    const setRoomName = (e) => {
    setState({ roomName: e.target.value });
    };
    const onTyping = dataFromServer => {
        console.log(dataFromServer);
        if (dataFromServer.from !== state.chatName) {
        setState({
        typingMsg: dataFromServer.text
        });
        }
        };
        // keypress handler for message TextField
const onMessageChange = e => {
    setState({ message: e.target.value });
    if (state.isTyping === false) {
    state.socket.emit("typing", { from: state.chatName }, err => {});
    setState({ isTyping: true }); // flag first byte only
    }
   };
   const onNewMessage = dataFromServer => {
    addMessage(dataFromServer);
    setState({ typingMsg: "" });
    };
     // enter key handler to send message
 const handleSendMessage = e => {
    if (state.message !== "") {
    state.socket.emit(
    "message",
    { from: state.chatName, text: state.message },
    err => {}
    );
    setState({ isTyping: false, message: "" });
    }
   };

    return (
        <ThemeProvider theme={theme}>
        <AppBar position="static">
        <Toolbar>
        <Typography variant="h5" color="inherit">
        INFO3139 - Socket IO
        </Typography>
        </Toolbar>
        </AppBar>
        <h2 style={{ textAlign: 'center', margin: 40, }}>Scenarios Enhanced Test</h2>
        {state.showjoinfields && (
        <div style={{ padding: "3vw", margin: "3vw" }}>
        <TextField
        placeholder="User's Name"
        onChange={setUsername}
        autoFocus={true}
        required
        value={state.chatName}
        error={state.status !== ""}
        helperText={state.status}
        />
        <p></p>
        <TextField
        onChange={setRoomName}
        placeholder="Room Name"
        required
        value={state.roomName}
        />
        <p></p>
        <Button
        variant="contained"
        data-testid="submit"
        color="primary"
        style={{ marginLeft: "3%" }}
        onClick={() => handleJoin()}
        disabled={state.chatName === "" || state.roomName === ""} >
        Join
        </Button>
        </div>
        )}
   {!state.showjoinfields && (
 <TextField style={{margin: 20}}
 onChange={onMessageChange}
 placeholder="type something here"
 autoFocus={true}
 value={state.message}
 onKeyPress={e => (e.key === "Enter" ? handleSendMessage() : null)}
 />
 )}
        {!state.showjoinfields && (
 <div className="scenario-container" style={{margin: 20}}>
 <h3>Current Messages</h3>
 {state.messages.map((message, index) => (
 <ChatMsg msg={message} key={index} />
 ))}
 </div>
 )}
  <div>
 <Typography color="primary">
 {state.typingMsg}
 </Typography>
 </div>
 </ThemeProvider>
 );
};
export default Scenario1Test;
