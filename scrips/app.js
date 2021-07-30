// dom queries 
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');


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

// class instances 
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'mous');

// get chats and render 

chatroom.getChats(data => {
    chatUI.render(data);
});