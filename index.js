// عناصر HTML
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const nextBtn = document.getElementById("nextBtn");
const sendBtn = document.getElementById("sendBtn");
const msgInput = document.getElementById("msgInput");
const chatBox = document.getElementById("chatBox");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

// ✅ تشغيل الكاميرا
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });
    localVideo.srcObject = stream;
  } catch (err) {
    alert("Camera or mic access denied!");
    console.error(err);
  }
}

// ✅ زر Start
startBtn.addEventListener("click", () => {
  startCamera();
  addMessage("system", "You started a new chat!");
});

// ✅ زر Stop
stopBtn.addEventListener("click", () => {
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
  addMessage("system", "You left the chat.");
});

// ✅ زر Next (تجريبي الآن)
nextBtn.addEventListener("click", () => {
  addMessage("system", "Searching for a new partner...");
});

// ✅ زر Send رسالة
sendBtn.addEventListener("click", () => {
  const text = msgInput.value.trim();
  if (text) {
    addMessage("you", text);
    msgInput.value = "";
    // هنا لاحقًا رح نرسل الرسالة للسيرفر
  }
});

// ✅ إضافة رسالة للواجهة
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = sender === "you" ? "You: " + text : text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
