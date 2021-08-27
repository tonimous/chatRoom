// dom queries 
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newUserName = document.querySelector('.new-name');
const updateName = document.querySelector('.update-msg')


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
    setTimeout(() => { updateName.innerHTML = ' ' }, 4000);
})


// class instances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'mous');

// get chats and render 

chatroom.getChats(data => {
    chatUI.render(data);
});