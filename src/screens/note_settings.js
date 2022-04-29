import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-feather1s";
import {noteItem} from '../components/noteItem'
import database from "../utils/data";

export default ({navigation}) => {
    
    return (
    <View style={styles.item}>

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
})