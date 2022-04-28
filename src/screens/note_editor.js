import { View, Text, TextInput, StyleSheet } from "react-native"

export default () => {
    return (
    <View style={{alignSelf:'stretch', justifyContent: 'space-around'}}>
        <TextInput multiline={true} placeholder="Enter your note here..." style={styles.editorField}></TextInput>
    </View>
    )
}

const styles = StyleSheet.create({
    editorField:{
        backgroundColor: '#F8F818',
        marginVertical: 8,
        marginHorizontal: 12,
        padding: 10,
        height: 300,
    },
})