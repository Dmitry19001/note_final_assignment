import { View, Text, Button } from "react-native"
import {screens} from "./"

export default ({ navigation }) => {
    return (
    <View>
        {/* {screens.map((s) => <Button key={s.name} title={s.name} onPress={() => navigation.navigate(s.name)}></Button>)} */}
        <Button key={"my_notes"} title={"My Notes"} onPress={() => navigation.navigate('Container')}></Button>
        <Button key={'Settings'} title={"Settings"} onPress={() => navigation.navigate('Settings')}></Button>
    </View>
    );
}

