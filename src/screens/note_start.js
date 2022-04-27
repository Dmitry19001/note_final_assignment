import { View, Text, Button } from "react-native"
import {screens} from "./"

export default ({ navigation }) => {
    return (
    <View>
        <Text>Hello screen</Text>
        {/* {screens.map((s) => <Button key={s.name} title={s.name} onPress={() => navigation.navigate(s.name)}></Button>)} */}
        <Button key={"Start"} title={"Start"} onPress={() => navigation.navigate("Container")}></Button>
    </View>
    );
}

