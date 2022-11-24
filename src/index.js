import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const BASE_URL='https://restcountries.com/v2/name/';
const inputEl=document.getElementById('search-box');
const listEl=document.querySelector('.country-list');
console.log(listEl)
const divEl=document.querySelector('.country-info');


inputEl.addEventListener('input',onInput)

function onInput(evt){
  
const currentName = evt.currentTarget.value;

if(currentName.length<2){
    alert('Введіть більше сиволів');
    
}

fetchCountries(currentName).then(data=>createMarkup(data))

console.dir(inputEl)
}

function fetchCountries(name){
    return fetch(`${BASE_URL}${name}`)
    .then(resp=>{
      if(!resp.ok){
        throw new Error(resp.statusText)
      }
      return resp.json()
    })
    .catch(error=>alert('Даної країни не знайдено'))
    
}

console.log('hello')


function createMarkup(arr){
const markUp =  arr.map(item=>{
    return `<li class='item'>
    <span class="flag"><img src="${item.flag}" alt=""></span>
    <p>${item.name}</p>
  </li>`
}).join('')

listEl.innerHTML=markUp
}
