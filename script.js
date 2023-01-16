
let nav = document.querySelector('#navbar')
//fetch data from the api
fetch('https://hp-api.onrender.com/api/characters')
.then(res => res.json())
.then(data => {
    displayFirstItem(data[0])
    renderCharacters(data)
    

})
.catch(error => console.log('Error: ', error.message))
// function to display the first charater on page load
function displayFirstItem(characterObj) {
document.getElementById('image').src = characterObj.image
document.getElementById('character-name').innerHTML = ` ${characterObj.name}`
document.getElementById('name').innerHTML = `Name: ${characterObj.name}`
document.getElementById('actor').innerHTML = `Actor Name: ${characterObj.actor}`
document.getElementById('house').innerHTML = `House: ${characterObj.house}`
document.getElementById('birthday').innerHTML =  `DOB: ${characterObj.dateOfBirth}`
document.getElementById('ancestry').innerHTML = `Ancestry: ${characterObj.ancestry}`
document.getElementById('species').innerHTML = `Species: ${characterObj.species}`

let house = characterObj.house
let body = document.querySelector('body')

if (house === 'Gryffindor') {
    body.style.backgroundColor = '#740001'
    nav.style.backgroundColor = '#D3A625'
    }
else if (house==='Slytherin') {
    body.style.backgroundColor = '#1A472A'
    nav.style.backgroundColor = '#5D5D5D'
}
else if (house==='Hufflepuff') {
    body.style.backgroundColor = '#000'
    nav.style.backgroundColor = '#FFD800'
}
else if (house==='Ravenclaw') {
    body.style.backgroundColor = '#0E1A40'
    nav.style.backgroundColor = '#946B2D'
}


let status = characterObj.alive
if(status == true) {
    status = 'Alive'
} else {
    status = 'Dead'
}
document.getElementById('status').innerHTML = `Status: ${status}`

checkLikes()

}
// list the top 20 characters
function renderCharacters(characters) {

    
    let list = document.getElementById('list')
  
    for(let i=0; i<20;i++) {

   let li = document.createElement('li')
   li.dataset.id = i + 1
    li.innerHTML = characters[i].name
    list.appendChild(li)
    li.addEventListener('click',() => {
        
        displayFirstItem(characters[i])
   
})
}
}
let countArray = []
    


function checkLikes() {
    if(!(countArray.length===0)) {
        countArray = []
        
        document.querySelector('#likes-count').textContent = `${countArray.length} likes`
        document.querySelector('#likes').classList.remove('activated-heart')
        
} else if(countArray.length === 0) {
    count=[]
    document.querySelector('#likes-count').textContent = `${countArray.length} likes`
    
    
showLikes()
} }
function showLikes() {
    countArray = []
    
  
let likes = document.getElementById('likes')


likes.addEventListener('click', () => {
    countArray.push(1)
   
    document.querySelector('#likes').classList.add('activated-heart')
    
    document.querySelector('#likes-count').textContent = `${countArray.length} likes`

console.log(countArray)

})

}

// add comments

let form = document.querySelector('#comments-form')
let comment = document.querySelector('#comments-area')
let postedComments = document.getElementById('user-comments')
postedComments.innerHTML=''
let li = document.createElement('li')

const addContent = addReview => {
    const html = `<li>${addReview}</li>`;
    postedComments.innerHTML += html }
 
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let toAdd = comment.value.toUpperCase()
    li.innerHTML = toAdd
    addContent(toAdd)
    form.reset()
}

)
postedComments.addEventListener('click', function(e) {
    this.removeChild(e.target);
  });
  let list = document.querySelector('#list')
  let search = document.querySelector('.search-bar input')
  
  search.addEventListener('keyup', () => {
  
      const term = search.value.trim().toLowerCase()
      
      Array.from(list.children)
        .filter(charname => !charname.textContent.toLowerCase().includes(term))
        .forEach(charname => charname.classList.add('filtered'))
        Array.from(list.children)
        .filter(charname => charname.textContent.includes(term))
        .forEach(charname => charname.classList.remove('filtered')) 
     
  
   })
   
let sticky = nav.offsetTop
window.onscroll = function() {
    if(window.pageYOffset >= sticky) {
        
        nav.classList.add('sticky')
    } else {
        nav.classList.remove('sticky')
        
    }
}




