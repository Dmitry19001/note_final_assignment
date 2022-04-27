import Start from "./note_start";
import Editor from "./note_editor";
import Container from "./note_container";


export const start_screen = {
    name: 'Start',
    component: Start
}

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
    // {
    //     name: 'Settings',
    //     component: Settings
    // },
]