let circles = [];
let menuItems = ["首頁", "自我介紹", "作品集", "測驗卷", "教學影片"];
let subMenuItems = ["第一周", "第二周", "第三周", "第四周"]; // 作品集的子選單
let hoverIndex = -1; // 用於追蹤滑鼠懸停的選單項目索引
let subMenuHoverIndex = -1; // 用於追蹤滑鼠懸停的子選單項目索引
let menuY = -50; // 選單的初始 Y 座標（隱藏在畫布上方）
let targetMenuY = -50; // 選單的目標 Y 座標

function setup() {
  createCanvas(windowWidth, windowHeight); // 全視窗畫布
  background('#e3d5ca'); // 設定背景顏色

  // 生成 40 個圓的初始位置和顏色
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      color: color(random(255), random(255), random(255)), // 隨機鮮豔顏色
    });
  }
}

function draw() {
  background('#e3d5ca'); // 每次重繪背景

  let size = map(mouseX, 0, width, 10, 120); // 根據滑鼠 X 軸位置調整圓的大小

  // 繪製所有圓
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, size, size);
  }

  // 根據滑鼠的 y 座標控制選單目標位置
  if (mouseY < 250) {
    targetMenuY = 0; // 顯示選單
  } else {
    targetMenuY = -50; // 隱藏選單
  }

  // 平滑移動選單位置
  menuY = lerp(menuY, targetMenuY, 0.1);

  // 繪製選單
  drawMenu();
}

function drawMenu() {
  let menuHeight = 50; // 選單高度
  let spacing = 120; // 選單項目間距
  let menuX = width - spacing * menuItems.length; // 動態計算選單起始 X 座標

  // 設定選單背景
  fill('#fefaee');
  noStroke();
  rect(menuX - 10, menuY, spacing * menuItems.length, menuHeight); // 動態調整背景寬度

  for (let i = 0; i < menuItems.length; i++) {
    let itemX = menuX + spacing * i + spacing / 2; // 計算每個選單項目的 X 座標
    let itemY = menuY + menuHeight / 2; // 計算每個選單項目的 Y 庇標

    // 檢查滑鼠是否懸停在選單項目上
    if (mouseX > itemX - spacing / 2 && mouseX < itemX + spacing / 2 && mouseY > menuY && mouseY < menuY + menuHeight) {
      hoverIndex = i;
    } else if (hoverIndex === i) {
      hoverIndex = -1;
    }

    // 設定文字樣式
    textSize(30);
    textAlign(CENTER, CENTER);
    textFont('Microsoft JhengHei, Arial');
    fill(hoverIndex === i ? '#588157' : '#3a5a40'); // 滑鼠懸停時改變文字顏色
    text(menuItems[i], itemX, itemY);

    // 如果滑鼠懸停在「作品集」上，顯示子選單
    if (hoverIndex === 2) {
      drawSubMenu(itemX, menuY + menuHeight); // 繪製子選單
    }
  }
}

function drawSubMenu(parentX, parentY) {
  let subMenuWidth = 150; // 子選單寬度
  let subMenuHeight = 40; // 子選單每項高度

  // 設定子選單背景
  fill('#fefaee');
  noStroke();
  rect(parentX - subMenuWidth / 2, parentY, subMenuWidth, subMenuHeight * subMenuItems.length);

  for (let i = 0; i < subMenuItems.length; i++) {
    let itemX = parentX; // 子選單項目 X 座標與父選單對齊
    let itemY = parentY + subMenuHeight * i + subMenuHeight / 2; // 子選單項目 Y 座標

    // 檢查滑鼠是否懸停在子選單項目上
    if (
      mouseX > itemX - subMenuWidth / 2 &&
      mouseX < itemX + subMenuWidth / 2 &&
      mouseY > parentY + subMenuHeight * i &&
      mouseY < parentY + subMenuHeight * (i + 1)
    ) {
      subMenuHoverIndex = i;
    } else if (subMenuHoverIndex === i) {
      subMenuHoverIndex = -1;
    }

    // 設定子選單文字樣式
    textSize(20);
    textAlign(CENTER, CENTER);
    textFont('Microsoft JhengHei, Arial');
    fill(subMenuHoverIndex === i ? '#588157' : '#3a5a40'); // 滑鼠懸停時改變文字顏色
    text(subMenuItems[i], itemX, itemY);
  }
}

function mousePressed() {
  // 如果點擊「第一周」子選單，跳轉到指定網址
  if (hoverIndex === 2 && subMenuHoverIndex === 0) {
    window.open("https://ting950629.github.io/20250328/", "_blank");
  }
  // 如果點擊「第二周」子選單，跳轉到指定網址
  if (hoverIndex === 2 && subMenuHoverIndex === 1) {
    window.open("https://ting950629.github.io/20250328/week2", "_blank");
  }
  // 如果點擊「第三周」子選單，跳轉到指定網址
  if (hoverIndex === 2 && subMenuHoverIndex === 2) {
    window.open("https://ting950629.github.io/20250328/week3", "_blank");
  }
  // 如果點擊「第四周」子選單，跳轉到指定網址
  if (hoverIndex === 2 && subMenuHoverIndex === 3) {
    window.open("https://ting950629.github.io/20250328/week4", "_blank");
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 當視窗大小改變時調整畫布
}