// Try: making the object move porportionally.

console.clear();

const $ = (id) => {
	return document.querySelector(id);
};

const INPUTS = document.querySelectorAll(".info-input");
// const CARD = document.querySelector('#card-content')
const BTNS = document.querySelectorAll("button");
const DIR_LABEL = $("#card-info");
const SPEED = $("#speed_label");
const RADIUS = $("#radius_label");
const CARD = $("#card");
const CIRCLE = $("#circle");

const IN = $("#flip-btn");
const OUT = $("#next-btn");

const ENTER = $("#add-btn");

let q = 0;
let V = 0;
let m = 0;
let B = 0;

let r = 0;
let v = 0;

let direction = "";
let dir_force = "";

const reset = () => {
	document.body.style.backgroundImage = "";
	document.body.style.backgroundSize = "";
	SPEED.innerText = `The object will be moving at... `;
	RADIUS.innerText = `The radius of its path will be... `;
	DIR_LABEL.innerText = `Object is initially travelling to the right.`;
	q = 0;
	V = 0;
	m = 0;
	B = 0;
	$("#m").value = "";
	$("#q").value = "";
	$("#V").value = "";
	$("#B").value = "";
	direction = "";
	IN.style.background = "#173D6A";
	OUT.style.background = "#173D6A";
	CIRCLE.style.display = "none";
};

ENTER.addEventListener("click", (event) => {
	// reset
	if (!$("#m").value || !$("#q").value || !$("#V").value || !$("#B").value) {
		Swal.fire({
			title: "Missing values",
			text: "Please make sure you entered all the values.",
			icon: "warning",
			confirmButtonText: "Ok"
		});
	} else if (!direction) {
		Swal.fire({
			title: "Missing values",
			text: "Please select a magnetic field direction.",
			icon: "warning",
			confirmButtonText: "Ok"
		});
	} else {
		m = Number($("#m").value);
		q = Number($("#q").value);
		V = Number($("#V").value);
		B = Number($("#B").value);
		console.log(m);
		console.log(q);
		console.log(V);
		console.log(B);

		if ((q < 0 && V < 0) || (q > 0 && V > 0)) {
			Swal.fire({
				title: "Error!",
				text: "The object will not speed up in the potential difference.",
				icon: "error",
				confirmButtonText: "Ok"
			});
		} else {
			v = Math.sqrt((2 * Math.abs(q) * Math.abs(V)) / m).toPrecision(3);
			r = ((m * v) / (Math.abs(q) * B)).toPrecision(3);

			console.log(v);
			console.log(r);

			SPEED.innerText = `The object will be moving at ${v}m/s.`;
			RADIUS.innerText = `The radius of its path will be ${r}m.`;

			if (direction == "Into the page") {
				q < 0
					? (dir_force = "towards the bottom of the page")
					: (dir_force = "towards the top of the page");
			} else {
				q < 0
					? (dir_force = "towards the top of the page")
					: (dir_force = "towards the bottom of the page");
			}
			DIR_LABEL.innerText = `The magnetic force will cause the object to move ${dir_force}.`;

			CIRCLE.style.display = "inline-block";
			//repetetive
			if (dir_force == "towards the bottom of the page") {
				CIRCLE.style.animation = "cw 5s infinite linear";
			} else {
				CIRCLE.style.animation = "ccw 5s infinite linear";
			}
		}
	}
});

IN.addEventListener("click", (event) => {
	direction = "Into the page";
	IN.style.background = "#97AFD1";
	OUT.style.background = "#173D6A";
	document.body.style.backgroundImage =
		"repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 8px, transparent 8px, transparent 90px), repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.05) 0, rgba(0, 0, 0, 0.05) 8px, transparent 8px, transparent 80px)";
	document.body.style.backgroundSize = "70px 115px";
});

OUT.addEventListener("click", (event) => {
	direction = "Out of the page";
	OUT.style.background = "#97AFD1";
	IN.style.background = "#173D6A";
	document.body.style.backgroundImage =
		"radial-gradient(circle, rgba(0, 0, 0, 0.1) 5px, transparent 15px";
	document.body.style.backgroundSize = "100px 100px";
});

CARD.addEventListener("click", reset);

/*


Testing


1.6726e-27
1.6e-19
-5e6
0.2

*/