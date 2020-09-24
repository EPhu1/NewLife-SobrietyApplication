import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

const ProgressCircleRow = ({hours, minutes, seconds}) => {
    return(
        <View style = {styles.containerStyle}>
            <ProgressCircle
                percent={hours * 100 / 24}
                radius={50}
                borderWidth={8}
                color="#33ccff"
                // shadowColor="#999"
                shadowColor="#575786"
                bgColor="#fff"
            >
                <Text style={styles.textStyle}>{hours}</Text>
                <Text style = {{fontSize: 15}}>Hours</Text>
            </ProgressCircle>
            <ProgressCircle
                percent={minutes * 100 / 60}
                radius={50}
                borderWidth={8}
                color="#33ccff"
                shadowColor="#575786"
                bgColor="#fff"
            >
                <Text style={styles.textStyle}>{minutes}</Text>
                <Text style = {{fontSize: 15}}>Minutes</Text>
            </ProgressCircle>
            <ProgressCircle
                percent={seconds * 100 / 60}
                radius={50}
                borderWidth={8}
                color="#33ccff"
                shadowColor= '#575786'
                bgColor="#fff"
            >
                <Text style={styles.textStyle}>{seconds}</Text>
                <Text style = {{fontSize: 15}}>Seconds</Text>
            </ProgressCircle>
        </View>
    )
}
const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },
    textStyle: {
        fontSize: 25
    }
});

export default ProgressCircleRow;