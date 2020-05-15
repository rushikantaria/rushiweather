import React, {useState} from 'react';
import { StyleSheet, TextStyle, Text, View, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


const fetchFonts = () => {
return Font.loadAsync({
'indieflower-regular': require('../.././assets/font/IndieFlower-Regular.ttf')
});
};


export default function Home({ navigation }) {
  const[dataLoaded, setDataLoaded] = useState(false);
   if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }
  return (

    <View style={styles.container}>
      <LinearGradient
          colors={['#0aa1ff', '#a8deff']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%'
          }}
        />
        <Text style={headingStyle}> Welcome to weather app</Text>
        <Button ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['blue', 'grey'],
          start: { x: 0, y: 0.5 },
          end: { x: 1, y: 0.5 },
        }} 
          onPress={() => navigation.navigate('Weather')}
          title="Next Page"
        />
    </View>
  
  );
}

const headingStyle: TextStyle = {
  fontFamily: "indieflower-regular",
  fontSize: 30,
  justifyContent: 'center',
  alignItems: 'center'

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});