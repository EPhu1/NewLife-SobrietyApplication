import { ActionSheetIOS } from "react-native"

const initialState = { //IMPORTANT: These values become strings because AsyncStorage saves them as string and we dispatch them as string.
    isNewUser: true,   
    name: '',
    originDate: (new Date()).valueOf(), // this is the date in miliseconds when the user first makes a profile (stays constant)
    streakTimer: (new Date()).valueOf(), //this is the date in miliseconds since the user has abstained from alcohol. (can reset)
    weeklyVolumeIntake: '',
    alcoholWeeklySpenditure: '', //how much money spent on alcohol per week
    beveragesConsumed: '', //beverages consumed in LogIntake. 
    alcoholOptions: [],
    alcoholQuantity: [0, 0], // [beer, soju]
}

export const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEWUSER':
            return {...state, isNewUser: action.payload}
        case 'NAME':
            return {...state, name: action.payload}
        case 'INTAKEVOLUME':
            return {...state, weeklyVolumeIntake: action.payload}
        case 'SETORIGINDATE':
            return {...state, originDate: action.payload}
        case 'SETSTREAKTIMER':
            return {...state, streakTimer: action.payload}
        case 'ALCOHOLSPENDITURE':
            return {...state, alcoholWeeklySpenditure: action.payload}
        case 'BEVERAGESCONSUMED':
            return {...state, beveragesConsumed: action.payload}
        case 'ALCOHOLOPTIONS':
            return {...state, alcoholOptions: action.payload}
        case 'ALCOHOLQUANTITY':
            return {...state, alcoholQuantity: action.payload}
        default:
            return state;
    }
}