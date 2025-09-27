// index.js - omegle.live demo

// عناصر HTML
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const nextBtn = document.getElementById("nextBtn");
const sendBtn = document.getElementById("sendBtn");
const camBtn = document.getElementById("camBtn");
const micBtn = document.getElementById("micBtn");
const msgInput = document.getElementById("msgInput");
const messages = document.getElementById("messages");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let localStream = null;
let camEnabled = true;
let micEnabled = true;

// ✅ تشغيل الكاميرا + الميكروفون
async function startCamera() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localVideo.srcObject = localStream;
    addMessage("system", "Camera & mic started.");
  } catch (err) {
    alert("Camera or mic access denied!");
    console.error(err);
  }
}

// ✅ إيقاف الكاميرا والمايك
function stopCamera() {
  if (localStream) {
    localStream.getTracks().forEach((track) => track.stop());
    localStream = null;
  }
  localVideo.srcObject = null;
  remoteVideo.srcObject = null;
  addMessage("system", "Camera & mic stopped.");
}

// ✅ زر Start
startBtn.addEventListener("click", () => {
  startCamera();
  addMessage("system", "You started a new chat!");
});

// ✅ زر Stop
stopBtn.addEventListener("click", () => {
  stopCamera();
  addMessage("system", "You left the chat.");
});

// ✅ زر Next
nextBtn.addEventListener("click", () => {
  addMessage("system", "Searching for a new partner...");
  // لاحقًا رح يربط مع السيرفر ويجيب شخص جديد
});

// ✅ زر Send رسالة
sendBtn.addEventListener("click", () => {
  const text = msgInput.value.trim();
  if (text) {
    addMessage("you", text);
    msgInput.value = "";
    // لاحقًا رح نرسل الرسالة للسيرفر
  }
});

// ✅ زر Cam (تشغيل/إيقاف الكاميرا)
camBtn.addEventListener("click", () => {
  if (!localStream) return;
  camEnabled = !camEnabled;
  localStream.getVideoTracks().forEach((track) => (track.enabled = camEnabled));
  addMessage("system", camEnabled ? "Camera ON" : "Camera OFF");
});

// ✅ زر Mic (تشغيل/إيقاف الميكروفون)
micBtn.addEventListener("click", () => {
  if (!localStream) return;
  micEnabled = !micEnabled;
  localStream.getAudioTracks().forEach((track) => (track.enabled = micEnabled));
  addMessage("system", micEnabled ? "Mic ON" : "Mic OFF");
});

// ✅ إضافة رسالة للواجهة
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.classList.add("msg");
  if (sender === "you") {
    div.classList.add("me");
    div.innerHTML = `<span class="who">You:</span> ${text}`;
  } else if (sender === "system") {
    div.classList.add("system-msg");
    div.textContent = text;
  } else {
    div.classList.add("other");
    div.innerHTML = `<span class="who">Stranger:</span> ${text}`;
  }
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}
