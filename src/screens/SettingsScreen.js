import React, {useState, useEffect, Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} 
from 'react-native';

import { useNavigationState } from "@react-navigation/core";

import colors from '../config/colors';
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
    i18n.locale = initialState.locale;
    this.setState(initialState);
  }

  componentDidUpdate(prevProps, prevState) {
    const locale = this.props.props.route.params != undefined? this.props.props.route.params.locale : undefined;

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
    const {navigation} = this.props.props;
    const currentLocale = this.state.locale;

    return(
      <View>
        <TouchableOpacity style={styles.settingButton} key={'Languages'} onPress={() => navigation.navigate('Languages', {title: i18n.t('navigation.languages'), currentLocale})}>
          <Text style={styles.settingButtonText}>{i18n.t('settings.display_language')}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default function(props){
  const {navigation} = props;
  const navigationState = useNavigationState((state) => state);
  
  useEffect(() => {
      navigation.setOptions({title: i18n.t('navigation.settings')});
  } , [navigationState])

  return(
    <Settings props={props}/>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45
  },
  inputContainer: {
    paddingTop: 15
  },
  settingButton: {
    backgroundColor: colors.primary,
    margin: 5,
    borderRadius: 10
  },
  settingButtonText: {
    color: colors.bright,
    fontSize: 30,
    textAlign: 'center',
    padding: 10
  }
});