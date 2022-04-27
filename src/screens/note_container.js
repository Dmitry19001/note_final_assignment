import React, {useState} from 'react';
import {noteItem} from '../components/noteItem'
import {Button, TouchableOpacity, Image, SafeAreaView, View, VirtualizedList, StyleSheet, Text } from 'react-native';
import addIcon from "../../assets/new_note_icon_white.png";

const App = () => {

  const [DATA, DATA_CHANGED] = useState([
  ])
  
  const [exampleState, setExampleState] = useState(DATA);
  
  const lorem = "Amet officia voluptate nulla occaecat anim officia ex in. Occaecat ipsum Lorem cupidatat laboris enim ut officia deserunt. Commodo quis proident cupidatat in.";

  const addItem = () => {
    var newNoteItem = new noteItem(`Note #${DATA.length + 1}`, lorem, '27.4');
    var new_data = [...DATA , newNoteItem];;
  
    setExampleState(new_data);
    DATA_CHANGED(new_data);
  }
  
  const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    key: data[index].name + "_item",
    title: data[index].name,
    text: data[index].text,
    dateCreated: data[index].dateCreated
  });
  
  const getItemCount = (data) => data.length;
  
  const Item = ({ title, text, dateCreated }) => (
    <View style={styles.item} onClick={() => console.log(`item: ${title} clicked`)}>
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.editButton} key="editButton" title="Edit" onClick={() => console.log("EDIT MODE ENTERED")}>
        <Text>Edit</Text>
      </TouchableOpacity>

      <Text style={styles.text}>{text}</Text>
      <Text style={styles.dateCreated}>{dateCreated}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        style={{paddingBottom: 70}}
        data={exampleState}
        initialNumToRender={4}
        renderItem={({ item }) => <Item title={item.title} text={item.text} dateCreated={item.dateCreated}/>}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {addItem()}} >
                {/* <Text style={styles.title}>+</Text> */}
                <Image source={addIcon} style={{ width: 60, height: 60 }}/>
            </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#F8A100',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 70,
    borderRadius: 100,
  },
  item: {
    backgroundColor: '#F8F818',
    height: 200,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  text: {
    fontSize: 16,
  },
  dateCreated: {
    fontSize: 10,
    color: '#545454',
    right: 10
  },
  editButton: {
    right: 10,
    top: 10,
    position: 'absolute'
  }

});

export default App;