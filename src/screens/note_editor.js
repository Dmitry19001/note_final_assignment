import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-feather1s";
import {NoteItem} from '../components/noteItem'
import database from "../utils/data";

import i18n from '../i18n';

export default ({navigation, route}) => {
    let title = '';
    let text = '';

    const saveToDatabase = () => {
        if (route != undefined){
            //EDIT scenario
            console.log(route.params);

            var id = route.params.id;
            var created = route.params.createdDate;
            
            //Checking if title needs to be updated
            title = title.length < 1? route.params.title : title;
            //Checking if text needs to be updated
            text = text.length < 1? route.params.text : text;

            //TODO: replacing old noteItem with new one!

            console.log(`route found:[${id}] title: ${title} text:${text} created: ${created}`);
        }
        else{
            //ADD NEW scenario
            var id = Math.random().toString(12);
            id = id.substring(2, id.length - 2);
    
            var curDate = new Date();
    
            let nItem = new NoteItem(id, title, text, `${curDate.getDate()}.${curDate.getMonth()+1}.${curDate.getFullYear()}`)
            
            alert(`[${nItem.id}]${nItem.name} ${nItem.text}`);
            console.log(database.dataArray);
            if (true){
    
                console.log('new item added from editor!');
    
                navigation.navigate("Container");
                return;
            }
            console.log('Something wrong!');
        }

    }

    return (
    <View style={styles.item}>
        {console.log(route.params)}
        <View style={styles.note_toolbar}>
            <TouchableOpacity style={styles.tool_button} key="editButton" onPress={() => saveToDatabase()}>
                <Icon name="save" size={22} color="black" thin={false}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tool_button} key="deleteButton" onPress={() => navigation.navigate("Start")}>
              <Icon name="trash-2" size={22} color="red" thin={false}/>
            </TouchableOpacity>
        </View>
        <TextInput 
            placeholder="Enter your title here..." 
            style={styles.title} 
            onChangeText={(value) => title = value}
            defaultValue={route.params.title}
        />
        <TextInput 
            multiline={true} 
            placeholder="Enter your note here..." 
            style={styles.editorField} 
            onChangeText={(value) => text = value}
            defaultValue={route.params.text}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#F8F818',
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
        opacity: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
})