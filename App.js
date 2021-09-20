/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import * as firebase from 'firebase';
//BARCODE IS WORKING! IT SCANS . 
//initializng firebase

export default function App() {
//const firebaseConfig = {
    //apiKey: "AIzaSyC5MliANWseH-V4lVnHF_HlcWGonZWfJtM",
   // authDomain: "react-firebase-dafe8.firebaseapp.com",
   // projectId: "react-firebase-dafe8",
   // storageBucket: "react-firebase-dafe8.appspot.com",
  
  //};
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [collected, setCollected] = useState (false)
  const [locked, setlocked] = useState (false)
  const [text, setText] = useState ('not yet scanned')


  const askForCameraPermission = () => {
    (async() => {
      const{status}= await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted')
    }) () 
  }
  //Request for Camera Permission
  useEffect(()=>{
    askForCameraPermission();
  }, []
  );

  


   
   

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handlepress = () => {
    alert('your recepie has been uploaded!');
    setCollected(false);
  }
  

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type" + type + '\ndata: ' + data) 
    var key = data;
    var FDAUrl = 'https://api.nal.usda.gov/fdc/v1/food/'+key+'?api_key=SWC7bFqByAoJimA93dYdqQpjuHLDDwj5rNRZgc3m';
    fetch(FDAUrl)
      .then(res => {return res.json();})
      //.then(food=>{
        //alert(`Bar code with id ${data} and calory ${food.fdcId} has been scanned!`);
        //return food;
      //})
      
      .then(food=>{
        var cal =food.foodNutrients.filter(function (object) {
          return object.nutrient.name === "Energy";
        });
        return cal;
      })
      .then(cal => {
        alert(`Bar code with id ${data} have been scanned and ${cal[0].amount} KCAL of Energy has been added to your recipies!`);
        return cal[0].amount;
      }).then(amount => {
        setbarcodeData(key);//the barcode id is stored here
        setFDAData(amount);//the corresponding calory is stored here
        setCollected(true);
        })
  }
  if (hasPermission === null){
    return (
      <View style= {styles.container}>
        <Text> Requesting for camera permission</Text>
      </View>
    )
  }
  if (hasPermission === false){
    return (
      <View style={styles.container}>
        <Text style = {{margin:10}}> No access to camera </Text>
        <Button title = {'Allow Camera'}onPress = {() =>askForCameraPermission}/>
      </View>
    )
  }
  //Return the View 
  return (
      <View style= {styles.container}>
        <View style = {styles.barcodebox}>
        {(!scanned)&&<BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style= {{ height:400, width: 400}} />}
        </View>

        {scanned && <Button title= {'Tap to scan'} onPress = {() => setScanned(false)} color='tomato'/>}
        {collected && <Button title= {'Tap to upload recepie'} onPress = {() => handlepress} color='tomato'/>}
        </View>
      
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent:'center',
    },
    barcodebox: {
      alignItems: 'center',
      justifyContent:'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius:30,
      backgroundColor: 'white',

    },
    maintext: {
      fontSize:16,
      margin: 20,

    }
  });*/

    //var key = 1104067;
   /* var key = data;
    var FDAUrl = 'https://api.nal.usda.gov/fdc/v1/food/'+key+'?api_key=SWC7bFqByAoJimA93dYdqQpjuHLDDwj5rNRZgc3m';
    fetch(FDAUrl)
      .then(res => {return res.json();})
      //.then(food=>{
        //alert(`Bar code with id ${data} and calory ${food.fdcId} has been scanned!`);
        //return food;
      //})
      
      .then(food=>{
        var cal =food.foodNutrients.filter(function (object) {
          return object.nutrient.name === "Energy";
        });
        return cal;
      })
      .then(cal => {
        alert(`Bar code with id ${data} have been scanned and ${cal[0].amount} KCAL of Energy has been added to your recipies!`);
        return cal[0].amount;
      }).then(amount => {
        setbarcodeData(key);//the barcode id is stored here
        setFDAData(amount);//the corresponding calory is stored here
        })
  

  */





import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import * as firebase from "firebase";
//import "firebase/storage";\
// Required for side-effects
require("firebase/firestore");
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyByNU9xuISGpArdrb5Po_MY3b3oUjgOs48",
  authDomain: "food463-6bb45.firebaseapp.com",
  databaseURL: "https://food463-6bb45-default-rtdb.firebaseio.com",
  projectId: "food463-6bb45",
  storageBucket: "food463-6bb45.appspot.com",
  messagingSenderId: "276018517726",
  appId: "1:276018517726:web:52a89006d455af1033544f"
};
firebase.initializeApp(firebaseConfig);


//const FDAUrl = 'https://api.nal.usda.gov/fdc/v1/foods/list?api_key=SWC7bFqByAoJimA93dYdqQpjuHLDDwj5rNRZgc3m';
//var api_key="SWC7bFqByAoJimA93dYdqQpjuHLDDwj5rNRZgc3m";
//var jsonString = '{"totalHits":21874,"currentPage":1,"totalPages":10937,"pageList":[1,2,3,4,5,6,7,8,9,10],"foodSearchCriteria":{"query":"apple","generalSearchInput":"apple","pageNumber":1,"numberOfResultsPerPage":50,"pageSize":2,"requireAllWords":false},"foods":[{"fdcId":1648210,"description":"APPLE","lowercaseDescription":"apple","dataType":"Branded","gtinUpc":"070038322238","publishedDate":"2021-03-19","brandOwner":"Associated Wholesale Grocers, Inc.","brandName":"BEST CHOICE","ingredients":"FILTERED WATER, APPLE JUICE CONCENTRATE, ASCORBIC ACID (VITAMIN C).","marketCountry":"United States","foodCategory":"Fruit & Vegetable Juice, Nectars & Fruit Drinks","allHighlightFields":"<b>Ingredients</b>: FILTERED WATER, <em>APPLE</em> JUICE CONCENTRATE, ASCORBIC ACID (VITAMIN C).","score":904.62524,"foodNutrients":[{"nutrientId":1003,"nutrientName":"Protein","nutrientNumber":"203","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":0.0},{"nutrientId":1004,"nutrientName":"Total lipid (fat)","nutrientNumber":"204","unitName":"G","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":0.0},{"nutrientId":1005,"nutrientName":"Carbohydrate, by difference","nutrientNumber":"205","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":11.7},{"nutrientId":1008,"nutrientName":"Energy","nutrientNumber":"208","unitName":"KCAL","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":46.0},{"nutrientId":2000,"nutrientName":"Sugars, total including NLEA","nutrientNumber":"269","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":11.7},{"nutrientId":1093,"nutrientName":"Sodium, Na","nutrientNumber":"307","unitName":"MG","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":15.0},{"nutrientId":1162,"nutrientName":"Vitamin C, total ascorbic acid","nutrientNumber":"401","unitName":"MG","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":32.5}]},{"fdcId":1662719,"description":"APPLE","lowercaseDescription":"apple","dataType":"Branded","gtinUpc":"887434010245","publishedDate":"2021-03-19","brandOwner":"Oneonta Trading Corporation","brandName":"PINK LADY","ingredients":"","marketCountry":"United States","foodCategory":"Pre-Packaged Fruit & Vegetables","allHighlightFields":"","score":904.62524,"foodNutrients":[{"nutrientId":1003,"nutrientName":"Protein","nutrientNumber":"203","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":0.41},{"nutrientId":1004,"nutrientName":"Total lipid (fat)","nutrientNumber":"204","unitName":"G","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":0.0},{"nutrientId":1005,"nutrientName":"Carbohydrate, by difference","nutrientNumber":"205","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":14.0},{"nutrientId":1008,"nutrientName":"Energy","nutrientNumber":"208","unitName":"KCAL","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":54.0},{"nutrientId":2000,"nutrientName":"Sugars, total including NLEA","nutrientNumber":"269","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":10.3},{"nutrientId":1079,"nutrientName":"Fiber, total dietary","nutrientNumber":"291","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":2.1},{"nutrientId":1087,"nutrientName":"Calcium, Ca","nutrientNumber":"301","unitName":"MG","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":8.0},{"nutrientId":1089,"nutrientName":"Iron, Fe","nutrientNumber":"303","unitName":"MG","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":0.15},{"nutrientId":1092,"nutrientName":"Potassium, K","nutrientNumber":"306","unitName":"MG","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":107},{"nutrientId":1093,"nutrientName":"Sodium, Na","nutrientNumber":"307","unitName":"MG","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":0.0},{"nutrientId":1104,"nutrientName":"Vitamin A, IU","nutrientNumber":"318","unitName":"IU","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":41.0},{"nutrientId":1162,"nutrientName":"Vitamin C, total ascorbic acid","nutrientNumber":"401","unitName":"MG","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":2.0},{"nutrientId":1253,"nutrientName":"Cholesterol","nutrientNumber":"601","unitName":"MG","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":0.0},{"nutrientId":1257,"nutrientName":"Fatty acids, total trans","nutrientNumber":"605","unitName":"G","derivationCode":"LCCS","derivationDescription":"Calculated from value per serving size measure","value":0.0},{"nutrientId":1258,"nutrientName":"Fatty acids, total saturated","nutrientNumber":"606","unitName":"G","derivationCode":"LCCD","derivationDescription":"Calculated from a daily value percentage per serving size measure","value":0.0}]}],"aggregations":{"dataType":{"Branded":21699,"SR Legacy":89,"Survey (FNDDS)":81,"Foundation":5},"nutrients":{}}}';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default function App() {
  const [FDAData, setFDAData] = useState({});
  const [barcodeData, setbarcodeData] = useState({});
  const [hasPermission, setHasPermission] = useState(null);
  const [collected, setCollected] = useState (false)
  const [locked, setlocked] = useState (false)
  const [scanned,setScanned] = useState(true);
  let [foodname, setfoodname] = useState("")
  let [general_calories,setCalories] = useState(0);
  // Initialize Firebase
  //firebase.auth().signInAnonymously();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleupload = () => {
    var db = firebase.firestore();
    /*
    db.collection("users").get().then((querySnapshot) => {
      var locked = false;
      querySnapshot.map(async (doc) => {
          if(doc.data().name===foodname){
            locked = true;
          }
      });
      return locked;
  }).then((locked)=>{
    alert(`locked = ${locked}`);
    return locked;
  });*/
  if (locked != true) {
    db.collection("foods").add({
      name: foodname,
      calories: general_calories
    })
    .then((docRef) => {
      alert(`your recepie ${foodname} with calories ${general_calories} Kcal has been uploaded!`);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
  } else {
    alert('recipe already existed');
  }
  setlocked(false);
  setCollected(false);
  setCalories(0);
  setfoodname("");
    
  };

  const handledownload = () => {
    var db = firebase.firestore();
    db.collection("foods").get().then((querySnapshot) => {
      var strings = "";
      querySnapshot.forEach((doc) => {
          //alert(`${doc.data().name}, ${doc.data().calories}`);
          strings+= 'recipe: '+doc.data().name+' calories: '+doc.data().calories+'\n';
      });
      alert(`${strings}`);
  });
    
    
  };


  const handleauthentication = () => {
    firebase.auth().signInAnonymously();
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with id ${data} have been scanned`);
    //var key = 1104067;
    var key = data;
    var FDAUrl = 'https://api.nal.usda.gov/fdc/v1/food/'+key+'?api_key=SWC7bFqByAoJimA93dYdqQpjuHLDDwj5rNRZgc3m';
    fetch(FDAUrl)
      .then(res => {return res.json();})
      
      .then(food=>{
        if(typeof food.description != 'undefined') {
          setfoodname(foodname+'_'+food.description);
        }
        var cal =food.foodNutrients.filter(function (object) {
          return object.nutrient.name === "Energy";
        });
        return cal;
      })
      .then(cal => {
        alert(`Bar code with id ${data} have been scanned and ${cal[0].amount} KCAL of Energy has been added to your recipies!`);
        return cal[0].amount;
      }).then(amount => {
        //setbarcodeData(key);
        setCollected(true);
        //general_calories += amount;
        setCalories(general_calories+amount);
        //setfoodlist(foodlist+'+'+foodname);
        //setFDAData(amount);
        return amount;
      })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  
  //<Text>To scan the barcode, just press the button below!</Text>
  return (
    <View style={styles.container}>
      {(!scanned) && <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />}
      {scanned && <Button title={'Tap to Scan'} onPress={() => setScanned(false)} />}
      {scanned && collected && <Button title= {'Tap to upload recepie'} onPress = {() => handleupload()} color='tomato'/>}
      {scanned && <Button title= {'Tap to download recepie'} onPress = {() => handledownload()} color='green'/>}
      {scanned && <Button title= {'Tap to authenticate'} onPress = {() => handleauthentication()} color='green'/>}
    </View>
     
    
  );
}
