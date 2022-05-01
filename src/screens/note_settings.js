import React, {useState, Component} from 'react';
import {
  Keyboard,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button} from 'react-native';

import i18n from '../i18n';

import { loadSettings, saveSettings } from '../storage/settingsStorage';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {locale: 'en'};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    const initialState = await loadSettings();
    console.log(`Setting component mounted:`)
    console.log( initialState);
    this.setState(initialState);
  }

  componentDidUpdate(prevProps, prevState) {
    const locale = this.props.route.params != undefined? this.props.route.params.locale : undefined;
    console.log(locale);
    if (locale != undefined && locale && prevState.locale !== locale) {
      i18n.locale = locale;
      this.setState({ locale });
      this.handleSubmit();
    }
  }


  handleSubmit() {
    saveSettings(this.state);
  }

  render(){
    const currentLocale = this.state.locale;
    const { navigation } = this.props;

    return(
      <View>
        <Button key={'Languages'} title={i18n.t('settings.display_language')} onPress={() => navigation.navigate('Languages', {currentLocale})}></Button>
      </View>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  }
});