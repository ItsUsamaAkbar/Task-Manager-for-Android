import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight,
  Image,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Add from './Assets/Add.png';
import {Link} from 'react-router-native';
import {
  withNavigation,
  createStackNavigator,
  createAppContainer,
  HeaderTitle,
} from 'react-navigation'; // Version can be specified in package.json
import {Divider} from 'react-native-paper';
import {db} from '../firebase';
import {
  doc,
  getDocs,
  setDoc,
  addDoc,
  collection,
} from 'firebase/firestore/lite';
import NavigationService from '../NavigationServices';
import Registration from './Registration';
function Main(props, route) {
  const [list, setlist] = useState('');
  const [uid, setUID] = useState('');
  useEffect(() => {
    // Getdata();
    // setUID(props.Userid.user);
    console.log('props');
    let UserId = props.navigation.getParam('USERid');

    setUID(UserId);
    //  Getdata();
  }, [null]);

  useEffect(() => {
    Getdata();
  }, [uid]);

  const Getdata = async () => {
    console.log('uid in getdata');
    console.log(uid);
    const docRef = doc(db, 'users', uid);
    const colRef = collection(docRef, 'Task');
    const tasksnapshot = await getDocs(colRef);
    const tasklist = tasksnapshot.docs.map((doc) => doc.data());
    setlist(tasklist);
  };

  // const sfRef = db.collection('users').doc('SF');
  // const collections = await sfRef.listCollections();
  // collections.forEach((collection) => {
  //   console.log('Found subcollection with id:', collection.id);
  //});
  // const task = collection(db, 'users');
  // const tasksnapshot = await getDocs(task);
  // const tasklist = tasksnapshot.docs.map((doc) => doc.data());
  // setlist(tasklist);
  // console.log(list);
  // const Userid = props.Userid.user;
  return (
    <>
      <HeaderTitle>
        <View style={styles.heading}>
          <Text style={{fontSize: 30}}>Task</Text>
          <Text style={{color: '#006CF6'}}>Manager </Text>
        </View>
      </HeaderTitle>
      <Divider style={{height: 1.5}} />
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{paddingBottom: 56}}>
        <ScrollView>
          {list.length > 0
            ? list.map((Task, key) => (
                <TouchableOpacity style={styles.card}>
                  <View style={styles.text}>
                    <Text style={{fontSize: 17}}>{Task.Name}</Text>
                  </View>
                </TouchableOpacity>
              ))
            : null}
        </ScrollView>
        <View
          style={{
            bottom: 7,
            alignSelf: 'flex-end',
            position: 'absolute',
          }}>
          {/* <Link
            to={{
              pathname: 'RegRoute',
            }}>
            <Text>Goto</Text>
          </Link> */}

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('RegRoute', {
                USERid: uid,
              })
            }>
            <Image
              style={{height: 40, width: 40}}
              source={require('./Assets/Add.png')}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    padding: 6,
    flexDirection: 'row',
  },
  addbutton: {
    backgroundColor: '#81c784',
  },
  Header: {
    backgroundColor: '#30B5C9',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    padding: 17,
  },
  card: {
    marginTop: 10,
    backgroundColor: '#78B3FF',
    borderWidth: 0,
    borderRadius: 12,
    borderColor: 'black',
    marginLeft: 20,
    marginRight: 20,
  },
});
export default withNavigation(Main);
