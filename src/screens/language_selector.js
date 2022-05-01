import React from 'react';
import { View } from 'react-native';

import i18n from '../i18n';

import LanguageListItem from '../components/LanguageListItem';

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
  static navigationOptions = {
    title: i18n.t('settings.display_language')
  };

  render() {
    const { navigation } = this.props;
    const { route } = this.props;
    console.log("Language selector:");
    console.log(route);

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
              onChangeLocale={(locale) => navigation.navigate('Settings', { locale })}
            />
          ))
        }
      </View>
    );
  }
}

export default LanguageSelectorScreen;