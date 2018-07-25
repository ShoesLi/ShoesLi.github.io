/**
 * Created by cyb on 2018/7/14.
 */

var fs = require('fs');
var workInfos = require('./workInfoList');
var imgNamesList = [];
var writeStream = fs.createWriteStream('outpu.json');
var folderName = fs.readdirSync('./styles/img', 'utf-8');


function compare (a, b){
  a.replace(/\.(jpe?g || png || gif || svg)$/g, '');
  b.replace(/\.(jpe?g || png || gif || svg)$/g, '');
  if(parseInt(a) > parseInt(b)){
    return 1;
  } else if(parseInt(a) < parseInt(b)){
    return -1;
  } else {
    return 0;
  }
}


folderName = folderName.filter(function(item){
  if(item.match(/^[0-9]{0,2}$/g)){
    return true;
  } else {
    return false;
  }
});
folderName.sort((a, b) => {
  a.replace(/\.(jpe?g || png || gif || svg)$/g, '');
  b.replace(/\.(jpe?g || png || gif || svg)$/g, '');
  if(parseInt(a) < parseInt(b)){
    return 1;
  } else if(parseInt(a) > parseInt(b)){
    return -1;
  } else {
    return 0;
  }
});
folderName.map(function(item, index){
  var imgNames = fs.readdirSync('./styles/img/' + item, 'utf-8');
  imgNames = imgNames.filter(function(item){
    return !item.match(/DS/gi);
  })
  imgNames.sort(compare);
  imgNames = imgNames.map(function(name){
    return `./styles/img/${item}/${name}`
  })
  var workInfo = workInfos.workInfoList.filter(function(one){
    return one.index === parseInt(item);
  })
  imgNamesList.push({
    imgUrlList:imgNames,
    picNum:imgNames.length,
    name: workInfo[0].name,
    des: workInfo[0].des
  });
});

writeStream.write(JSON.stringify(imgNamesList), 'utf-8');
writeStream.end();



