const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");

function sendMessage() {
  const message = messageInput.value;
  if (message.trim() === "") return;

  const msgDiv = document.createElement("div");
  msgDiv.textContent = "أنت: " + message;
  chatBox.appendChild(msgDiv);

  messageInput.value = "";

  // رد تلقائي مؤقت للتجربة
  setTimeout(() => {
    const replyDiv = document.createElement("div");
    replyDiv.textContent = "مجهول: " + "رد آلي للتجربة";
    chatBox.appendChild(replyDiv);
  }, 1000);
}
