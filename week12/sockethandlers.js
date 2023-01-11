let users = [];
let usersColours=[];
const matColours = require('./matdes100colours.json');
const moment = require('moment');
const getUser = (chatName) => {
  return users.find((user) => {
    return user === chatName;
  });
};
const getColour= (colour) => {
  return usersColours.find((userColour) => {
    return userColour === colour;
  });
};
const getUserColour = (chatName) => {
  return users.indexOf(chatName);
};
const handleJoin = (socket, clientData)=>{
    socket.name = clientData.chatName;
    socket.room = clientData.roomName;
    if (getUser(clientData.chatName) === clientData.chatName) {
        socket.emit(
          "nameexists",
          "that name already exists, try a different one"
        );
      } else {
        users.push(clientData.chatName);
        let coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
       do{
        console.log(matColours.colours[coloridx]);
        if(matColours.colours[coloridx] !== getColour(matColours.colours[coloridx])){
          usersColours.push(matColours.colours[coloridx]);
          break;
        }
        else{
          coloridx = Math.floor(Math.random() * matColours.colours.length) + 1;
        }
      } while(matColours.colours[coloridx] === getColour(matColours.colours[coloridx]));

    // use the room property to create a room
    socket.join(clientData.roomName);
    console.log(`${socket.name} has joined ${clientData.roomName}`);
    // send message to joining client
    socket.emit(
    "welcome",{
    text:`Welcome ${socket.name} to the ${clientData.roomName} room`,
    users:users,
    colour: usersColours[getUserColour(socket.name)],
    time:moment().format('h:mm:ss a'),
    from: "Admin"
    });
    socket
    .to(clientData.roomName)
    .emit("someonejoined", {text:`${socket.name} has joined room ${clientData.roomName}`,colour: usersColours[getUserColour(socket.name)],time:moment().format('h:mm:ss a'), from: "Admin"});
      }
   
};
const handleDisconnect = (socket)=>{
    // use the room property to create a room
    users.filter(user=>user!=socket.name );
    console.log(`${socket.name} has left ${socket.room}`);
    // send message to joining client
    socket.to(socket.room).emit(
    "someoneleft",{
    text:`${socket.name} has left ${socket.room}`,
    users:users,
    colour: usersColours[getUserColour(socket.name)],
    time:moment().format('h:mm:ss a'),
    from: "Admin"
    });
   
};
const handleTyping = (socket, clientData)=>{
  console.log(`${clientData.from} is typing in ${socket.room}`);
  // send message to joining client
  socket
  .to(socket.room)
  .emit("someoneistyping", {text:`${clientData.from} is typing`, from: clientData.from,colour: usersColours[getUserColour(socket.name)],time:moment().format('h:mm:ss a')});
};
const handleMessage = (socket, clientData)=>{
  console.log(`${clientData.from}: ${clientData.text}`);
  // send message to joining client
  socket
  .to(socket.room)
  .emit("newmessage",{text:`${clientData.text}`, from: clientData.from,colour: usersColours[getUserColour(socket.name)],time:moment().format('h:mm:ss a')});
  socket
  .emit("newmessage",{text:`${clientData.text}`, from: clientData.from,colour: usersColours[getUserColour(socket.name)],time:moment().format('h:mm:ss a')});
};
module.exports = { handleJoin, handleDisconnect,handleTyping,handleMessage };