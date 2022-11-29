import './css/styles.css';

import Notiflix from 'notiflix';

var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;


const BASE_URL='https://restcountries.com/v2/name/';
const inputEl=document.getElementById('search-box');
const listEl=document.querySelector('.country-list');
console.dir(listEl)
const divEl=document.querySelector('.country-info');


inputEl.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY));


function onInput(evt){
  
const currentName = evt.target.value.trim();


fetchCountries(currentName).then(data=>{if(data.length>10){Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')}else if(data.length===1){createMarkupDiv(data); listEl.classList.add('is-hidden');divEl.classList.remove('is-hidden')}else if(data.length<10||data.length!==1){createMarkupList(data);divEl.classList.add('is-hidden');listEl.classList.remove('is-hidden')}
})
.catch(error=>{Notiflix.Notify.warning('Такої країни не існує'); if(!currentName){
    cleanerdivEl();
    cleanerlistEl();
    return}}
);


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
   
    
}

console.log('hello')


function createMarkupList(arr){
const markUp =  arr.map(item=>{
    return `<li class='item'>
    <span class="flag"><img src="${item.flag}" alt=""></span>
    <p>${item.name}</p>
  </li>`
}).join('')

listEl.innerHTML=markUp;

}

function createMarkupDiv(arr){
    const markUpDiv =  arr.map(item=>{
        return `<ul>
        <li class='country-info__item'>
            <span class="flag"><img src="${item.flag}" alt=""></span>
            <h2 class='title'>${item.name}</h2>
        </li>
        <li class='country-info__item'>
            <h3 class='subtitle'>Capital:</h3>
            <p class='text'>${item.capital}</p>
        </li>
        <li class='country-info__item'>
            <h3 class='subtitle'>Population:</h3>
            <p class='text'>${item.population}</p>
        </li>
        <li class='country-info__item'>
            <h3 class='subtitle'>Language:</h2>
           
            <p class='text'>${item.name}</p>
           
        </li>

        </ul>`
    }).join('')
    
    divEl.innerHTML=markUpDiv
  
    }

 


function cleanerlistEl(){
    listEl.innerHTML=""
}
function cleanerdivEl(){
   divEl.innerHTML=""
}