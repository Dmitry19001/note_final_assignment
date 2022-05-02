import React, {useState, useEffect} from 'react';
import {NoteItem} from '../components/noteItem';
import {TouchableOpacity, Image, SafeAreaView, View, VirtualizedList, StyleSheet, Text } from 'react-native';
import { useNavigationState } from "@react-navigation/core";
import Icon from "react-native-feather1s";

import i18n from '../i18n';
import colors from '../config/colors';
import addIcon from "../../assets/new_note_icon_white.png";
import {loadSavedNotes, saveNotes} from "../storage/noteStorage"; 
import timeFormat from "../utils/timeFormat";

class NoteContainer extends React.Component {
  // const [DATA, setDATA] = useState([]);

  constructor(props) {
    super(props);

    this.state = {notes: []}
  }

  async componentDidMount(){
    var initialState = await loadSavedNotes();
    this.setState(initialState);
  }

  componentDidUpdate(prevProps, prevState){
    let {route} = this.props.props;
    let {navigation} = this.props.props;
    
    if (route.params != undefined){
      let notes = route.params.notes !== undefined ? route.params.notes : [];
      if (notes.length > 0){
        navigation.setParams({notes: []});
        this.state.notes = notes;   
      }
    }
    saveNotes({notes: this.state.notes});
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
    var timeStamp = 
    `${timeFormat(curDate.getHours())}` 
    + `:${timeFormat(curDate.getMinutes())}`
    + ` ${timeFormat(curDate.getDate())}.`
    + `${timeFormat(curDate.getMonth()+1)}.` 
    + `${timeFormat(curDate.getFullYear())}`;

    var newNoteItem = new NoteItem(id, `Note #${this.state.notes.length+1}`, lorem, timeStamp);
    var newData = [...this.state.notes , newNoteItem];

    this.setState({notes: newData});
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
    const {navigation} = this.props.props;
    navigation.navigate('Editor', { notes: this.state.notes , item})
  };

  deleteItem = (item) => {
    var foundIndex = this.state.notes.findIndex((entry) => (entry.id === item.id));

    if (foundIndex != undefined) { 
      var newData = [...this.state.notes];
      newData.splice(foundIndex, 1);

      this.setState({notes: newData});
      saveNotes({notes: this.state.notes});
    }
    else{
      console.log('should be deleted!')
    }
  }

  Item = ({ item }) => (  
    <View style={styles.item}>
      <View style={styles.note_toolbar}>
        <TouchableOpacity style={styles.tool_button} key="editButton" onPress={() => this.editItem(item)}>
            <Icon name="edit-2" size={25} color="black" thin={false}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tool_button} key="deleteButton" onPress={() => this.deleteItem(item)}>
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
          renderItem={({ item }) => <this.Item item={item}/>}
          keyExtractor={item => item.key}
          getItemCount={this.getItemCount}
          getItem={this.getItem}
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => { navigation.navigate('Editor', {notes: notes})}}
          onLongPress={() => this.addItem()}
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

