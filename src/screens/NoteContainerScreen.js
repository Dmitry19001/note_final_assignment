import React, {useState, useEffect} from 'react';
import {NoteItem} from '../components/noteItem';
import {TouchableOpacity, Image, SafeAreaView, View, VirtualizedList, StyleSheet, Text } from 'react-native';
import { useNavigationState } from "@react-navigation/core";
import Icon from "react-native-feather1s";

import i18n from '../i18n';
import colors from '../config.js/colors';
import addIcon from "../../assets/new_note_icon_white.png";

class NoteContainer extends React.Component {
  // const [DATA, setDATA] = useState([]);

  constructor(props) {
    super(props);

    this.state = {notes: []}
  }

  async componentDidMount(){
    //const initialState = await loadSettings();
    //this.setState(initialState);
  }

  logDebug() {
    console.log(this.state.notes);
  }

  //TEST ONLY FEATUTRE
  addItem = () => {
    var lorem = 'Quis non esse proident tempor eiusmod proident enim quis cupidatat cillum irure ullamco in excepteur.';

    var id = Math.random().toString(12);
    id = id.substring(2, id.length - 2);

    var curDate = new Date();
    var createdDate = `${curDate.getHours()}:${curDate.getMinutes()} ${curDate.getDate()}.${curDate.getMonth()+1}.${curDate.getFullYear()}`

    var newNoteItem = new NoteItem(id, `Note #${this.state.notes.length+1}`, lorem, createdDate);
    var newData = [...this.state.notes , newNoteItem];

    //setDATA(newData);
    this.state.notes = newData;
    console.log(`Added: ${newNoteItem.id} at ${newNoteItem.createdDate}`);
  }

  getItemCount = (data) => data.length;

  getItem = (data, index) => ({
    id: data[index].id,
    key: data[index].id,
    title: data[index].name,
    text: data[index].text,
    createdDate: data[index].createdDate
  });

  editItem= (item) => {
    navigation.navigate('Editor', item)
  };

  deleteItem = (item) => {
    var foundIndex = DATA.findIndex((entry) => (entry.id === item.id));

    if (foundIndex != undefined) { 
      var newData = [...this.state.notes];
      newData.splice(foundIndex, 1);

      setDATA(newData);
    }
    else{
      console.log('should be deleted!')
    }
  }

  Item = ({ item }) => (  
    <View style={styles.item}>
      <View style={styles.note_toolbar}>
        <TouchableOpacity style={styles.tool_button} key="editButton" onPress={() => editItem(item)}>
            <Icon name="edit-2" size={25} color="black" thin={false}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tool_button} key="deleteButton" onPress={() => deleteItem(item)}>
          <Icon name="trash-2" size={25} color="red" thin={false}/>
        </TouchableOpacity>
      </View>

      <Text type="text" style={styles.title} editable={item.isBeingEdited}>{item.title}</Text>
      <Text style={styles.text} editable={item.isBeingEdited}>{item.text}</Text>
      
      <Text style={styles.createdDate}>{i18n.t('note_container.date_created')} {item.createdDate}</Text>

    </View>
  );

  render() {
    const {navigation} = this.props.props;
    const {route} = this.props.props;
    const notes = this.state.notes;
    return (
      <SafeAreaView style={styles.container}>
        <VirtualizedList
          style={{paddingBottom: 70}}
          data={this.state.notes}
          initialNumToRender={4}
          renderItem={({ item }) => <Item item={item}/>}
          keyExtractor={item => item.key}
          getItemCount={this.getItemCount}
          getItem={this.getItem}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => { navigation.navigate('Editor', {notes}) /*this.addItem()*/}}
          onLongPress={() => this.logDebug()}
          >
          <Image source={addIcon} style={{ width: 60, height: 60 }}/>
        </TouchableOpacity>
      </SafeAreaView>
    );

  }
}

export default function(props){
  const {navigation} = props;
  const navigationState = useNavigationState((state) => state);

  useEffect(() => {
    navigation.setOptions({title: i18n.t('navigation.my_notes')});
  } , [navigationState])

  return(
    <NoteContainer props={props}/>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    backgroundColor: colors.primary,
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
    backgroundColor: colors.secondary,
    height: 200,
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 20,
  },
  title: {
    fontSize: 26,
    marginRight: '30%',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkest,
  },
  text: {
    fontSize: 16,
    marginTop: 15,
    height: '70%'
  },
  createdDate: {
    fontSize: 12,
    opacity: 0.75,
    color: colors.dark,
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
    backgroundColor: colors.bright,
    borderRadius: 100,
  },
});

