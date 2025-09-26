// index.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// نخلي Express يخدم ملف index.html و index.css
app.use(express.static(__dirname));

// متغير لتخزين شخص واحد ينتظر
let waiting = null;

io.on("connection", (socket) => {
  console.log("✅ مستخدم متصل:", socket.id);

  // البحث عن شريك
  socket.on("find_partner", () => {
    if (!waiting) {
      waiting = socket.id;
      socket.emit("status", "جاري البحث عن شريك...");
    } else if (waiting === socket.id) {
      // نفس الشخص
    } else {
      const partnerId = waiting;
      waiting = null;

      const room = `room_${socket.id}_${partnerId}`;
      socket.join(room);
      io.to(partnerId).socketsJoin(room);

      socket.emit("paired", { room, partnerId });
      io.to(partnerId).emit("paired", { room, partnerId: socket.id });

      console.log(`🔗 تم ربط ${socket.id} مع ${partnerId} في الغرفة ${room}`);
    }
  });

  // استقبال وإرسال الرسائل
  socket.on("message", (data) => {
    if (data && data.room) {
      socket.to(data.room).emit("message", { text: data.text });
    }
  });

  // إنهاء الجلسة
  socket.on("leave", (room) => {
    socket.to(room).emit("partner_left");
    socket.leave(room);
  });

  // عند خروج المستخدم
  socket.on("disconnect", () => {
    console.log("❌ مستخدم خرج:", socket.id);
    if (waiting === socket.id) waiting = null;
  });
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`)
);
