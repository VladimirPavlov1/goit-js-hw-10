import './css/styles.css';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 3000;


const BASE_URL='https://restcountries.com/v2/name/';
const inputEl=document.getElementById('search-box');
const listEl=document.querySelector('.country-list');
console.dir(listEl)
const divEl=document.querySelector('.country-info');


inputEl.addEventListener('input',debounce(onInput,DEBOUNCE_DELAY));


function onInput(evt){
  
const currentName = evt.target.value.trim();

if(currentName.length===1){
    alert('Введіть більше сиволів');
    
}

fetchCountries(currentName).then(data=>console.log(data));
fetchCountries(currentName).then(data=>createMarkupList(data));
fetchCountries(currentName).then(data=> createMarkupDiv(data));

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


function createMarkupList(arr){
const markUp =  arr.map(item=>{
    return `<li class='item'>
    <span class="flag"><img src="${item.flag}" alt=""></span>
    <p>${item.name}</p>
  </li>`
}).join('')

listEl.innerHTML=markUp
changeMarkup(listEl)

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
            <h3 class='subtitle'>Language</h2>
           
            <p class='text'>${item.name}</p>
           
        </li>

        </ul>`
    }).join('')
    
    divEl.innerHTML=markUpDiv
    changeMarkupDiv(divEl)
    }

 function changeMarkup(count){
    if(listEl.childElementCount===1){
        listEl.classList.add('is-hidden')
    }
    else if(listEl.childElementCount>1){
        listEl.classList.remove('is-hidden')
    }
    
 }
 function changeMarkupDiv(count){
    if(divEl.childElementCount===1){
        divEl.classList.add('show');
        divEl.classList.remove('is-hidden')
    }
    else if(divEl.childElementCount>1){
        divEl.classList.add('is-hidden')
    }
    
 }