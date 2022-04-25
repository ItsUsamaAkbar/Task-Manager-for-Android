import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Main from './Main';
import {createStackNavigator, createAppContainer} from 'react-navigation';

function Home(props) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={{alignItems: 'center'}}>
          <Image
            style={{height: 160, width: 260}}
            source={require('./Assets/Getstart.jpg')}
          />
        </View>
        <View style={styles.Heading}>
          <Text style={{textAlign: 'center', padding: 15, fontSize: 25}}>
            Manage and Priotrize Your Task Easily
          </Text>
          <Text style={{textAlign: 'center', fontSize: 15}}>
            Increase Your productivity by managing your personal and team task
            and do them based on the highest priority
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 15}}>
          <Button
            style={{alignItems: 'center', marginTop: 15}}
            title="Get Started"
            onPress={() => props.navigation.push('LoginRoute')}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Button: {
    alignItems: 'center',
    marginTop: 15,
  },
  Heading: {
    paddingLeft: 50,
    paddingRight: 50,
    alignItems: 'center',
  },
});
export default Home;
