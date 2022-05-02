import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import i18n from '../i18n';

import colors from '../config/colors';

class LanguageListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleLocaleChange = this.handleLocaleChange.bind(this);
  }

  handleLocaleChange() {
    //Checking if platform android or ios for Alert
    if (Platform.OS === "android" || Platform.OS ==="ios"){
      Alert.alert(
        i18n.t('language_list.change_language'),
        null,
        [
          {
            text: i18n.t('language_list.cancel'),
            style: 'cancel'
          },
          {
            text: i18n.t('language_list.ok'),
            onPress: () => this.props.onChangeLocale(this.props.locale),
            style: 'destructive'
          }
        ]
      )
    }
    else{
      this.props.onChangeLocale(this.props.locale);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => {this.handleLocaleChange()}}
      >
        <View style={styles.textWrapper}>
          <Text style={[
            styles.title, (this.props.isActive && styles.active)
          ]}>
            {this.props.name}
          </Text>
          {
            this.props.englishName &&
              <Text style={styles.subtitle}>{this.props.englishName}</Text>
          }
        </View>
        {
          this.props.isActive &&
            <Icon
              style={styles.active}
              name="ios-checkmark-circle-outline"
              size={30}
            />
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignItems: 'center',
    padding: 10
  },
  textWrapper: {
    width: '90%',
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    color: colors.darkest
  },
  subtitle: {
    color: colors.dark
  },
  active: {
    color: colors.primary
  }
});

export default LanguageListItem;