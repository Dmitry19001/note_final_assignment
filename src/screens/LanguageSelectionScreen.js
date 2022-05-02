import React from 'react';
import { View } from 'react-native';

import i18n from '../i18n';

import LanguageListItem from '../components/LanguageListItem';
import { StackActions } from '@react-navigation/native';

const languages = [
  {
    locale: 'en',
    name: 'English'
  },
  {
    locale: 'fi',
    name: 'Suomi',
    englishName: 'Finnish'
  },
  {
    locale: 'ru',
    name: 'Русский',
    englishName: 'Russian'
  }
];

class LanguageSelectorScreen extends React.Component {
  // static navigationOptions = {
  //   title: i18n.t('settings.display_language')
  // };

  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    const currentLocale = route.params.currentLocale;

    return (
      <View style={{ marginTop: 15 }}>
        {
          languages.map((language) => (
            <LanguageListItem
              key={language.locale}
              isActive={language.locale === currentLocale}
              locale={language.locale}
              name={language.name}
              englishName={language.englishName}
              onChangeLocale={(locale) => navigation.navigate('Settings', { locale, title: i18n.t('navigation.settings') })}
            />
          ))
        }
      </View>
    );
  }
}

export default LanguageSelectorScreen;