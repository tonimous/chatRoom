// dom queries 
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newUserName = document.querySelector('.new-name');
const updateName = document.querySelector('.update-msg');
const updateRooms = document.querySelector('.chat-rooms');


// add new chat 
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const comment = newChatForm.message.value.trim();
    chatroom.addChat(comment)
        .then(() => {
            newChatForm.reset();
        }).catch(err => {
            console.log(err)
        });
})

// update username
newUserName.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newUserName.name.value.trim();
    // update name via chatroom 
    chatroom.updateName(newName)
    // reset the name 
    newUserName.reset()
    // confirm the updated name and set timeout to hide the message
    updateName.innerHTML = `Your name was updated to ${newName}!`;
    setTimeout(() => { updateName.innerHTML = '' }, 4000);
})

// update chatrooms 
updateRooms.addEventListener('click', e => {
    if (e.target.tagName === 'DIV') {
        chatUI.clear();
        console.log(e)
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
});


// local storage check for username 
const username = localStorage.username ? localStorage.username : 'unknown';


// class instances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats and render 

chatroom.getChats(data => {
    chatUI.render(data);
});