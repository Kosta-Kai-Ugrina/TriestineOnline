import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";
import "../classes/UserAgent";
const io = require("socket.io-client");

export default function TestConnect() {
  const [messages, setMessages] = useState(new Array());
  const [text, onChangeText] = useState("");
  const [update, setUpdate] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    let sock = io("https://still-castle-68445.herokuapp.com", {
      reconnectionDelayMax: 10000,
      jsonp: false,
    });
    sock.on("connect", (msg) => {
      console.log("connected");
    });
    sock.on("message", (msg) => {
      console.log("RECEIVED MSG: ", msg);
      let temp = messages;
      temp.push(msg);
      setMessages(temp);
      setUpdate(!update);
    });
    setSocket(sock);
  }, []);

  return (
    <SafeAreaView>
      {messages.map((msg) => (
        <View style={{ width: "100%", height: 50 }}>
          <Text>{msg}</Text>
        </View>
      ))}
      {/* <View
        style={{
          flex: 1,
          alignItems: "stretch",
          justifyContent: "flex-start",
        }}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item}
          renderItem={(msg) => {
            console.log("rendering item: ", msg);
            return (
              <View
                style={{
                  height: 50,
                  width: 200,
                  backgroundColor: "blue",
                }}
              >
                <Text>{msg.toString()}</Text>
              </View>
            );
          }}
        />
      </View> */}
      <View>
        <TextInput
          style={{
            borderColor: "black",
            borderWidth: 2,
            backgroundColor: "green",
            height: 50,
          }}
          autoFocus={true}
          onChangeText={onChangeText}
          value={text}
        />
        <View
          style={{ backgroundColor: "yellow", width: "100%", height: 50 }}
          onTouchStart={() => {
            console.log("CLICK");
            let temp = messages;
            temp.push(text);
            setMessages(temp);
            socket.send(text);
            onChangeText("");
            console.log(messages);
          }}
        >
          <Text>Send</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
