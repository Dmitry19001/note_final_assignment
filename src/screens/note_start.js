import { View, Text, Button } from "react-native"

import i18n from '../i18n';
import React from "react";

class StartScreen extends React.Component {
    static navigationOptions = {
        title: i18n.t('appName')
    };

    render(){
        const { navigation } = this.props;
        return (
            <View>
                {/* {screens.map((s) => <Button key={s.name} title={s.name} onPress={() => navigation.navigate(s.name)}></Button>)} */}
                <Button key={"my_notes"} title={i18n.t('navigation.my_notes')} onPress={() => navigation.navigate('Container')}></Button>
                <Button key={'Settings'} title={i18n.t('navigation.settings')} onPress={() => navigation.navigate('Settings')}></Button>
            </View>
        );
    }
}

export default StartScreen;