const form =document.querySelector("#form")
const username =document.querySelector("#username")
const email =document.querySelector("#email")
const password =document.querySelector("#password")
const password2 =document.querySelector("#password2")

// show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//show input error message 
function  showError(input,message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// function checkUsername(input){
//   if( input.value.length <=0 ){
//     showError(input)
//   }else{
//     showSuccess(input)
//   }
// }

//check all Requiredinput
function checkRequired(inputArr){
  inputArr.forEach((input)=>{
    if(input.value.trim().length<=0){
      showError(input,`${getKeyWords(input)}为必填项`)
    }else{
      showSuccess(input)
    }
  })
}

// get keyWords
function getKeyWords(input) {
  return input.placeholder.slice(3);
}

function checkLength(input,min,max) {
  if (input.value.length < min) {
    showError(input, `${getKeyWords(input)}至少${min}个字符`);
  } else if (input.value.length > max) {
    showError(input, `${getKeyWords(input)}少于${max}个字符`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "邮箱格式错误");
  }
}

function checkPasswordsMatch(input1,input2) {
  if(input1.value !== input2.value){
    showError(input2,'密码不匹配')
  }else{
    showSuccess(input2)
  }
}



form.addEventListener('submit',(e)=>{
  e.preventDefault();
  // checkUsername(username)
  
  //检测必须项，细化之后其实可以不用
  // checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 12);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
})
