import React, {useEffect, useState} from 'react';
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
import {HeaderTitle} from 'react-navigation';
import {Divider} from 'react-native-paper';
import Main from './Main';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {db} from '../firebase';
import {
  doc,
  getDocs,
  getDoc,
  collection,
  documentId,
} from 'firebase/firestore/lite';
function Document(props) {
  const [docid, setDocid] = useState('');
  const [uid, setUID] = useState('');
  const [list, setlist] = useState('');

  useEffect(() => {
    let Docid = props.navigation.getParam('Doci');
    let UID = props.navigation.getParam('UID');
    setDocid(Docid);
    setUID(UID);
    console.log('Document', docid);
    console.log('User', uid);
  }, [null]);

  useEffect(
    () => {
      if (docid && uid != null) {
        Getdata();
      }
    },
    [uid],
    [docid],
  );
  const Getdata = async () => {
    const docRef = doc(db, 'users', uid, 'Task', docid);
    const docSnap = await getDoc(docRef);
    const setdata = docSnap.data();
    setlist(setdata);
    console.log('list is', list);

    // const docRef = doc(db, 'users', uid);
    // const colRef = collection(docRef, 'Task', docid);
    // const tasksnapshot = await getDocs(colRef);
    // const tasklist = tasksnapshot.docs.map((doc) => ({
    //   Name: doc.data().Name,
    //   StartDate: doc.data().StartDate,
    //   EndDate: doc.data().EndDate,
    //   Discription: doc.data().Discription,
    // }));
    // setlist(tasklist);
    // console.log('Task List is' + tasklist);
  };

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
      <SafeAreaView>
        <View style={{padding: 10}}>
          <View style={{alignItems: 'center', marginBottom: 13}}>
            <Text style={{fontSize: 22}}>Details</Text>
            <View style={styles.text}></View>
          </View>
          <Divider style={{height: 1.5}} />

          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: 9,
            }}>
            <Text style={{fontSize: 17}}>Name :</Text>
            <Text style={{fontSize: 17}}>{list.Name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: 9,
            }}>
            <Text style={{fontSize: 17}}>Start Date :</Text>
            <Text style={{fontSize: 17}}>{list.StartDate}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: 9,
            }}>
            <Text style={{fontSize: 17}}>End Date :</Text>
            <Text style={{fontSize: 17}}>{list.EndDate}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-evenly',
              marginTop: 9,
            }}>
            <Text style={{fontSize: 17}}>Discription :</Text>
            <Text style={{fontSize: 17}}>{list.Discription}</Text>
          </View>
        </View>
        {/* <TouchableOpacity onPress={Getdata}>
          <Text>fetch</Text>
        </TouchableOpacity> */}
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  Button: {
    alignItems: 'center',
    marginTop: 15,
  },
  heading: {
    padding: 6,
    flexDirection: 'row',
  },
});
export default Document;
