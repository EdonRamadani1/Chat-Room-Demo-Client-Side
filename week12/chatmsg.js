import React from 'react';
import '../App.css';
const ChatMsg = props => {
 let msg = props.msg;
 return (
 <div className="scenario-message" style={{ backgroundColor: msg.colour, padding: 20, margin: 5, fontFamily: 'arial', fontWeight: 'bold', color: 'white' }}>
 {msg.from} Says @{msg.time}: <p></p> {msg.text}
 </div>
 );
};
export default ChatMsg;