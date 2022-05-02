import React, {useEffect} from "react";
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { useNavigationState } from "@react-navigation/core";

import i18n from '../i18n';
import colors from '../config.js/colors';
import { loadSettings } from '../storage/settingsStorage';

class StartScreen extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {locale: 'en'};
    }

    async componentDidMount(){
        const initialState = await loadSettings();
        i18n.locale = initialState.locale;
        this.setState(initialState);
        console.log(`Localization loaded: ${i18n.locale}`);
    }

    render(){
        const {navigation} = this.props.props;
        console.log(this.props.props);
        return (
            <View>
                {/* {screens.map((s) => <Button key={s.name} title={s.name} onPress={() => navigation.navigate(s.name)}></Button>)} */}
                <TouchableOpacity style={styles.menuButton} key={"my_notes"} onPress={() => navigation.navigate('Container')}>
                    <Text style={styles.menuButtonText}>{i18n.t('navigation.my_notes')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} key={'settings'} onPress={() => navigation.navigate('Settings')}>
                    <Text style={styles.menuButtonText}>{i18n.t('navigation.settings')}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default function(props){
    const {navigation} = props;
    const navigationState = useNavigationState((state) => state);

    useEffect(() => {
        //console.log('[START] State changed!');
        navigation.setOptions({title: i18n.t('appName')});
    } , [navigationState])

    return (
        <StartScreen props={props}/>
    )
};

const styles = StyleSheet.create({
    menuButton: {
      backgroundColor: colors.primary,
      margin: 5,
      borderRadius: 10
    },
    menuButtonText: {
      color: colors.bright,
      fontSize: 30,
      textAlign: 'center',
      padding: 10
    }
  })