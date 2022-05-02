import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-feather1s";
import {NoteItem} from '../components/noteItem'
import database from "../utils/data";
import { useNavigationState } from "@react-navigation/core";
import React, {useEffect} from "react";

import i18n from '../i18n';
import colors from "../config/colors";

class NoteEditor extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {title: '', text: ''};
    }

    saveToDatabase = (navigation, route) => {
        if (route.params.title != undefined){
            //EDIT scenario
            console.log(route.params);

            var id = route.params.id;
            var created = route.params.createdDate;
            
            //Checking if title needs to be updated
            this.state.title = this.state.title.length < 1? route.params.title : this.state.title;
            //Checking if text needs to be updated
            this.state.text = this.state.text.length < 1? route.params.text : this.state.text;

            //TODO: replacing old noteItem with new one!

            console.log(`route found:[${id}] title: ${this.state.title} text:${this.state.text} created: ${created}`);
        }
        else{
            //ADD NEW scenario
            var id = Math.random().toString(12);
            id = id.substring(2, id.length - 2);
    
            var curDate = new Date();
            var timeStamp = `${curDate.getHours()}:${curDate.getMinutes()} ${curDate.getDate()}.${curDate.getMonth()+1}.${curDate.getFullYear()}`;
            let nItem = new NoteItem(id, this.state.title, this.state.text, timeStamp)
            
            //alert(`[${nItem.id}]${nItem.name} ${nItem.text}`);
            
            var data = route.params.notes !== undefined ? route.params.notes : [];

            data = [...data, nItem];        

            //console.log("sending data");
            //console.log(data);

            if (data.length > 0){
    
                //console.log('items are sent to container!');
    
                navigation.navigate("Container", {notes: data});
                return;
            }
            console.log('Something wrong!');
        }

    };

    render() {
        const {navigation} = this.props.props;
        const {route} = this.props.props;

        //navigation.setOptions({title: i18n.t('navigation.languages')});

        return (
            <View style={styles.item}>              
                {console.log('Routes')}
                {console.log(route)}
                <View style={styles.note_toolbar}>
                    <TouchableOpacity style={styles.tool_button} key="saveButton" onPress={() => this.saveToDatabase(navigation, route)}>
                        <Icon name="save" size={25} color="black" thin={false}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tool_button} key="deleteButton" onPress={() => navigation.navigate("Start")}>
                      <Icon name="x" size={25} color="red" thin={false}/>
                    </TouchableOpacity>
                </View>
                <TextInput 
                    placeholder={i18n.t('note_editor.note_title_placeholder')}
                    style={styles.title} 
                    onChangeText={(value) => this.state.title = value}
                    defaultValue={route.params.title !== undefined ? route.params.title : ''}
                />
                <TextInput 
                    multiline={true} 
                    placeholder={i18n.t('note_editor.note_text_placeholder')}
                    style={styles.editorField} 
                    onChangeText={(value) => this.state.text = value}
                    defaultValue={route.params.text !== undefined ? route.params.text : ''}
                />
            </View>
        );
    }
}

export default function(props) {    
    const {navigation} = props;
    const navigationState = useNavigationState((state) => state);
  
    useEffect(() => {
      navigation.setOptions({title: i18n.t('navigation.my_notes')});
    } , [navigationState])
  

    return (
        <NoteEditor props={props}/>
    )
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.secondary,
        marginVertical: 8,
        marginHorizontal: 12,
        padding: 20,
        minHeight: 200,
    },
    editorField:{
        marginVertical: 8,
        minHeight: 150,
    },
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
    dateCreated: {
        fontSize: 10,
        color: colors.dark,
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
        opacity: 1,
        padding: 10,
        backgroundColor: colors.bright,
        borderRadius: 100,
    },
})