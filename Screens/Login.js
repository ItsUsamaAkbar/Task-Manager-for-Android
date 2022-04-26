import {signInWithEmailAndPassword} from 'firebase/auth';
import React, {useState, Component, useEffect} from 'react';
import {auth} from '../firebase';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';
import {Divider} from 'react-native-paper';
import Main from './Main';
import Registration from './Registration';
function Login(props) {
  const [email, setEmail] = useState('usama@gmail.com');
  const [uid, setUID] = useState('');
  const [password, setPassword] = useState('walker123');
  const [emailerr, setEmailerror] = useState('');
  const [passworderr, setPassworderror] = useState('');
  const [sinedin, setSingin] = useState(false);

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((register) => {
        console.log(register.user.uid);
        setUID(register.user.uid);
        console.log('navigating to main');
        props.navigation.navigate('MainRoute', {
          USERid: register.user.uid,
        });
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            setEmailerror('Your E-mail or Password is incorrect');
            break;
          case 'Wrong Password':
            setPassworderror(err.message);
        }
      });
    console.log('user created');
  }

  const Userid = {user: uid};
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        {sinedin === true ? (
          <Main Userid={Userid} />
        ) : (
          <SafeAreaView>
            <ScrollView>
              <View style={styles.heading}>
                <Text style={{fontSize: 30}}>Task</Text>
                <Text style={{color: '#006CF6'}}>Manager </Text>
              </View>
              <Divider style={{height: 1.5}} />
              <View style={styles.heading}>
                <Text
                  style={{
                    fontSize: 35,
                    color: 'black',
                    borderRadius: 10,
                    borderColor: '#006CF6',
                    borderWidth: 2,
                    paddingRight: 20,
                    paddingLeft: 20,
                  }}>
                  Log In
                </Text>
              </View>
              <View>
                <Text style={{marginLeft: 10, fontSize: 16, marginTop: 10}}>
                  Enter E-mail:
                </Text>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="E-mail"
                  style={styles.input}
                />
              </View>

              <View>
                <Text style={{marginLeft: 10, fontSize: 16}}>
                  Enter Password:
                </Text>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Password"
                  style={styles.input}
                />
              </View>
              <Text style={{color: 'red', marginLeft: 10}}>{emailerr}</Text>

              <View style={{marginLeft: 15}}>
                <TouchableOpacity
                  style={{color: '#006CF6'}}
                  onPress={() => props.navigation.navigate('SignUpRoute')}>
                  <Text style={{color: '#006CF6'}}>
                    {' '}
                    Doesn't have an Account?
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
                <TouchableOpacity onPress={login} style={styles.button}>
                  <Text style={{color: 'white'}}>Log in</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  heading: {
    alignSelf: 'center',
    padding: 6,
    flexDirection: 'row',
  },
  detail: {
    textAlignVertical: 'top',
    margin: 12,
    borderRadius: 5,
    borderColor: '#1273de',
    borderWidth: 1,
    padding: 10,
  },
  input: {
    height: 40,
    margin: 10,
    borderRadius: 5,
    borderColor: '#1273de',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    marginTop: 10,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#1273de',
    padding: 12,
    borderRadius: 6,
  },
  dateinput: {
    width: 150,
    height: 40,
    margin: 12,
    borderRadius: 5,
    borderColor: '#1273de',
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1273de',
  },
  title: {
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
  },

  date1PickerStyle: {
    width: 150,
    marginBottom: 10,
    marginLeft: 10,
  },
  datePickerStyle: {
    width: 150,
    marginLeft: 40,
  },
  text: {
    textAlign: 'left',
    width: 230,
    fontSize: 16,
    color: '#000',
  },
});

export default Login;
