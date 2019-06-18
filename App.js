import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaskList from "./components/task-list";
export default function App() {
  return (
    <View style={styles.container}>
      <TaskList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6'
  }
});
