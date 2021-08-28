show();

let clearbtn = document.getElementById("clearBtn");
clearbtn.addEventListener("click", function(e){
	let txt = document.getElementById("addTxt");
	txt.value = "";
})

let addbtn = document.getElementById("addBtn");
addbtn.addEventListener("click", function(e){
	let txt = document.getElementById("addTxt");
	if (txt.value == "") {
		alert("OOPs!! Note is Empty");
	}
	else {
		let notes = localStorage.getItem("notes");
		if(notes == null){
			notesObj = [];
		}
		else{
			notesObj = JSON.parse(notes);
		}

		notesObj.push(txt.value);
		localStorage.setItem("notes",JSON.stringify(notesObj));
		txt.value = "";

		show();
	}         
});

function show(){
	let notes = localStorage.getItem("notes");
	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}

	let html = "";
	notesObj.forEach(function(element,index){
		html += `
		<div class="noteCard my-2 mx-2 card" style="width:18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index+1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteEle(this.id)" class="btn btn-primary del" data-toggle="tooltip" title="Delete Note Permanently">Delete</button>
                <button onclick="markimp(this)" class="btn btn-primary">Mark Important</button>
            </div>
        </div>`;
	});

	let notesElm = document.getElementById("notes");
	if(notesObj.length != 0){
		notesElm.innerHTML = html;
	}
	else{
		notesElm.innerHTML = `No Notes Yet ! `;
	}
}

function deleteEle(index){
	let notes = localStorage.getItem("notes");
	if(notes == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notes);
	}

	notesObj.splice(index,1);
	localStorage.setItem("notes",JSON.stringify(notesObj));
	show();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input",function(){
	let val = search.value.toLowerCase();
	let note = document.getElementsByClassName("noteCard");
	Array.from(note).forEach(function(element){
		let cardTxt = element.getElementsByTagName("p")[0].innerHTML;
		if(cardTxt.includes(val)){
			element.style.display = "block"
		}
		else{
			element.style.display = "none"
		}        
	});
});

function markimp(card){
	card.parentElement.style.background = "#ff88cb";
}
