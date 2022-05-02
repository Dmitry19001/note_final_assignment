import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'NOTES';

const DEFAULT_SETTINGS = {
  notes: []
};

export const loadSavedNotes = async () => {
  try {
    let notes = await AsyncStorage.getItem(STORAGE_KEY);

    if (notes === null) { return DEFAULT_SETTINGS; }

    return JSON.parse(notes);
  } catch (error) {
    console.log('Error loading notes', error);
  }
}

export const saveNotes = (notes) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}