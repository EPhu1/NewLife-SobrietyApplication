import React, {useEffect, useState} from 'react';
import { Image, AsyncStorage, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getMyTime } from '../functions/informationFunctions';
import { FAB, Button, TextInput, Card, Title, Paragraph } from 'react-native-paper';
import ProgressCircleRow from '../components/ProgressCircleRow'
import { FontAwesome5, Entypo } from '@expo/vector-icons'; 
import { LinearGradient } from 'expo-linear-gradient';

// {(new Date(parseInt(originDate))).toLocaleDateString()}
const Home = ({navigation}) => {
    //IMPORTANT: Need to use JSON.stringify and JSON.parse when using non string objects for Async Storage. Then we have to do the same for Redux.
    const {isNewUser, name, weeklyVolumeIntake, originDate, streakTimer, alcoholWeeklySpenditure, beveragesConsumed} = useSelector((state) => state)
    const dispatch = useDispatch();    
    const [newDate, setNewDate] = useState(new Date())
    let timerData = {days: '', hours: '', minutes: '', seconds: ''}
    timerData = getMyTime((newDate - streakTimer)/ 1000) //we can do math operations to Date() with either ints or strings and it will return as a number.
    
    const load = async (key, action) => { 
        try{
            let value = await AsyncStorage.getItem(key)
            if(value !== null){
                if(action == 'ALCOHOLOPTIONS' || action == 'ALCOHOLQUANTITY'){ //SHOULDVE DONE THIS SOONER: We do this so alcoholOptions in store is not a string.
                    dispatch({type: action, payload: JSON.parse(value)})
                }
                else{
                    dispatch({type: action, payload: value})
                }
            }
        }
        catch (err) {
            alert(err)
        }
    }

    useEffect(() => {
        load('MyIsNewUser', 'NEWUSER');
        load('MyName', 'NAME');
        load('MyWeeklyVolumeIntake', 'INTAKEVOLUME');
        load('MyOriginDate', 'SETORIGINDATE');
        load('MyStreakTimer', 'SETSTREAKTIMER');
        load('MyAlcoholWeeklySpenditure', 'ALCOHOLSPENDITURE');
        load('MyBeveragesConsumed', 'BEVERAGESCONSUMED');
        // load('MyAlcoholOptions', 'ALCOHOLOPTIONS');
        // load('MyAlcoholQuantity', 'ALCOHOLQUANTITY');
    }, [])

    useEffect(() => {
        let timer = setInterval(() => { // when we update state, the whole app rerenders.
            setNewDate(new Date())
        },1000)
        return () => clearInterval(timer);
    }, []);
    
    // console.log(originDate, typeof(originDate))
    // console.log(streakTimer, originDate)
    // console.log('total time:', (newDate - originDate) / 1000, 'seconds.')
    // console.log(((newDate - streakTimer )/ 1000))

    return(
        
        <View style = {styles.root}>
            {/* <Text>MyIsNewUser: {isNewUser}, MyName: {name}, weeklyVolumeIntake: {weeklyVolumeIntake},</Text> */}
           
            {JSON.parse(isNewUser) == true? 
            // {1 == 1?
                <LinearGradient 
                    style = {styles.container}
                    // colors = {['#72a8fe', '#76c2a5']}
                    colors = {['#72a8fe', '#ccccff']}
                >
                    <Text style = {styles.welcomeText}>Welcome</Text>
                    <View style = {styles.imageContainer}>
                        <Image
                            style = {styles.imageStyle}
                            source= {require('../../assets/welcomeTransparent.png') }
                        />
                    </View>
                    <Button labelStyle = {{fontFamily: 'sans-serif', fontSize: 18}} uppercase = {false} mode="contained" theme = {{colors: {primary: "#3385ff"}}} 
                        style = {styles.getStartedButton}
                        onPress={() => navigation.navigate('Information')}>
                        Get Started!
                    </Button>
                </LinearGradient>
                :
                <LinearGradient 
                    style = {styles.container}
                    // colors = {['#72a8fe', '#76c2a5']}
                    colors = {['#72a8fe', '#ccccff']}
                >
                    <View style = {styles.headingContainer}>
                        {/* <Text style = {styles.greetingText}>Hello {name}!</Text> */}
                        <Text style = {styles.heading}>You have been sober for</Text>
                        <Text style = {styles.daysText}>{timerData.days} Days</Text>
                        <ProgressCircleRow hours = { timerData.hours } minutes = {timerData.minutes} seconds = {timerData.seconds}/>
                        
                    </View>
                    <View style = {styles.contentContainer}>
                        <View style = {styles.contentItemContainer}>
                            <View style = {styles.contentIconContainer}>
                                <Image
                                    style = {styles.iconStyle}
                                    source= {require('../../assets/cupcakeTransparent.png') }
                                />
                            </View>
                            {((newDate).valueOf() - (new Date(parseInt(originDate))).valueOf()) <= (24 * 60 * 60 * 1000)? 
                                <Text>This is the first day of your new healthy life!</Text>
                                :
                                <Text>You began your new healthy life on {(new Date(parseInt(originDate))).toLocaleDateString()}.</Text>
                            }
                        </View>
                        <View style = {styles.contentItemContainer}>
                            <View style = {styles.contentIconContainer}>
                                <Image
                                    style = {{...styles.iconStyle, height: 65, width: 65}}
                                    source= {require('../../assets/mediumsojuTransparent.png') }
                                />
                            </View>
                            <Text style = {{flex: 1, flexWrap: 'wrap'}}>You've had {beveragesConsumed} beverages since {(new Date(parseInt(originDate))).toLocaleDateString()}.</Text>
                        </View>
                        <View style = {styles.contentItemContainer}>
                            <View style = {styles.contentIconContainer}>
                                <Image
                                    style = {{...styles.iconStyle, height: 50, width: 50}}
                                    source= {require('../../assets/piggyTransparent.png') }
                                />
                            </View>
                            <Text>You've saved ${((alcoholWeeklySpenditure / (7 * 24 * 60 * 60)) * ((newDate - streakTimer ) / 1000)).toFixed(2)} so far!</Text>
                        </View>
                        <View style = {styles.contentItemContainer}>
                            <View style = {styles.contentIconContainer}>
                                <Image
                                    style = {{...styles.iconStyle, height: 45, width: 45, marginTop: 8}}
                                    source= {require('../../assets/heart.png') }
                                />
                            </View>
                        <Text style = {{flex: 1, flexWrap: 'wrap'}}>You've avoided {(+weeklyVolumeIntake * (timerData.days / 7)).toFixed(2)} servings of alcohol, which is approximately {((+weeklyVolumeIntake * (timerData.days / 7.00)) * 140 )} calories of beer.</Text>
                        </View>
                    </View>

                    {/* <Text>Sober Streak ({timerData.days}:{timerData.hours}:{timerData.minutes}:{timerData.seconds})</Text> */}
                    {/* <Card style = {styles.quoteContainerStyle}>
                        <Text style = {styles.quoteStyle}>"It does matter how ugly you are because you're ugly."</Text>
                    </Card> */}
                    <FAB
                        style={styles.fabEdit}
                        small
                        icon="lead-pencil"
                        onPress={() => navigation.navigate('Information')}
                        theme = {{colors: {accent: "#1a75ff"}}}
                    />
                    <FAB
                        style={styles.fabAdd}
                        small
                        icon="glass-mug"
                        onPress={() => navigation.navigate('LogIntake')}
                        theme = {{colors: {accent: "#1a75ff"}}}
                    />
                </LinearGradient>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#CED3D3',
    },
    container: {
        flex: 1,
    },
    welcomeText: {
        textAlign: 'center',
        color: 'white',
        fontFamily: 'sans-serif',
        fontSize: 35, 
        marginTop: 50,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '50%',
        marginVertical: 10,
    },
    imageStyle: {
        width: 400,
        height: 400, 
        borderWidth: 1,
        borderRadius: 150
    },
    getStartedButton: {
        marginHorizontal: 120,
    },
    headingContainer: {
        height: '40%',
        marginBottom: 50,
    },
    heading: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'sans-serif',
        color: 'white',
        marginTop: 25
    },
    daysText: {
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'sans-serif',
        color: 'white',
        marginTop: 5,
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1
    },  
    greetingText: {
        marginHorizontal: 10,
        marginTop: 10,
        color: 'white',
        fontSize: 25,
        fontFamily: 'sans-serif',
        textAlign: 'center'
    },
    contentContainer: {
        borderRadius: 20,
        margin: 5,
    },
    contentItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: 5,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: 'white'
    },
    contentIconContainer: {
        borderColor: 'black', 
        borderWidth: 1, 
        width: 55,
        height: 55,
        borderRadius: 50, 
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    iconStyle: {
        height: 75,
        width: 75
    },
    fabAdd: {
        position: 'absolute',
        margin: 16,
        left: 0,
        bottom: 0,
    },
    fabEdit: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    quoteContainerStyle: {
        width: '100%',
        height: 60,
        borderRadius: 50,
        position: 'absolute',
        bottom: 2,
        margin: 5,
        backgroundColor: 'white'
    },
    quoteStyle: {
        // borderColor: 'green',
        // borderWidth: 1,
        marginHorizontal: 60,
        marginTop: 5
    }
});

export default Home;