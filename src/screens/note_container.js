import React, {useState} from 'react';
import {noteItem} from '../components/note_item'
import {TextInput, TouchableOpacity, Image, SafeAreaView, View, VirtualizedList, StyleSheet, Text } from 'react-native';
import addIcon from "../../assets/new_note_icon_white.png";
import Icon from "react-native-feather1s";

const App = () => {

  const [DATA, setDATA] = useState([]);
  
  //const [exampleState, setExampleState] = useState(DATA);
  const [isEditing, setEditing] = useState(true);
  // const lorem = "Amet officia voluptate nulla occaecat anim officia ex in. Occaecat ipsum Lorem cupidatat laboris enim ut officia deserunt. Commodo quis proident cupidatat in.";

  const addItem = () => {
    var id = Math.random().toString(12);
    id = id.substring(2, id.length - 2);

    var curDate = new Date();

    var newNoteItem = new noteItem(id, "", "", `${curDate.getDate()}.${curDate.getMonth()}.${curDate.getFullYear()}`);
    var newData = [...DATA , newNoteItem];;

    setDATA(newData);

    console.log("added new note");
    console.log(newNoteItem);
  } 
  
  const getItem = (data, index) => ({
    id: data[index].id,
    key: data[index].id,
    title: data[index].name,
    text: data[index].text,
    dateCreated: data[index].dateCreated
  });
  
  const getItemCount = (data) => data.length;
  
  const editSave = () => {
    if (isEditing){
      setEditing(false);
      console.log("Edit disabled");
      return;
    }
    setEditing(true);
    console.log("Edit enabled");
    return;
  };

  const deleteItem = (id) => {
    console.log("deleting: " + id)
    var newData = DATA.splice(DATA.find((entry) => entry.id === id).index);
    setDATA(newData);
    console.log(newData);
  }

  const Item = ({ id, title, text, dateCreated }) => (  
    <View style={styles.item} onClick={() => console.log(`item: ${title} clicked`)}>
      <View style={styles.note_toolbar}>
        <TouchableOpacity style={styles.tool_button} key="editButton" onPress={() => editSave()}>
          { !isEditing &&
            <Icon name="save" size={22} color="black" thin={false}/>
          }
          
          { isEditing &&
            <Icon name="edit-2" size={22} color="black" thin={false}/>
          }
          
        </TouchableOpacity>
        <TouchableOpacity style={styles.tool_button} key="deleteButton" onPress={() => deleteItem(id)}>
          <Icon name="trash-2" size={22} color="red" thin={false}/>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.title} placeholder="Enter a title here...">{title}</TextInput>
      <TextInput multiline={true} style={styles.text}  placeholder="Enter a text here...">{text}</TextInput>

      <Text style={styles.dateCreated}>{dateCreated}</Text>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        style={{paddingBottom: 70}}
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item id={item.id} title={item.title} text={item.text} dateCreated={item.dateCreated}/>}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {addItem()}} >
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
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginRight: '30%',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  text: {
    fontSize: 16,
    paddingTop: 10
  },
  dateCreated: {
    fontSize: 10,
    color: '#545454',
    right: 10
  },
  note_toolbar: {
    flex: 1,
    right: 5,
    top: 10,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  tool_button: {
    margin: 2,
    opacity: 0.75,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default App;