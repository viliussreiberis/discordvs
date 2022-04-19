import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader.js";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { DoorBackTwoTone } from "@mui/icons-material";
import db from "./firebase";
import { useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [sortedMessages, setSortedMessages] = useState([]);
  const [messageNumber, setMesssageNumber] = useState(1);
  const [test, setTest] = useState(1);

  // useEffect(() => {
  //   if (channelId) {
  //     db.collection("channels")
  //       .doc(channelId)
  //       .collection("messages")
  //       .orderBy("timestamp", "desc")
  //       .onSnapshot((snapshot) =>
  //         setMessages(snapshot.docs.map((doc) => doc.data()))
  //       );
  //   }
  // }, [channelId]);

  // useEffect(() => {
  //   let collectionRef = collection(
  //     db,
  //     "channels",
  //     channelName ? channelName : "nothing",
  //     "messages"
  //   );

  //   onSnapshot(collectionRef, (querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log("Id: ", doc.id, "Data: ", doc.data());
  //     });
  //   });
  // }, []);

  const chatMessagesRef = useRef();

  setTimeout(
    () => {
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      } else {
        return;
      }
    },

    1000
  );

  useEffect(() => {
    async function getData() {
      const subColRef = collection(
        db,
        "channels",
        channelName ? channelName : "nothing",
        "messages"
      );

      const qSnap = await getDocs(subColRef);

      setMessages((prevArr) => qSnap.docs.map((d) => ({ ...d.data() })));
    }

    getData();
  }, [channelName, test, messageNumber]);

  const sendMessage = (e) => {
    e.preventDefault();
    const docRef = doc(db, "channels", channelId);
    const colRef = collection(docRef, "messages");
    addDoc(colRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: user,
      date: new Date(),
      timestamp: new Date(),
    });
    setInput("");
    setMesssageNumber((prev) => prev + 1);
    setTimeout(
      () => {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      },

      500
    );
  };

  // console.log(messages);
  // console.log(new Date());

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages" ref={chatMessagesRef}>
        {messages &&
          messages
            .sort((a, b) => a.date - b.date)
            // .reverse()
            .map((message) => (
              <Message
                key={message.timestamp}
                timestamp={message.timestamp}
                message={message.message}
                user={message.user}
              />
            ))}
        {!messages && <p>Loading...</p>}
      </div>
      <div className="chat__input">
        <AddCircleOutlinedIcon />
        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            type="submit"
            className="chat__inputButton"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>
        <div className="chat__inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
