// Make connection
const socket = window.io.connect('http://localhost:3000');

const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');


message.addEventListener('keypress', () => {
    socket.emit('typing', {
        handle: handle.value
    });
});

// Emit events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });

    handle.value = '';
    message.value = '';
});

// Listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data.handle}</em> is typing a message</p>`;
});