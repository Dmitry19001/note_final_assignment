import React, {useState} from 'react';
import {NoteItem} from '../components/noteItem';
import {TextInput, TouchableOpacity, Image, SafeAreaView, View, VirtualizedList, StyleSheet, Text } from 'react-native';
import addIcon from "../../assets/new_note_icon_white.png";
import Icon from "react-native-feather1s";

import i18n from '../i18n';

const App = ({navigation}) => {

  const [DATA, setDATA] = useState([]);
  
  //const [exampleState, setExampleState] = useState(DATA);
  const lorem = "Amet officia voluptate nulla occaecat anim officia ex in. Occaecat ipsum Lorem cupidatat laboris enim ut officia deserunt. Commodo quis proident cupidatat in.";

  const addItem = () => {
    var id = Math.random().toString(12);
    id = id.substring(2, id.length - 2);

    var curDate = new Date();
    var createdDate = `${curDate.getHours()}:${curDate.getMinutes()} ${curDate.getDate()}.${curDate.getMonth()+1}.${curDate.getFullYear()}`

    var newNoteItem = new NoteItem(id, `Note #${DATA.length+1}`, lorem, createdDate);
    var newData = [...DATA , newNoteItem];

    setDATA(newData);

    console.log(`Added: ${newNoteItem.id} at ${newNoteItem.createdDate}`);
  } 
  
  const getItem = (data, index) => ({
    id: data[index].id,
    key: data[index].id,
    title: data[index].name,
    text: data[index].text,
    createdDate: data[index].createdDate
  });
  
  const getItemCount = (data) => data.length;
  
  const editSave = (item) => {
    navigation.navigate('Editor', item)
  };

  const deleteItem = (item) => {
    var foundIndex = DATA.findIndex((entry) => (entry.id === item.id));

    if (foundIndex != undefined) { 
      var newData = [...DATA];
      newData.splice(foundIndex, 1);

      setDATA(newData);
    }
    else{
      console.log('should be deleted!')
    }
  }

  const Item = ({ item }) => (  
    <View style={styles.item}>
      <View style={styles.note_toolbar}>
        <TouchableOpacity style={styles.tool_button} key="editButton" onPress={() => editSave(item)}>
            <Icon name="edit-2" size={22} color="black" thin={false}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tool_button} key="deleteButton" onPress={() => deleteItem(item)}>
          <Icon name="trash-2" size={22} color="red" thin={false}/>
        </TouchableOpacity>
      </View>

      <Text type="text" style={styles.title} editable={item.isBeingEdited}>{item.title}</Text>
      <Text style={styles.text} editable={item.isBeingEdited}>{item.text}</Text>
      
      <Text style={styles.createdDate}>{i18n.t('note_container.date_created')} {item.createdDate}</Text>

    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <VirtualizedList
        style={{paddingBottom: 70}}
        data={DATA}
        initialNumToRender={4}
        renderItem={({ item }) => <Item item={item}/>}
        keyExtractor={item => item.key}
        getItemCount={getItemCount}
        getItem={getItem}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => {/*navigation.navigate('Editor')*/ addItem()}} >
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
    marginTop: 15,
    height: '70%'
  },
  createdDate: {
    fontSize: 12,
    opacity: 0.75,
    color: '#545454',
    textAlign: 'right',
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
    opacity: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
});

export default App;