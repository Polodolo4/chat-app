import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Chat extends Component {
  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
  }

  render() {
    const { color } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: color }, styles.container]}>
        <Text style={styles.text}>Chat it up!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 60,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
