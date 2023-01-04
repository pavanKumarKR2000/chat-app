const socket = io();

let userName = null;

const textArea = document.querySelector('#textarea');
const sendButton = document.querySelector(".send-btn");
const messageArea = document.querySelector(".message__area");

do {
    userName = prompt("Enter User Name");
} while (!userName);


const appendMessage = (msg, type) => {

    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);

}


const sendMessage = (message) => {
    
    let msg = {
        user: userName,
        message: message.trim()
    };

    appendMessage(msg, 'outgoing');
    scrollToBottom();

    socket.emit('message', msg);
}

textArea.addEventListener('keyup', (e) => {
    
    if (e.key === 'Enter' && e.target.value) {
        sendMessage(e.target.value);
        textArea.value = null;
    }

});


sendButton.addEventListener('click', (e) => {

    e.preventDefault();
    
    if (textArea.value) {
        sendMessage(textArea.value);
        textArea.value = null;
    }
});

const scrollToBottom = () => {
    messageArea.scrollTop=messageArea.scrollHeight;
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming'); 
    scrollToBottom();
});