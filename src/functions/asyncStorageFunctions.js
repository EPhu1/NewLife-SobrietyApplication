//https://www.youtube.com/watch?v=PhhyBmAIehg

import { AsyncStorage } from 'react-native';

export const save = async (key, value) => {
    try{
        await AsyncStorage.setItem(key, value);
        // console.log(`Saved. Key: '${key}', Value: '${value}'`)
    }
    catch(err){
        alert(err);
    }
}
