
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, Button, TextInput } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { doc, setDoc, addDoc, collection, updateDoc, deleteDoc, getDoc, getDocs, where, query } from "firebase/firestore"; 
import { db } from '../firebase/config';

export const HomeScreen = ({navigation}) => {

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [idd, setIdd] = useState('');
  const [timer, setTimer] = useState('');

  function create () {
    addDoc(collection(db, "users"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Added....");
alert("Added")
  }


  function update () {
    updateDoc(doc(db, "users", "SYvJ4dAp9joAjO9i5ppx"), {
  username: username,
  email: email,
}).then(() => {
  console.log('data submitted');
}).catch((error) => {
  console.log(error);
});;
console.log("Updated....");
alert("Updated")
  }


  function Delete () {
    deleteDoc(doc(db, "users", idd)) 
    console.log("Deleted....", idd);
alert("Deleted", idd)
  }


  
  function read () {
    getDoc(doc(db, "users", idd), {

    }).then((docData) => {
      if (docData.exists()) {
        console.log(docData.data().Clocks);
        setName(docData.data().username)
        setEmail(docData.data().email)
      }else{
        console.log("No such data");
        alert("No such data")
      }
}).catch((error) => {
  console.log(error);
});
  }



  function readall () {
    getDocs(collection(db, "Clocks")).then(docSnap =>{
      let Clocks =[];
      docSnap.forEach((doc) => {
        Clocks.push({ ...doc.data(), id:doc.id})
      });
      console.log('Document data', Clocks);
});
}

function allUsers () {
  getDocs(collection(db, "users")).then(docSnap =>{
    let users =[];
    docSnap.forEach((doc) => {
      users.push({ ...doc.data(), id:doc.id})
    });
    console.log('Document data', users);
});
}




function readByQuery () {
  getDocs(query(collection(db, "users"), where('email' , '==', 'solomon@gmail.com'))).then(docSnap =>{
    let users =[];
    docSnap.forEach((doc) => {
      users.push({ ...doc.data(), id:doc.id})
    });
    console.log('Document data', users);
});
}


useEffect(() => {
  console.log('Hoo you okay')
  change();
  readall();
  allUsers();
}, [])



console.log(timer)

  //   // console.log(timer)
  //   //   setTimer('No')
  //     change();
  //     console.log(timer)
    
  // }, []);
  
  function change() {
    setTimeout(() => {
      setTimer('Yes')
      console.log(timer)
    }, "15000");
  }


  return (
    <TailwindProvider>
   <View className="flex-1 justify-center items-center bg-pink-500 font-bold ">
    <View className='mt-10 flex space-y-4 mb-20'>
    <View>
      <Text className='font-bold'>HomePage -- Hurray</Text>
      </View>
<View>
      <Button title="Create an Account" onPress={() => navigation.push('CreateAccount')} />
      </View>
      <View>
      <Button title="Details" onPress={() => navigation.push('Details')} />
      </View>
      <View>
      <Button title="SigIn" onPress={() => navigation.push('SignIn')}  />
      </View>
      </View> 
<View className=' flex-1 w-[90%] '>
  <Text>INSERT</Text>
      <View className='mb-10'>
      <TextInput value={username} onChangeText={(username) => {setName(username)}} placeholder='Username' className=' h-20 border'></TextInput>
     </View>
     <View className=''>
      <TextInput value={email} onChangeText={(email) => {setEmail(email)}} placeholder='Email' className=' h-20 border'></TextInput>
     </View>
     <View>
      <Button title="Submit" onPress={create}  />
      </View>
      <View>
      <Button title="Update" onPress={update}  />
      </View>
      <View>
      <Button title="delete" onPress={Delete}  />
      </View>
      <View>
      <Button title="ReadById" onPress={read}  />
      </View>
      <View>
      <Button title="ReadAll" onPress={readall}  />
      </View>
      <View>
      <Button title="readByQuery" onPress={readByQuery}  />
      </View>
      <View className=''>
      <TextInput value={idd} onChangeText={(idd) => {setIdd(idd)}} placeholder='Id' className=' h-20 border'></TextInput>
     </View>
     
     </View>
     </View>
    
    </TailwindProvider>
  )
}

export default HomeScreen