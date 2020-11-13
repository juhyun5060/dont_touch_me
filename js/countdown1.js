var game = new Phaser.Game(1000, 600, Phaser.CANVAS, null, { preload: preload, create: create, update: update });

var time = 3; //시간 30초로 설정
function preload() {

  // 게임에 필요한 데이터 로드
}

function create() {
  game.stage.backgroundColor = "#f1c40f";         // 게임 배경색 설청
  
  txtTime = game.add.text(470, 250, "3", { fontSize: "80px Arial", fill: "#000000" });
  eventTime = game.time.events.loop(Phaser.Timer.SECOND/2, function () { time--;},this); //txtTime.setText(time); }, this);
}//end of create

function update() {
 if(time >0){
    txtTime.setText(time);
   }else if(time ==0 ){ //30초 넘기면 다음 스테이지 
    txtTime.setText("");
    txtTime = game.add.text(390, 250, "START", { fontSize: "80px Arial", fill: "#000000" });
  }else{ //30초 넘기면 다음 스테이지 
    location.href="game1.html"
  }  
  
}//end of update
