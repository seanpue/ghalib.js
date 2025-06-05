import { Elm } from './Application.elm'

import nastaliq from "../assets/nastaliq.json"
import diacritics from "../assets/diacritics.json"
import devanagari from "../assets/devanagari.json"

   
function getLocalStorageItem(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}
function setLocalStorageItem(key:string, value:string) {
  window.localStorage.setItem(key, value);
}
var localStorageKey = "displayScript";
var getStoredData = getLocalStorageItem(localStorageKey);

var app = Elm.Application.init(
  {flags: {
      transliterators: {
        nastaliq: JSON.stringify(nastaliq), 
        diacritics: JSON.stringify(diacritics), 
        devanagari: JSON.stringify(devanagari)
      }, 
      origBody: document.body.innerHTML,
      storedData: getStoredData ? getStoredData : null,
    }
  , node: document.body
   }
);

app.ports.setStorage.subscribe(function (data:string) {
  console.log(data);
  setLocalStorageItem(localStorageKey, data);
});