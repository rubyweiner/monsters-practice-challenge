const monsterContainer = document.querySelector("#monster-container");
const newMonsterButton = document.querySelector('#new-monster-button');
const forwardButton = document.querySelector('#forward');
const backButton = document.querySelector('#back');
const form = document.querySelector("#create-monster-form");
let page = 1;

document.addEventListener('DOMContentLoaded', () => {
  page = 1;
  window.addEventListener('load', fetchMonsters);
  forwardButton.addEventListener('click', forwards);
  backButton.addEventListener('click', backwards);
  form.addEventListener('submit', createMonster);
})



function fetchMonsters(){
  fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(json => json.forEach(monster => {
      render(monster)
    }))
}

function render(monster){
  let div = document.createElement('div')
  let h3 = document.createElement('h3')
  let h5 = document.createElement('h5')
  let p = document.createElement('p')
  h3.innerText = monster.name
  h5.innerText = `${monster.age} years old`
  p.innerText = `Bio: ${monster.description}`
  div.appendChild(h3)
  div.appendChild(h5)
  div.appendChild(p)
  monsterContainer.appendChild(div)
}

function forwards(event) {
  event.preventDefault();
  monsterContainer.innerHTML = "";
  if (page < 10) {
    page+=1;
    fetchMonsters();
  } else {
    alert("no more monsters!");
    fetchMonsters();
  }
}

function backwards(event) {
  event.preventDefault();
  monsterContainer.innerHTML = "";
  if (page === 1) {
    alert("no more monsters!");
    fetchMonsters();

  } else {
    page-=1;
    fetchMonsters();
  }
}

function createMonster(event) {
  event.preventDefault();
  let name = document.querySelector("#new-monster-name").value;
  let age = document.querySelector("#new-monster-age").value;
  let description = document.querySelector("#new-monster-description").value;

  fetch ('http://localhost:3000/monsters', {
    method: 'post',
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    }),
    headers: {"content-Type": "application/json"}
  })
  fetchMonsters();
}
