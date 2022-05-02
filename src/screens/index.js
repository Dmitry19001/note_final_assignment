import StartScreen from "./StartScreen";
import Editor from "./EditorScreen";
import Container from "./NoteContainerScreen";
import Settings from "./SettingsScreen"
import LanguageSelectorScreen from "./LanguageSelectionScreen";

export const screens = [
    {
        name: 'Start',
        component: StartScreen
    },
    {
        name: 'Editor',
        component: Editor
    },
    {
        name: 'Container',
        component: Container
    },
    {
        name: 'Settings',
        component: Settings
    },
    {
        name: 'Languages',
        component: LanguageSelectorScreen
    },
    // {
    //     name: 'Settings',
    //     component: Settings
    // },
]