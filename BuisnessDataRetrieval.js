import {local} from 'wix-storage';
const buisnessDataKey = "buisnessData";

// data needs to be retrieved from the following pages:
// 2. Buisness
// 4. Owner-relatives
// 5. PPP
// 6. PPP2

export function AppendBuisnessInfo(dataKey, dataObject) {
    var data = local.getItem(buisnessDataKey);
    if(!data){
        InitiateData(buisnessDataKey, dataKey, dataObject)
    }
    else{
        AppendData(buisnessDataKey, data, dataObject)
    }
}
function AppendData(key, oldData, newData){
        local.removeItem(key);
        var dataObject = JSON.parse( oldData );
        dataObject[key] = newData;
        local.setItem(key, JSON.stringify(dataObject));
}

function InitiateData(key, dataName, data){
        var newData = {}
        newData[dataName] = data;
        local.setItem(key, JSON.stringify(newData));
} 





