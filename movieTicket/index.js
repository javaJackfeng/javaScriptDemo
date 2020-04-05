const container = document.querySelector('.container')
const seats= container.querySelectorAll(".row .seat:not(.occupied)")
const count = document.querySelector("#count")
const total =document.querySelector("#total")
let movieSelected =document.querySelector("#movie")

let ticketPrice;

populateUI();

// 获取本地数据并渲染样式
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  //座位
  seats.forEach((seat,index)=>{
    if(selectedSeats && selectedSeats.indexOf(index) > -1){
      seat.classList.add("selected")
    }
  })
  //票价
  const selectedMovieIndex=localStorage.getItem("selectedMovieIndex")
  if(selectedMovieIndex){
    movieSelected.selectedIndex=selectedMovieIndex
  }
}

//更新票价和数量
function undateSeletedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // 获取selectedSeats在seats中所占据的下标，形成一个新的下标数组，用于记录在localStorage中
  const selectedSeatsIndexs= [...selectedSeats].map(selectedSeat=>[...seats].indexOf(selectedSeat))
  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndexs))
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  ticketPrice=movieSelected.value;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//保存电影索引值和票价
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// 电影下拉框事件监听
movieSelected.addEventListener('change',e=>{
  ticketPrice = +e.target.value;
  console.log(e)
  setMovieData(e.target.selectedIndex,e.target.value);
  undateSeletedCount();
})
// 座位点击事件
container.addEventListener('click',e=>{
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected')
  }

  undateSeletedCount()
})

undateSeletedCount();