import { MakeRequest } from "./modules/http.request";
import { reload } from "./modules/ul";
import { Item } from "./types";

export let audio = document.querySelector('audio') as HTMLAudioElement

const places: NodeListOf<HTMLDivElement> = document.querySelectorAll(".tasks");
const form = document.forms.namedItem("add_task") as HTMLFormElement;
const http = new MakeRequest();

http.getData("/tasks").then((res) => reload({ arr: res, places }));

form.onsubmit = (e) => {
	e.preventDefault();

	let options = {
		year: "numeric",
		month: "numeric",
		day: "numeric",
	};

	let task = {
		created_at: new Date().toLocaleDateString("uz-UZ", options),
		updated_at: new Date().toLocaleDateString("uz-UZ", options),
	};

	let fm = new FormData(form);

	fm.forEach((val: any, key: any) => (task[key] = val));

	http.postData("/tasks", task).then((res) => {
		http.getData("/tasks").then((res) => reload({ arr: res, places }));
	});
};
