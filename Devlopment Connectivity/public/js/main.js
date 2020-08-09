const chatFormm = document.getElementById('chat-form');

const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // automatic scroll down when message display
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

//Message display in form
chatFormm.addEventListener('submit', (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;
    // console.log(msg);

    // Emit the message to server
    socket.emit('chatMessage', msg);

    //clear input message field after send it
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}