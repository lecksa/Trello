import { Reload } from "../types";
import { MakeRequest } from "./http.request";
const places: NodeListOf<HTMLDivElement> = document.querySelectorAll(".tasks");
const http = new MakeRequest()
let confetti = document.querySelector('#confetti') as HTMLCanvasElement
let js_confetti = new JSConfetti()
import { audio } from "../main";

export function reload({ arr, places }: Reload) {
	places.forEach((el) => (el.innerHTML = ""));

	for (let item of arr) {
		const div = document.createElement("div");
		const title = document.createElement("span");
		const description = document.createElement("p");
		let trash = document.createElement('img')

		trash.src = "./public/icons8-trash-96.svg"
		div.classList.add("item");
		div.dataset.id = item.id
		div.draggable = true;
		title.innerHTML = item.title;
		description.innerHTML = item.description;

		document.body.append(trash)
		div.append(title, description);
		places[item.status - 1].append(div);

		div.ondragstart = () => {
			trash.classList.add('delete')
			div.classList.add("hold");
			div.id = "selected"
			setTimeout(() => {
				div.classList.add("invisible");
			}, 0);
		};
		div.ondragend = () => {
			trash.classList.remove('delete')
			div.classList.remove("invisible");
			div.classList.remove("hold");
			div.removeAttribute('id')
		};

		trash.ondragenter = () => {
			trash.classList.add('bigger')
			trash.src = "./public/icons8-trash.gif"
		}

		trash.ondragleave = () => {
			trash.src = "./public/icons8-trash-96.svg"
		}

		trash.ondragover = (e) => {
			e.preventDefault()
		}

		trash.ondrop = () => {
			div.remove()
			audio.play()
			http.deleteData('/tasks/' + item.id)
			js_confetti.addConfetti()
		}
	}
}

for (let place of places) {
	let parent = place.parentElement as HTMLDivElement
	let status = parent.dataset.status as string

	parent.ondragenter = () => {
		parent.style.border = "2px dashed black";
	};
	parent.ondragover = (e) => {
		e.preventDefault();
	};
	parent.ondragleave = () => {
		parent.style.border = "none";
	};
	parent.ondrop = () => {
		parent.style.border = "none";
		let selected = document.getElementById('selected') as HTMLDivElement
		selected.id = ""

		let id = selected.dataset.id

		http.patchData('/tasks/' + id, { status })
			.then(() => console.log('success'))

		place.append(selected)
	};
}
