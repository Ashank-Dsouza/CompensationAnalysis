import { local } from 'wix-storage';
const buisnessDataKey = "buisnessData";
const totalCreditsKey = "totalCredits";

/* 
This file deals with session storage data.
*/

export function AppendBuisnessInfo(newProperty, newData) {
    AppendInfo(buisnessDataKey, newProperty, newData);
}

export function GetBuisnessData() {
    return GetData(buisnessDataKey);
}

export function StoreQuarters(newData){
    local.setItem(totalCreditsKey, JSON.stringify(newData));
}

export function GetQuarters() {
    return GetData(totalCreditsKey);
}

function AppendInfo(storageKey, newProperty, newData) {
    var data = local.getItem(storageKey);
    if (!data) {
        InitiateData(storageKey, newProperty, newData)
    } else {
        AppendData(storageKey, newData, newProperty)
    }
}

function GetData(storageKey) {
    var data = local.getItem(storageKey);
    var dataObject = JSON.parse(data);
    return dataObject;
}

function AppendData(storageKey, newData, newProperty) {
    const oldData = local.getItem(buisnessDataKey);
    local.removeItem(storageKey);
    var dataObject = JSON.parse(oldData);
    dataObject[newProperty] = newData;
    local.setItem(storageKey, JSON.stringify(dataObject));
}

function InitiateData(storageKey, property, data) {
    var newData = {}
    newData[property] = data;
    local.setItem(storageKey, JSON.stringify(newData));
}