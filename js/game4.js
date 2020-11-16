var game = new Phaser.Game(1000, 600, Phaser.CANVAS, null, { preload: preload, create: create, update: update });
var box;
var player;
var keyMove;
var enemy1;
var enemy1Alive;
var enemy1Array = [];
var enemy2;
var enemy2Alive;
var enemy2Array = [];
var sky;
var playerLife = 3; //총 목숨 3개 
var time = 30; // 제한시간 30초
var txtTime;
var txtLocation;
var eventTime;
var playb, pauseb;
var virus1, virus2, virus3;
function preload() {
  game.load.image("box", "./images/box.png");
  game.load.image("player", "./images/character50x75.png");
  game.load.image("enemy1", "./images/virus_mouse_left40x40.png");
  game.load.image("enemy2", "./images/virus_mouse_right40x40.png");
  game.load.image("virus1", "./images/virus170x70.png");
  game.load.image("virus2", "./images/virus270x70.png");
  game.load.image("virus3", "./images/virus370x70.png");
  game.load.image("playb", "./images/playButton.png");
  game.load.image("pauseb", "./images/pauseButton.png");
  game.load.image("back4", "./images/grandma.png")
  // 게임에 필요한 데이터 로드
}

function create() {
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.scale.refresh();
  /// 게임 처음 실행시 수행되는 함수
  game.physics.startSystem(Phaser.Physics.ARCADE); // 게임 속성 설정(아케이드)
  game.stage.backgroundColor = "#f1c40f";         // 게임 배경색 설청
  game.create.texture('sky', ['B'], 1000, 80, 0);  // 'E' 코드색상 1000x80 크기의 블럭을 'sky' 이름으로 생성
  //game.add.sprite(0, 0, 'sky');                   // sky를 x좌표 0, y좌표 0 위치에 추가
  this.backgrouund = this.game.add.sprite(0, 0, 'back4'); // 게임 배경 설정 
  this.backgrouund.inputEnabled = true; // 게임 배경 설정 
  sky = game.add.group();
  sky.enableBody = true;
  sky.create(0, 0, "sky");

  box = game.add.group();      // box 그룹 생성
  box.enableBody = true;       // box에 충돌속성을 설정합니다.

  for (var i = 0; i < 25; i++) {
    var rowBox = box.create(i * 40, 100, "box");
    rowBox.body.immovable = true;   // box가 움직이지 못하도록 설정합니다.
    rowBox = box.create(i * 40, 600 - 40, "box");
    rowBox.body.immovable = true;   // box가 움직이지 못하도록 설정합니다.
  }

  for (var j = 3; j < 14; j++) {
    var colBox = box.create(0, j * 40, "box");
    colBox.body.immovable = true;
    colBox = box.create(1000 - 40, j * 40, "box");
    colBox.body.immovable = true;
  }

  // sky를 x좌표 0, y좌표 0 위치에 추가
  player = game.add.sprite(500, 300, "player");
  game.physics.arcade.enable(player);

  //정지 버튼 
  //pauseb = game.add.image(750,10,"pauseb");

  enemy1 = game.add.group();
  enemy1.enableBody = true;
  enemy1.physicsBodyType = Phaser.Physics.ARCADE;
  enemy1.createMultiple(15, "enemy1"); //적 개수

  enemy2 = game.add.group();
  enemy2.enableBody = true;
  enemy2.physicsBodyType = Phaser.Physics.ARCADE;
  enemy2.createMultiple(15, "enemy2"); //적 개수

  enemy2.setAll("outOfBoundsKill", true);
  enemy2.setAll("checkWorldBounds", true);

  keyMove = game.input.keyboard.createCursorKeys();

  txtTime = game.add.text(400, 10, "TIME : 30", { fontSize: "35px Arial", fill: "#FFFFFF" });
  txtLocation = game.add.text(10, 15, "STAGE 4 길 -> 할머니 댁", { fontSize: "20px Arial", fill: "#FFFFFF" });
  eventTime = game.time.events.loop(Phaser.Timer.SECOND, function () { time--; txtTime.setText("TIME : " + time); }, this);
  //virus1 = game.add.image(500,10,"virus1");
  //virus2 = game.add.image(600,10,"virus2");
  //virus3 = game.add.image(700,10,"virus3");

}//end of create

function update() {
  if (time < 0) { //30초 넘기면 다음 스테이지 
    txtTime.setText("TIME : 0");
    location.href = "clearStageGrandmahouse.html"
  }

  // 프레임워크에서 주기적으로 수행하는 함수
  player.body.velocity.setTo(0, 0); // 관성을 0으로 설정  
  if (playerLife == 2) {
    virus1 = game.add.image(900, 10, "virus1");
  } else if (playerLife == 1) {
    virus2 = game.add.image(800, 10, "virus2");
  } else if (playerLife < 1) {
    virus3 = game.add.image(700, 10, "virus3");
    return;
  }

  var speed = 220;
  if (keyMove.left.isDown && keyMove.up.isDown) {
    player.body.velocity.x = -speed;
    player.body.velocity.y = -speed;

  } else if (keyMove.left.isDown && keyMove.down.isDown) {
    player.body.velocity.x = -speed;
    player.body.velocity.y = +speed;

  } else if (keyMove.right.isDown && keyMove.up.isDown) {
    player.body.velocity.x = +speed;
    player.body.velocity.y = -speed;

  } else if (keyMove.right.isDown && keyMove.down.isDown) {
    player.body.velocity.x = +speed;
    player.body.velocity.y = +speed;

  } else if (keyMove.left.isDown) {
    player.body.velocity.x = -speed;

  } else if (keyMove.right.isDown) {
    player.body.velocity.x = +speed;

  } else if (keyMove.up.isDown) {
    player.body.velocity.y = -speed;

  } else if (keyMove.down.isDown) {
    player.body.velocity.y = +speed;

  } else {
    player.animations.stop();//땃쥐 멈춤
  }

  game.physics.arcade.collide(player, box); //box 와 player 충돌

  enemy1Alive = enemy1.getFirstExists(false);
  enemy1Array.length = 0;

  enemy2Alive = enemy2.getFirstExists(false);
  enemy2Array.length = 0;

  //치즈바이러스 쥐 세팅
  box.forEachAlive(function (enemy1Alive) {
    enemy1Array.push(enemy1Alive);
  });

  box.forEachAlive(function (enemy2Alive) {
    enemy2Array.push(enemy2Alive);
  });

  // box 중 랜덤으로 하나를 골라서 적을 생성한다.
  if (enemy1Alive && enemy1Array.length > 0) {
    var random = game.rnd.integerInRange(0, enemy1Array.length - 1);
    var enemy1Box = enemy1Array[random];
    enemy1Alive.reset(enemy1Box.body.x, enemy1Box.body.y);
    game.physics.arcade.moveToObject(enemy1Alive, player, 130); //적 속도 조절
  }

  if (enemy2Alive && enemy2Array.length > 0) {
    var random = game.rnd.integerInRange(0, enemy2Array.length - 1);
    var enemy2Box = enemy2Array[random];
    enemy2Alive.reset(enemy2Box.body.x, enemy2Box.body.y);
    game.physics.arcade.moveToObject(enemy2Alive, player, 130); //적 속도 조절
  }

  game.physics.arcade.collide(player, box);   // player와 box가 충돌할수 있도록 설정
  game.physics.arcade.overlap(sky, enemy1, HitsSky, null, this);
  game.physics.arcade.overlap(player, enemy1, HitsPlayer, null, this);

  game.physics.arcade.overlap(sky, enemy2, HitsSky, null, this);
  game.physics.arcade.overlap(player, enemy2, HitsPlayer, null, this);

}//end of update
function HitsSky(sky, enemies) {
  enemies.kill();
}
function HitsPlayer(sky, enemies) {
  enemies.kill();
  playerLife -= 1;
  if (playerLife == 0) {
    game.time.events.remove(eventTime);
    location.href = "gameOverGrandmahouse.html";
  }
}