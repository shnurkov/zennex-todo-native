import React, {Component} from 'react';
import { ScrollView, TextInput, StyleSheet, View, Text, CheckBox, TouchableHighlight, Modal, Button, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import DatePicker from 'react-native-datepicker';
// import { TextInput } from 'react-native-gesture-handler';
const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    position: "relative"
  },
  label: {
    marginBottom: 5
  },
  input: {
    borderWidth: 1,
    borderColor: "#40A9FF",
    borderRadius: 5
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
    bottom: 40,
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
    console.log("desc: ", task);
    return (
      <Modal
          animationType="slide"
          transparent={false}
          visible={true}
          onRequestClose={() => {
            this.props.close();
      }}>
        <View style={styles.container}>
          {/* {task && */}
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <TextInput 
              style ={styles.input}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Description</Text>
            <TextInput 
              style ={styles.input}
              multiline = {true}
              numberOfLines = {4}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Importance</Text>
            <SegmentedControlTab
              values={['Usual', 'Important', 'Very important']}
              selectedIndex={this.state.selectedIndex}
              onTabPress={this.handleIndexChange}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date end</Text>
            <DatePicker
              style={{width: Dimensions.get('window').width - 30}}
              date={this.state.date}
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
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date done</Text>
            <DatePicker
              disabled
              style={{width: Dimensions.get('window').width - 30}}
              date={this.state.date}
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
              // onDateChange={(date) => {this.setState({date: date})}}
            />

          </View>
          <View style={styles.btnWrap}>
            <View style={styles.btnOk}>
            <Button
            // onPress={onPressLearnMore}
            
            title="Ok"
            color="#40A9FF"
            accessibilityLabel="Learn more about this purple button"
          />

            </View>
            <View style={styles.btnDel}>
              <Button
              // onPress={onPressLearnMore}
              style={styles.btnDel}
              title="Delete"
              color="#C82333"
              accessibilityLabel="Learn more about this purple button"
            />
            </View>
          </View>
          {/* } */}
        </View>
      </Modal>
    );
  }
  handleIndexChange = (index) => {
    this.setState({
      ...this.state,
      selectedIndex: index,
    });
  }
}