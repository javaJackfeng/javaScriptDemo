const main = document.getElementById("main");
const addUser = document.getElementById('add-user')
const double = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortUserBtn = document.getElementById('sort')
const calculateWealth = document.getElementById('calculate-wealth')

let data = []
getRandomUser()
getRandomUser()
getRandomUser()
//生成随机数据
async function  getRandomUser() {
  const res =await fetch("https://randomuser.me/api")
  const data = await res.json()
  const user = data.results[0]
  const newUser ={
    name:`${user.name.first} ${user.name.last}`,
    money:Math.floor(Math.random() * 1000000)
  }
  addData(newUser)
}

function addData(newUser) {
  data.push(newUser)
  updateDOM();
}

function updateDOM(providedData = data){
  //用于控制计算总金额的点击次数只能为1
  clickNum = 0
  //clear main div  this is important
  main.innerHTML = " <h2><strong>Person</strong>Wealth</h2>";
  providedData.forEach(item => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney( item.money)
    }`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

function doubleMoney() {
  data=data.map(item=>{
    return {...item,money:item.money*2}
    //和上面相同
    // return {name:item.name,money:item.money*2}
  })
  updateDOM()
}

function showMillionaires() {
  data=data.filter(user => {
    return user.money > 1000000
  })
  updateDOM()
}

function sortUser() {
  data.sort((a,b)=>{
    return b.money-a.money
  })
  updateDOM()
}
let clickNum =0
function calculate() {
  if(clickNum === 0){
    const wealth = data.reduce((acc,cur)=>{return acc+=cur.money},0)
    const wealthEL =document.createElement('div')
    wealthEL.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEL) 
    clickNum = 1;
  }

}

addUser.addEventListener('click',getRandomUser)
double.addEventListener('click',doubleMoney)
showMillionairesBtn.addEventListener('click',showMillionaires)
sortUserBtn.addEventListener('click',sortUser)
calculateWealth.addEventListener('click',calculate)