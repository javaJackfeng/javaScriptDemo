const toggle = document.getElementById('toggle')
const open = document.getElementById('open')
const modal = document.getElementById('modal')
const close = document.getElementById('close')

toggle.addEventListener('click', ()=>document.body.classList.toggle('nav-show'))

open.addEventListener('click',()=>modal.classList.add('modal-show'))

close.addEventListener('click',()=>modal.classList.remove('modal-show'))

window.addEventListener('click',(e)=>{
  e.target == modal ? modal.classList.remove('modal-show') : false
})