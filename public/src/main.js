const socket = io();
const app = feathers();

app.configure(feathers.socketio(socket));

socket.on('connect', function(socket) {
	const statusDiv = document.getElementById('connection-status');
	statusDiv.classList.remove('connection-status--failed');
	statusDiv.innerText = 'Connection ready';
});

let outputDiv = document.getElementById('output-list');
let recordCountDiv = document.getElementById('record-count');

let NumberFormat = new Intl.NumberFormat('en-US', {
	maximumSignificantDigits: 3
});

let hitCount = 0;

let hitCountRAF = null;
function incrementHitCount() {
	hitCount += 1;
	if (hitCountRAF) {
		cancelAnimationFrame(hitCountRAF);
	}

	hitCountRAF = requestAnimationFrame(() => {
		if (hitCount === 1) {
			recordCountDiv.innerText = '1 record retrieved';
			return;
		}

		recordCountDiv.innerText = `${NumberFormat.format(
			hitCount
		)} records retrieved`;
	});
}

// Renders a single message on the page
function addEvent(message) {
	const { id: timestamp, data } = message;
	outputDiv.innerHTML += `<li><span class="timestamp">${new Date(
		timestamp
	).toISOString()}</span>${JSON.stringify(data)}</li>`;
	incrementHitCount();
}

// Button to Reset local logs
document.getElementById('btn-clear-local-logs').addEventListener('click', () => {
	outputDiv.innerHTML = ``;
})

const main = async () => {
	// Find all existing events
	const { events } = await app.service('events').find();

	// Add existing events to the list
	events.forEach(addEvent);

	// Add any newly created message to the list in real-time
	app.service('events').on('created', addEvent);
};

main();

// Toggle buttons
[...document.querySelectorAll('.toggle button')].forEach(toggleElement => {
	toggleElement.addEventListener('click', e => {
		const button = e.target;
		const headingTitle = button.closest('div');
		if (headingTitle) {
			headingTitle.classList.toggle('is-visible');
		}
	});
});
