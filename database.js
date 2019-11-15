"use strict";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCa4KCqrAgIY6lsD3OMVFaI1ExE7VsOzHQ",
    authDomain: "webprogrammierungwgplaner.firebaseapp.com",
    databaseURL: "https://webprogrammierungwgplaner.firebaseio.com",
    projectId: "webprogrammierungwgplaner",
    storageBucket: "webprogrammierungwgplaner.appspot.com",
    messagingSenderId: "267987225836",
    appId: "1:267987225836:web:1f4c002e59aa8acc0829c9",
    measurementId: "G-DV9E5J3ZFS"
  };

let _db = "";

class DB {
  constructor() {
    firebase.initializeApp(_firebaseConfig);
    _db = firebase.firestore();
  }

  addAufgabe(dataset)
  {
    return _db.collection("datasets").add(dataset);
  }

  getAllAufgaben()
  {
    return _db.collection("datasets").get();
  }

  getAufgabe(index)
  {
    return _db.collection("datasets").doc(index).get();
  }

  deleteAufgabe(index)
  {
    return _db.collection("datasets").doc(index).deleteDataByIndex();
  }

}

export default DB;
