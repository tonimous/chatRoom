const chatList = document.querySelector(".chat-list");
const newChatForm = document.querySelector(".new-chat");
const newUserName = document.querySelector(".new-name");
const updateName = document.querySelector(".update-msg");
const updateRooms = document.querySelector(".chat-rooms");
const feedback = document.querySelector(".feedback");
const loggedInAs = document.querySelector(".logged-in-as"); // New element

let username = localStorage.username ? localStorage.username : "unknown";

// Display logged-in user
loggedInAs.innerHTML = `You are logged in as <span class="username">${username}</span>`;

// Add new chat
newChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const comment = newChatForm.message.value.trim();

  // Validate the message input
  if (comment.length > 0) {
    chatroom
      .addChat(comment)
      .then(() => {
        newChatForm.reset();
        feedback.textContent = ""; // Clear any previous feedback
      })
      .catch((err) => {
        console.log(err);
        feedback.textContent = "Error sending message. Please try again.";
        setTimeout(() => {
          feedback.textContent = "";
        }, 4000);
      });
  } else {
    feedback.textContent = "Message cannot be empty.";
    setTimeout(() => {
      feedback.textContent = "";
    }, 4000);
  }
});

// Update username
newUserName.addEventListener("submit", (e) => {
  e.preventDefault();
  const newName = newUserName.name.value.trim();

  // Validate the username input
  if (newName.length > 0) {
    chatroom.updateName(newName);
    username = newName; // Update the username variable
    localStorage.setItem("username", newName); // Save the new username in localStorage
    newUserName.reset();
    updateName.innerHTML = `Your name was updated to ${newName}!`;
    loggedInAs.innerHTML = `You are logged in as <span class="username">${newName}</span>`; // Update display
    setTimeout(() => {
      updateName.innerHTML = "";
    }, 4000);
  } else {
    updateName.innerHTML = "Name cannot be empty.";
    setTimeout(() => {
      updateName.innerHTML = "";
    }, 4000);
  }
});

// Update chatrooms
updateRooms.addEventListener("click", (e) => {
  if (e.target.tagName === "DIV") {
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute("id"));
    chatroom.getChats((chat) => chatUI.render(chat));
  }
});

// Class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);

// Get chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});
