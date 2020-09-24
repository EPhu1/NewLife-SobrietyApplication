import React, { useState, useEffect } from 'react';
import { Image, AsyncStorage, StyleSheet, Text, View, Alert} from 'react-native';
import { Button, TextInput, Card, HelperText } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { save } from '../functions/asyncStorageFunctions';
import { LinearGradient } from 'expo-linear-gradient';

const LogIntakeScreen = ({navigation}) => {
    const {isNewUser, name, originDate, streakTimer, weeklyVolumeIntake, beveragesConsumed } = useSelector((state) => state)
    const dispatch = useDispatch();   
    const [beverageInput, setBeverageInput] = useState('');

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

    const hasErrors = () => {
        const invalidInputs = ['-', ',', '.', '+', '_', ' ']
        if(parseInt(beverageInput) <= 0){
            return true
        }
        for(let i = 0; i < invalidInputs.length; i++){
            if(beverageInput.includes(invalidInputs[i])){
                return true
            }
        }
        return false
    };
    
    // console.log(Number.isInteger(parseFloat('2,5')))

    return(
        <LinearGradient 
            style = {styles.root}
            // colors = {['#72a8fe', '#76c2a5']}
            colors = {['#72a8fe', '#ccccff']}
        >
            <View style = {styles.imageContainer}>
                <Image
                    style = {styles.imageStyle}
                    source= {require('../../assets/soju3Transparent.png') }
                    
                />
            </View>
            <TextInput
                
                style = {styles.inputStyle}
                keyboardType = 'number-pad'
                label="How many alcoholic beverages did you consume?"
                value={beverageInput}
                onChangeText={beverageInput => setBeverageInput(beverageInput)}
                theme = {{colors: {primary: "blue"}}}
                mode = 'outlined'
            />
            <HelperText type="error" visible={hasErrors()} style = {styles.helperTextStyle}>
                Enter a positive integer (Example: 10)
            </HelperText>
            
            
            <Button labelStyle = {{fontFamily: 'sans-serif'}} uppercase = {true} icon = 'check' mode={'contained'} theme = {{colors: {primary: "#1a75ff"}}} 
                disabled = { beverageInput == '' ? true : hasErrors() }
                style = {styles.buttonStyle}
                onPress={() => {
                    Alert.alert(
                        'Is this information correct?',
                        'Confirming will reset your sober streak and add to your beverage count.',
                        [
                            {
                              text: "Cancel",
                              onPress: () => console.log("Cancel Pressed"),
                              style: "cancel"
                            },
                            { text: "OK", onPress: () => {
                                save('MyBeveragesConsumed', (+beveragesConsumed + +beverageInput).toString())
                                dispatch({type: 'BEVERAGESCONSUMED', payload: (+beveragesConsumed + +beverageInput).toString()})
                                save('MyStreakTimer', JSON.stringify((new Date()).valueOf()))
                                dispatch({ type: 'SETSTREAKTIMER', payload: new Date().valueOf()})
                                navigation.navigate('Home')
                            }}
                          ],
                    )
                }}>
                Confirm
            </Button>
            
            {/* <Button icon="restart" mode="contained" theme = {{colors: {primary: "blue"}}} 
                onPress = {() => {
                    save('MyBeveragesConsumed', '0')
                    dispatch({ type: 'BEVERAGESCONSUMED', payload: '0'})
                }}>
                Reset beveragesConsumed (DT)
            </Button> */}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '55%'
    },
    imageStyle: {
        width: 250,
        height: 250, 
    },
    buttonStyle: {
        marginHorizontal: 5, 
    },
    inputStyle: {
        marginHorizontal: 5, 
    },
    helperTextStyle: {
        marginBottom: 10,
    }
})

export default LogIntakeScreen;