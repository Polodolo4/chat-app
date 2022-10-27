import React, { Component } from "react";
import { View, Platform, KeyboardAvoidingView, StyleSheet } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ThemeContext } from "react-navigation";

async function getMessages(db) {
  const messagesCol = collection(db, "messages");
  //console.log(messagesCol);
  const messagesSnapshot = await getDocs(messagesCol);
  //console.log(messagesSnapshot);
  const messagesList = messagesSnapshot.docs.map((doc) => doc.data());
  return messagesList;
}

export default class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };

    const firebaseConfig = {
      apiKey: "AIzaSyAZwOuXps2yn21ZzXgcK2qtzgnJKnLSAEI",
      authDomain: "chatapp-8eee0.firebaseapp.com",
      projectId: "chatapp-8eee0",
      storageBucket: "chatapp-8eee0.appspot.com",
      messagingSenderId: "699094059980",
      appId: "1:699094059980:web:2f33e180ad75b19bbaeb69",
    };

    const app = initializeApp(firebaseConfig);
    this.db = getFirestore(app);
  }

  componentDidMount() {
    getMessages(this.db)
      .then((res) => {
        console.log(this.messagesCol);
      })
      .catch((err) => {
        console.log("nope");
      });
    //passes name entered from Start screen to title
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    //sets default messages (system & normal message)
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "You have entered the chat!",
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  //appends message to the previous
  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  //customizes chat bubble colors
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={styles.bubble}
      />
    );
  }

  render() {
    const { color } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/*fixes keyboard hide message issue on older/smaller Android devices */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    left: {
      backgroundColor: "#FFF",
    },
    right: {
      backgroundColor: "#25D8DF",
    },
  },
});
