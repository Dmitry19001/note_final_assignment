import Start from "./note_start";
import Editor from "./note_editor";
import Container from "./note_container";
import Settings from "./note_settings"
import LanguageSelectorScreen from "./language_selector";
import i18n from '../i18n';

export const screens = [
    {
        name: 'Start',
        component: Start,
        title: i18n.t('appName')
    },
    {
        name: 'Editor',
        component: Editor,
        title: i18n.t('navigation.note_editor')
    },
    {
        name: 'Container',
        component: Container,
        title: i18n.t('navigation.my_notes')
    },
    {
        name: 'Settings',
        component: Settings,
        title: i18n.t('navigation.settings')
    },
    {
        name: 'Languages',
        component: LanguageSelectorScreen,
        title: i18n.t('navigation.languages')
    },
    // {
    //     name: 'Settings',
    //     component: Settings
    // },
]