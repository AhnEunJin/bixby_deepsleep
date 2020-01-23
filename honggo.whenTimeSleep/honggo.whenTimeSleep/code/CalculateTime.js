var console = require("console");

module.exports.function = function calculateTime (start) {

  var hour = parseInt(start.dateTime.time.hour);
   
  if(String(start.dateTime.parseTree.amPm) == 'Pm')   //오후면 시간에 12추가
    hour += 12;
  
  var waketime = new Date(Number(start.dateTime.date.year), Number(start.dateTime.date.month)-1, Number(start.dateTime.date.day), hour, Number(start.dateTime.time.minute));
  var now = new Date(Date.now());
  now.setHours(now.getHours()+9); //UTC 시간 KST(한국표준시)로 변경

  var waketimeGT = parseInt(waketime.getTime() / 1000);
  var nowGT = parseInt(now.getTime() / 1000);
  console.log('now: ',now);
  console.log('waketime : ', waketime); // 현재시간
  var times = [];
  var rmtimes = "";

  var day;
  var minute;
  var hour;
  var tempdiff; //default = -1
  var count = 0;

  for(var i = 4, temp; i>0; i--){
    temp = 90 * 60 * (2+i);
    let tempdate = new Date((waketimeGT-temp)*1000);
    day = tempdate.getDate();
    hour = tempdate.getHours();
    minute = tempdate.getMinutes();
    times[4-i] = String(day) + "일 " + String(hour) + "시 " + String(minute) + "분 ";
    console.log('times : ',times[i]); //자야할 시간

    tempdiff = waketimeGT - nowGT - temp;
    console.log('tempdiff : ',tempdiff);

    if(tempdiff > 0 && count ==0){
      count = 1;
      tempdiff = parseInt(tempdiff/60);
      let diffhour = 0;
      let diffminute;

      while(true){
        if((tempdiff / 60)>1){
          diffhour++;
          tempdiff -= 60;
        }
        else
          break;
      }

      if(diffhour!=0){
        rmtimes = String(diffhour) + "시간 ";
      }
      rmtimes += String(tempdiff) + "분 ";
    }

  }

  tempdiff = waketimeGT - nowGT;
  if(tempdiff < 0){
    rmtimes = "어머, 잠 잘 시간이 지났어요."
  }
  else if(tempdiff < 90*60){
    rmtimes = "최소 1시간 30분은 주무셔야 해요."
  }

  var result = {
    "time": [times[0], times[1], times[2], times[3]],
    "remainTime": rmtimes
  };

  return result;
  
}