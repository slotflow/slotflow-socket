# 🔌 SlotFlow – Realtime Module

This repository contains the **Realtime Module** of the SlotFlow application. It is responsible for handling **real-time features** like:

- 💬 Chat System (✅ Implemented)
- 🎥 Video Calling (🚧 In Development)
- 🔔 Notification System (🚧 In Development)

This module is designed to work **alongside the monolithic backend**, offering a microservice-like experience for better scalability and separation of concerns.

---

## 🚀 Tech Stack

- **Language**: TypeScript
- **Runtime**: Node.js
- **Framework**: Express.js
- **WebSocket**: Socket.IO (for chat & signaling)
- **Authentication**: JWT-based (via shared token from main backend)
- **Database**: MongoDB (via Mongoose)
- **State Sync**: Upstash Redis (optional pub/sub or chat caching)





