import React, { useState, useEffect } from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { save } from '../functions/asyncStorageFunctions';
import { LinearGradient } from 'expo-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const InformationScreen = ({navigation}) =>{ 
    const {isNewUser, name, weeklyVolumeIntake, alcoholWeeklySpenditure, alcoholOptions, alcoholQuantity} = useSelector((state) => state)
    const dispatch = useDispatch();   
    
    const defaultEnable = () => {
        if(JSON.parse(isNewUser) == true){
            return true
        }
        return false
    }

    const [enableEdit, setEnableEdit] = useState(JSON.parse(isNewUser) == true);
    const [beerCount, setBeerCount] = useState(alcoholQuantity[0].toString())
    const [sojuCount, setSojuCount] = useState(alcoholQuantity[1].toString())
    
    const remove = async (key, action) => {
        try{
            await AsyncStorage.removeItem(key);
        }
        catch(err){
            alert(err);
        }
        finally{
            dispatch({ type: action, payload: ''})//need to do this to immediately remove the state without refreshing
        }
    }

    const load = async (key, action) => { 
        try{
            let value = await AsyncStorage.getItem(key)
            if(value !== null){
                dispatch({type: action, payload: value})
            }
        }
        catch (err) {
            alert(err)
        }
    }

    // useEffect(() => {
    //     load('MyName', 'NAME');
    //     load('MyWeeklyVolumeIntake', 'INTAKEVOLUME');
    //     load('MyIsNewUser', 'NEWUSER');
    // }, [])

    // console.log('alcoholOptions: ', alcoholOptions )
    return(
        <LinearGradient 
            style = {styles.root}
            // colors = {['#72a8fe', '#76c2a5']}
            colors = {['#72a8fe', '#ccccff']}
        >
            {enableEdit ? 
                <View>
                {JSON.parse(isNewUser) == true? <Text style = {{marginTop: 5, marginLeft: 10}}>Please Answer These Questions</Text> : <Text style = {{marginTop: 5, marginLeft: 10}}>Changes are automatically saved.</Text> }
                <TextInput
                    style = {styles.textInputStyle}
                    label="Name"
                    value={name}
                    onChangeText={name => {
                        dispatch({type: 'NAME', payload: name})
                        save('MyName', name)
                }}
                    theme = {{colors: {primary: "blue"}}}
                    mode = 'outlined'
                />
                <TextInput
                    style = {styles.textInputStyle}
                    keyboardType = 'number-pad'
                    label="How many alcoholic servings per week?"
                    value={weeklyVolumeIntake}
                    onChangeText={weeklyVolumeIntake => {
                        dispatch({ type: 'INTAKEVOLUME', payload: weeklyVolumeIntake })
                        save('MyWeeklyVolumeIntake', weeklyVolumeIntake)
                    }}
                    theme = {{colors: {primary: "blue"}}}
                    mode = 'outlined'
                />
                <TextInput
                    keyboardType = 'number-pad'
                    style = {styles.textInputStyle}
                    label="How much do you spend on alcohol per week?"
                    value={alcoholWeeklySpenditure}
                    onChangeText={alcoholWeeklySpenditure => {
                        dispatch({ type: 'ALCOHOLSPENDITURE', payload: alcoholWeeklySpenditure })
                        save('MyAlcoholWeeklySpenditure', alcoholWeeklySpenditure)
                    }}
                    theme = {{colors: {primary: "blue"}}}
                    mode = 'outlined'
                />
                {JSON.parse(isNewUser) == true? 
                    <Button style = {{marginHorizontal: 5, marginTop: 20}} icon="content-save" mode="contained" theme = {{colors: {primary: "#1a75ff"}}} 
                        onPress={() => {
                            // if(JSON.parse(isNewUser) == true){
                                save('MyOriginDate', JSON.stringify((new Date()).valueOf()))
                                dispatch({type: 'SETORIGINDATE', payload: (new Date()).valueOf()})
                                save('MyStreakTimer', JSON.stringify((new Date()).valueOf()))
                                dispatch({type: 'SETSTREAKTIMER', payload: (new Date()).valueOf()})
                            // }
                            save('MyIsNewUser', JSON.stringify(false))
                            // save('MyName', name)
                            // save('MyWeeklyVolumeIntake', weeklyVolumeIntake)
                            // save('MyAlcoholWeeklySpenditure', alcoholWeeklySpenditure)
                            dispatch({ type: 'NEWUSER', payload: false})
                            navigation.navigate('Home')
                        }}>
                        Save and Continue
                    </Button>
                    :
                    <View style = {{flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
                        <Button icon="home" mode="contained" theme = {{colors: {primary: "#1a75ff"}}} 
                            onPress={() => {
                                navigation.navigate('Home')
                            }}>
                            Home
                        </Button>
                        <Button disabled = {true} style = {{elevation: 0}} icon="lead-pencil" mode="contained">
                            Edit
                        </Button>
                    </View>
                }
                </View>
            :
                <View>
                    <Text style = {{...styles.informationTextTitle, marginTop: 4}}>Name:</Text>
                    <View style = {styles.informationTextContainer}>
                        <Text style = {styles.informationText}>{name}</Text>
                    </View>
                    <Text style = {styles.informationTextTitle}>Alcoholic servings consumed per week:</Text>
                    <View style = {styles.informationTextContainer}>
                        <Text style = {styles.informationText}>{weeklyVolumeIntake}</Text>
                    </View>
                    <Text style = {styles.informationTextTitle}>Money spent on alcohol per week:</Text>
                    <View style = {styles.informationTextContainer}>
                        <Text style = {styles.informationText}>${alcoholWeeklySpenditure}</Text>
                    </View>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
                        <Button icon="home" mode="contained" theme = {{colors: {primary: "#1a75ff"}}} 
                            onPress={() => {
                                navigation.navigate('Home')
                            }}>
                            Home
                        </Button>
                        <Button icon="lead-pencil" mode="contained" theme = {enableEdit? {colors: {primary: "green"}} : {colors: {primary: "#1a75ff"}}} 
                            onPress = {() => {
                                setEnableEdit(true)
                            }}>
                            Edit
                        </Button>
                    </View>
                </View>
            }

            {/* <Button icon="restart" mode="contained" theme = {{colors: {primary: "blue"}}} 
                onPress = {() => {
                    save('MyIsNewUser', JSON.stringify(true))
                    dispatch({ type: 'NEWUSER', payload: true})
                }}>
                Reset New User (Debugging Tool)
            </Button>
            <Button mode="contained" theme = {{colors: {primary: "blue"}}} 
                onPress={() => {
                    let tempDate = new Date(2020, 8, 13) 
                    tempDate = tempDate.valueOf() // console.log(new Date() - 0, (new Date()).valueOf()) //These are the same ways to get the ms from a date.
                    save('MyOriginDate', JSON.stringify(tempDate))
                    dispatch({type: 'SETORIGINDATE', payload: tempDate})
                }}>
                Set OriginDate's MS (Debugging Tool)
            </Button>
            <Button mode="contained" theme = {{colors: {primary: "blue"}}} 
                onPress={() => {
                    let tempDate = new Date(2020, 8, 13) 
                    tempDate = tempDate.valueOf() // console.log(new Date() - 0, (new Date()).valueOf()) //These are the same ways to get the ms from a date.
                    save('MyStreakTimer', JSON.stringify(tempDate))
                    dispatch({type: 'SETSTREAKTIMER', payload: tempDate})
                }}>
                Set StreakTimer's MS (Debugging Tool)
            </Button>
            <Button icon="content-save" mode="contained" theme = {{colors: {primary: "blue"}}} 
                onPress={() => remove('MyName', 'NAME')}>
                Remove Function (Debugging Tool)
            </Button> */}
        </LinearGradient>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    textInputStyle: {
        marginHorizontal: 5,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    informationTextTitle: {
        marginLeft: 10,
        marginBottom: 2
    },
    informationTextContainer: {
        backgroundColor: 'white', 
        marginBottom: 10,
        marginHorizontal: 5,
        borderRadius: 5
    },
    informationText: {
        fontSize: 20,
        fontFamily: 'sans-serif',
        // marginHorizontal: 20
        marginVertical: 10,
        marginLeft: 10
    }
});

export default InformationScreen;