import Start from "./note_start";
import Editor from "./note_editor";
import Container from "./note_container";
import Settings from "./note_settings"

export const screens = [
    {
        name: 'Start',
        component: Start
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
    // {
    //     name: 'Settings',
    //     component: Settings
    // },
]