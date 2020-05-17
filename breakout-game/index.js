const ruleBtn = document.getElementById('rule-button')
const ruleColseBtn = document.getElementById('close-button')
const ruleText = document.getElementById('rules')

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext('2d');

// 设置canvas中有多少个方块
const brickRowCount = 9;
const brickColumnCount = 5;

// 得分
let score = 0;

// 球相关参数
const ball = {
  // 初始位置
  x: canvas.width / 2,
  y: canvas.height / 2,
  // 半径
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
}

// 挡板的参数
const paddle = {
  // 初始位置
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  // 宽高
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
};

// 绘制撞击球
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// 单个方块的信息
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
};

// 创建所以方块
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  // 模拟二维数组， 不能缺少
  bricks[i] = []
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j]= {x,y, ...brickInfo} 
  }
}

// 绘制所以方块
function drawBricks() {
  bricks.forEach(column => {
    column.forEach(brick => {
      ctx.beginPath()
      ctx.rect(brick.x, brick.y, brick.w, brick.h)
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill()
      ctx.closePath()
    })
  })
}

// 绘制得分
function drawScore(){
  ctx.font = "20px Arial";
  ctx.fillText(`得分：${score}`, canvas.width - 100, 30);
}

// 绘制挡板
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}

// 绘制图形
function draw() {
  // 每次重新绘画图形的时候，需要把上次的痕迹清除掉
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall()
  drawPaddle()
  drawBricks()
  drawScore()
}



// 监听更新
function update() {
  draw()
  // 挡板移动
  movePaddle();
  // 球触发
  moveBall()
  
  // 绘画更新的关键
  requestAnimationFrame(update)
}

update()

// 移动撞击球
function moveBall() {
  ball.x += ball.dx
  ball.y += ball.dy

  // 设置边界
  if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
    ball.dx *= -1;
  }
  if(ball.y + ball.size> canvas.height || ball.y - ball.size < 0){
    ball.dy *= -1
  }

  // 撞击挡板
  if(ball.x - ball.size > paddle.x && ball.x + ball.size < paddle.x + paddle.w && ball.y + ball.size > paddle.y){
    ball.dy = -ball.speed;
  }

  // 撞击方块
  bricks.forEach(column => {
    column.forEach(brick => {
      if(brick.visible){
        if( ball.x - ball.size > brick.x && ball.x + ball.size < brick.x + brick.w 
            && ball.y + ball.size > brick.y && ball.y - ball.size < brick.y+ brick.h){
            ball.dy *= -1;
            brick.visible = false;
            increaseSource();
        }
      }
    })
  })

    // 挡板没有接住球体
    if (ball.y + ball.size > canvas.height) {
      showAllBricks();
      score = 0;
    }
}

// 增加得分 
function increaseSource() {
  score++;
  if (score % (brickColumnCount * brickRowCount) === 0) {
    showAllBricks();
  }
}

// 再次显示所有砖块
function showAllBricks() {
  bricks.forEach(column => {
    column.forEach(brick => (brick.visible = true));
  });
}

// 移动挡板
function  movePaddle() {
  paddle.x += paddle.dx
  // 设置边界
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}
// 监听键盘左右移动
function keyDown(e) {
  if (e.key === "ArrowRight" || e.key === "Right") {
    paddle.dx = paddle.speed;
  } else if (e.key === "ArrowLeft" || e.key === "Left") {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e) {
  if (
    e.key === "ArrowRight" ||
    e.key === "Right" ||
    e.key === "ArrowLeft" ||
    e.key === "Left"
  ) {
    paddle.dx = 0;
  }
}

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)


ruleBtn.addEventListener('click', () => {
   ruleText.classList.add('open')
})

ruleColseBtn.addEventListener('click', ()=>{
  ruleText.classList.remove('open')
})