
let url = "https://my-json-server.typicode.com/wanjirumuigai/harrypotter/characters";
let nav = document.querySelector("#navbar");
//fetch data from the api
fetch(url)
	.then((res) => res.json())
	.then((data) => {
		displayFirstItem(data[0]);
		renderCharacters(data);
		// handleLikes(data[0]);
		showComments(data[0].comments);
	})
	.catch((error) => console.log("Error: ", error.message));
// function to display the first charater on page load
function displayFirstItem(characterObj) {
	document.getElementById("image").src = characterObj.image;
	document.getElementById("character-name").innerHTML = ` ${characterObj.name}`;
	document.getElementById("name").innerHTML = `Name: ${characterObj.name}`;
	document.getElementById("actor").innerHTML = `Actor Name: ${characterObj.actor}`;
	document.getElementById("house").innerHTML = `House: ${characterObj.house}`;
	document.getElementById("birthday").innerHTML = `DOB: ${characterObj.dateOfBirth}`.trim();
	document.getElementById("ancestry").innerHTML = `Ancestry: ${characterObj.ancestry}`.trim();
	document.getElementById("species").innerHTML = `Species: ${characterObj.species}`;
	document.getElementById("name").dataset.id = characterObj.id;
	let id = document.getElementById("name").dataset.id;


  // Add the likes
  let heartIcon = document.getElementById("likes");
	let likes = document.getElementById("likes-count");
  heartIcon.dataset.count = characterObj.likes
	likes.innerHTML = `${characterObj.likes} likes`;
	if (parseInt(likes.textContent) > 0) {
		heartIcon.classList.add("activated-heart");
	} else {
		heartIcon.classList.remove("activated-heart");
	}


	let house = characterObj.house;
	let body = document.querySelector("body");
    
	switch (house) {
		case "Gryffindor":
			body.style.backgroundColor = "#740001";
			nav.style.backgroundColor = "#D3A625";
			break;
		case "Slytherin":
			body.style.backgroundColor = "#1A472A";
			nav.style.backgroundColor = "#5D5D5D";
			break;
		case "Hufflepuff":
			body.style.backgroundColor = "#000";
			nav.style.backgroundColor = "#FFD800";
            break;
		case "Ravenclaw":
			body.style.backgroundColor = "#0E1A40";
			nav.style.backgroundColor = "#946B2D";
			break;
	}

	let status = characterObj.alive;
	if (status == true) {
		status = "Alive";
	} else {
		status = "Dead";
	}
	document.getElementById("status").innerHTML = `Status: ${status}`;
	showComments(characterObj.comments);
}
// list the top 20 characters
function renderCharacters(characters) {
	let list = document.getElementById("list");

	for (let i = 0; i < 20; i++) {
		let li = document.createElement("li");
		// li.dataset.id = i + 1;
		li.innerHTML = characters[i].name;
		list.appendChild(li);
		li.addEventListener("click", () => {
			displayFirstItem(characters[i]);
			// handleLikes(characters[i]);
			showComments(characters[i].comments);
		});
	}
}


// Add likes to the DOM and DB
document.getElementById("likes").addEventListener("click", handleLikes);
function handleLikes(e) {
  const currentLikes = parseInt(e.target.dataset.count)
  let characterId = document.getElementById("name").dataset.id
  fetch(`${url}/${characterId}`, {
  	method: "PATCH",
  	headers: {
  		"Content-Type": "application/json",
  	},
  	body: JSON.stringify({
  		likes: currentLikes + 1,
  	}),
  })
  	.then((res) => res.json())
  	.then((data) => data);
}

// add comments
let form = document.querySelector("#comments-form");
form.addEventListener("submit", (e) => {
	e.preventDefault();
	getComments();
});
let postedComments = document.getElementById("user-comments");
postedComments.innerHTML = "";
//get an array of comments posted and update
function getComments() {
	let comment = document.querySelector("#comments-area");
	let retrievedComments;

	let characterId = document.getElementById("name").dataset.id;

	let toAdd = comment.value.toUpperCase();

	fetch(`${url}/${characterId}`)
		.then((res) => res.json())
		.then((data) => {
			console.log("From updated comments: ", data);
			retrievedComments = data.comments;
			retrievedComments.push(toAdd);
			fetch(`${url}/${characterId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					comments: retrievedComments,
				}),
			})
				.then((res) => res.json())
				.then((data) => data);
			showComments(retrievedComments);
		});
	form.reset();
}

//show comments
function showComments(comments) {
	// document.getElementById('user-comments').innerHTML=''
	// console.log("Inside Comments: ", comments);
	let list = document.querySelector("#user-comments");
	list.replaceChildren();
	for (let i = 0; i < comments.length; i++) {
		let li = document.createElement("li");
		li.innerHTML = `${comments[i]} <span><i class="fa-regular fa-trash-can"></i></span>`;
		list.appendChild(li);
		list.addEventListener("click", (e) => {
			deleteComment(e);
		});
	}
}
//delete comments
function deleteComment(e) {
	e.preventDefault();
	let toDelete = e.target.parentNode.parentNode.innerText;

	let characterId = document.getElementById("name").dataset.id;

	fetch(`${url}/${characterId}`)
		.then((res) => res.json())
		.then((data) => {
			let retrievedComments = data.comments;
			let i = 0;
			while (i < retrievedComments.length) {
				if (retrievedComments[i].toLowerCase().trim() == toDelete.toLowerCase().trim()) {
					retrievedComments.splice(i, 1);
				} else {
					i++;
				}
			}
			fetch(`${url}/${characterId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					comments: retrievedComments,
				}),
			})
				.then((res) => res.json())
				.then((data) => data);
			showComments(retrievedComments);
		});
}

//search button
let list = document.querySelector("#list");
let search = document.querySelector(".search-bar input");
search.addEventListener("keyup", () => {
	const term = search.value.trim().toLowerCase();

	Array.from(list.children)
		.filter((charname) => !charname.textContent.toLowerCase().includes(term))
		.forEach((charname) => charname.classList.add("filtered"));
	Array.from(list.children)
		.filter((charname) => charname.textContent.includes(term))
		.forEach((charname) => charname.classList.remove("filtered"));
});

let sticky = nav.offsetTop;
window.onscroll = function () {
	if (window.pageYOffset >= sticky) {
		nav.classList.add("sticky");
	} else {
		nav.classList.remove("sticky");
	}
};
