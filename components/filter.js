import React, {Component} from 'react';
import { StyleSheet, View, Text} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
const styles = StyleSheet.create({
  label: {
    marginBottom: 10
  }
});

export default class Filter extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Filter by</Text>
        <SegmentedControlTab
          values={['All', 'Usual', 'Important', 'Very important']}
          selectedIndex={this.getImportanceIndex(this.props.filterBy)}
          onTabPress={this.handleImportanceChange}
          tabTextStyle={{
            fontSize: 11
          }}
        />
      </View>
    );
  }
  handleImportanceChange = (index) => {
    let filterBy;
    switch(index){
      case 0:
        filterBy = "all"
        break;
      case 1:
        filterBy = "usual";
        break;
      case 2:
        filterBy = "important"
        break;
      case 3:
        filterBy = "very-important";
        break;
    }
    this.props.filter(filterBy);
  }
  getImportanceIndex = (importance) => {
    let i;
    switch(importance){
      case "all":
        i = 0;
      break;
      case "usual":
        i = 1;
        break;
      case "important":
        i = 2
        break;
      case "very-important":
        i = 3;
        break;
    }
    return i;
  }
}
