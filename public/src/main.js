// Set up socket.io
const socket = io();
// Initialize a Feathers app
const app = feathers();

// Register socket.io to talk to our server
app.configure(feathers.socketio(socket));

// Form submission handler that sends a new message
async function sendMessage() {
	const messageInput = document.getElementById('message-text');

	// Create a new message with the input field value
	await app.service('events').create({
		text: messageInput.value
	});

	messageInput.value = '';
}

// Renders a single message on the page
function addEvent(message) {
	document.getElementById('main').innerHTML += `<p>${JSON.stringify(
		message
	)}</p>`;
}

const main = async () => {
	// Find all existing events
	const { count, events } = await app.service('events').find();

	// Add existing events to the list
	events.forEach(addEvent);

	// Add any newly created message to the list in real-time
	app.service('events').on('created', addEvent);
};

main();
