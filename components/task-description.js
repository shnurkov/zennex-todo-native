import React, {Component} from 'react';
import {TextInput, StyleSheet, View, Text, Modal, Button, Dimensions } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-datepicker';
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    minHeight: Dimensions.get('window').height,
    position: "relative"
  },
  label: {
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#40A9FF",
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  row: {
    marginBottom: 20
  },
  btnWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "stretch",
    position: "absolute",
    bottom: 50,
    width: Dimensions.get('window').width
  },
  btnOk: {
    width: 100,
    height: 30
  },
  btnDel: {
    width: 100,
    height: 30,
    marginLeft: 20
  }
});

export default class TaskDesc extends Component{
  state = {
    date: null,
    selectedIndex: 0
  }

  render(){
    let {task} = this.props;
    return (
      <Modal
          animationType="slide"
          transparent={false}
          visible={!!task}
          onRequestClose={() => {
            this.props.close();
      }}>
      {task &&
        <View style={styles.container}>
          
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              value = {task.title}
              style ={styles.input}
              onChangeText = {this.handleTitleChange}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description</Text>
            <TextInput 
              value = {task.description}
              onChangeText = {this.handleDescChange}
              style ={styles.input}
              multiline = {true}
              numberOfLines = {4}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Importance</Text>
            <SegmentedControlTab
              values={['Usual', 'Important', 'Very important']}
              selectedIndex={this.getImportanceIndex(task.importance)}
              onTabPress={this.handleImportanceChange}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date end</Text>
            <DatePicker
              style={{width: Dimensions.get('window').width - 30}}
              date={task.time.end}
              mode="datetime"
              placeholder="Select date"
              format="DD.MM.YYYY HH:mm"
              showIcon={false}
              minDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderRadius: 5
                }
              }}
              onDateChange={this.handleDateChange}
            />
          </View>
          {task.isDone &&
          <View style={styles.row}>
            <Text style={styles.label}>Date done</Text>
            <DatePicker
              disabled
              style={{width: Dimensions.get('window').width - 30}}
              date={task.time.done}
              mode="datetime"
              placeholder="Select date"
              format="DD.MM.YYYY HH:mm"
              showIcon={false}
              minDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderRadius: 5
                }
              }}
            />

          </View>}
          <View style={styles.btnWrap}>
            <View style={styles.btnOk}>
              <Button
              onPress={this.handleCloseDesc}
              title="Ok"
              color="#40A9FF"
              />
            </View>
            <View style={styles.btnDel}>
              <Button
              onPress={this.handleDeleteTask}
              title="Delete"
              color="#C82333"
            />
            </View>
          </View>
        </View>
      }
      </Modal>
    );
  }
  handleImportanceChange = (index) => {
    let val;
    switch(index){
      case 0:
        val = "usual";
        break;
      case 1:
        val = "important"
        break;
      case 2:
        val = "very-important";
        break;
      default:
        val = "usual";
    }
    this.props.edit(this.props.task.id, {importance: val});
  }
  getImportanceIndex = (importance) => {
    let i;
    switch(importance){
      case "usual":
        i = 0;
        break;
      case "important":
        i = 1
        break;
      case "very-important":
        i = 2;
        break;
      default:
        i = 0;
    }
    return i;
  }
  handleTitleChange = (val) => {
    this.props.edit(this.props.task.id, {title: val});
  }
  handleDescChange = (val) => {
    this.props.edit(this.props.task.id, {description: val});
  }
  handleDateChange = (_date, dateStr) => {
    this.props.edit(this.props.task.id, {time: dateStr});
  }
  handleDeleteTask = () => {
    this.props.del(this.props.task.id);
  }
  handleCloseDesc = () => {
    this.props.close();
  }
}