import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core"; //this will al1ow us to covert the icon into button

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc") //this will helps us to give the messages in order.
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []); //In this case the useEffect is only used when the page reloads.

  //useState = variable in React
  //useEffect = run code on a condition in react
  // useEffect allows us to run a piece of code once when a piece of code loads
  useEffect(() => {
    //run code here...
    // const userName = prompt('please enter your name');
    setUsername(prompt("Please Enter your name"));
    //if its blank inside[],this code runs ONCE when the app component loads
    //if we have variable like [input](dependencies), it runs every time input changes.
  }, []); //condtion //[] and this call it as dependencies.

  const sendMessage = (event) => {
    event.preventDefault(); //this line will help you not to get refresh when you click sendmessage button
    //all the logic to send a message goes here
    //   setMessages([...messages, { userName: userName, text: input }]);
    //   setInput("");
    // };//this is used only in local
    //if we want to add this input/messages to the database we need below code
    db.collection("messages").add({
      message: input,
      userName: userName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1> Facebook Messenger-Clone </h1> <h2> Welcome {userName} </h2>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="          Type a message...."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconButton"
            variant="contained"
            color="secondary"
            type="submit"
            onClick={sendMessage}
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {/* Instead of writing while loop or for loop we use map function to loop through the messages */}
        {messages.map(({ id, message }) => (
          <Message key={id} userName={userName} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
