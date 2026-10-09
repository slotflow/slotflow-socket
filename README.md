<div align="center">

# SlotFlow Socket Service

### Real-time communication, simplified.

A dedicated real-time communication microservice powering SlotFlow's messaging, presence, appointment coordination, WebRTC signaling, and event-driven workflows.

  <img src="https://img.shields.io/badge/Service-Real--Time_Communication-6C63FF?style=for-the-badge" alt="Real-Time Communication" />
  <img src="https://img.shields.io/badge/Architecture-Microservices-6C63FF?style=for-the-badge" alt="Microservices" />
  <img src="https://img.shields.io/badge/Runtime-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Deployment-AWS_EC2-232F3E?style=for-the-badge&logo=amazonec2&logoColor=white" alt="AWS EC2" />

---

### Live link & Repositories

  <a href="https://slotflow.online">
    <img src="https://img.shields.io/badge/Live_Application-SlotFlow-181717?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Application" />
  </a>
  <a href="https://github.com/slotflow">
    <img src="https://img.shields.io/badge/GitHub-SlotFlow-181717?style=for-the-badge&logo=github&logoColor=white" alt="SlotFlow GitHub" />
  </a>

### Technology Stack

  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=black" alt="Upstash" />
  <img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="Apache Kafka" />
  <img src="https://img.shields.io/badge/KafkaJS-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="KafkaJS" />
  <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" alt="AWS S3" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge" alt="Zod" />
<img src="https://img.shields.io/badge/OpenTelemetry-7B3FF2?style=for-the-badge&logo=opentelemetry&logoColor=white" alt="OpenTelemetry" />
<img src="https://img.shields.io/badge/Tempo-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana Tempo" />
<img src="https://img.shields.io/badge/Loki-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana Loki" />
<img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" alt="Prometheus" />
<img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white" alt="Grafana" />
<img src="https://img.shields.io/badge/Winston-logging-231F20?style=for-the-badge" alt="Winston logging" />
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />

</div>

---

## Overview

The **SlotFlow Socket Service** is a real-time communication microservice within the SlotFlow appointment booking platform. It provides Socket.IO-based communication and HTTP endpoints for messaging and related real-time workflows.

The service integrates with MongoDB for persistent message data, Upstash Redis for transient state and coordination, Apache Kafka for event-driven processing, and AWS S3 for chat image storage.

It also provides socket namespaces for chat, application events, and video signaling, allowing real-time communication workloads to operate independently of the main application backend.

The service is deployed on **AWS EC2** and integrates with the broader SlotFlow backend architecture.

---

## Core Features

### Real-Time Messaging

- One-to-one messaging using Socket.IO
- Dedicated chat namespace
- HTTP endpoints for retrieving and sending messages
- Chat image uploads
- Image storage using AWS S3
- Signed URLs for accessing stored images
- Persistent message storage in MongoDB

### Socket Connection Management

- Dedicated Socket.IO namespaces
- Real-time connection and disconnection handling
- User-related socket state
- Redis-backed transient socket data
- Chat presence and typing-related state

### Video Signaling

- Dedicated video namespace
- Socket-based signaling events for WebRTC workflows
- Real-time signaling communication between connected clients

The service provides signaling transport; media transport itself is handled by the WebRTC clients and their associated network infrastructure.

### Application Events

- Dedicated events namespace
- JWT-cookie verification for the events namespace
- Subscription-related event processing
- Real-time application event delivery

### Appointment Slot Coordination

- Redis-backed appointment slot locks
- Temporary lock expiration
- Coordination for provider appointment slot workflows

The configured slot-lock TTL is 15 minutes.

### Event-Driven Processing

- Kafka consumer integration
- Subscription event processing
- Processed-event tracking in MongoDB
- Retry and dead-letter processing workflows
- Configurable Kafka topics and consumer groups

### Observability

- OpenTelemetry instrumentation
- OTLP-based telemetry export
- Application logging using Winston
- Metrics collection
- Distributed tracing integration

---

## Technology Stack

### Runtime & Backend

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/Socket.IO_4-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.IO 4" />
  <img src="https://img.shields.io/badge/ES_Modules-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="ES Modules" />
  <img src="https://img.shields.io/badge/pnpm-10.28.1-F69220?style=for-the-badge&logo=pnpm&logoColor=white" alt="pnpm" />
</p>

### Data & Messaging

<p align="left">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
  <img src="https://img.shields.io/badge/Upstash-00E9A3?style=for-the-badge&logo=upstash&logoColor=black" alt="Upstash Redis" />
  <img src="https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="Apache Kafka" />
  <img src="https://img.shields.io/badge/KafkaJS-231F20?style=for-the-badge&logo=apachekafka&logoColor=white" alt="KafkaJS" />
</p>

### Storage & Security

<p align="left">
  <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" alt="AWS S3" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge" alt="Zod" />
</p>

### Logging & Observability

<p align="left">
  <img src="https://img.shields.io/badge/Winston-231F20?style=for-the-badge" alt="Winston" />
  <img src="https://img.shields.io/badge/OpenTelemetry-000000?style=for-the-badge&logo=opentelemetry&logoColor=white" alt="OpenTelemetry" />
  <img src="https://img.shields.io/badge/OTLP-5C2D91?style=for-the-badge" alt="OTLP" />
</p>

### Infrastructure & Deployment

<p align="left">
  <img src="https://img.shields.io/badge/AWS_EC2-232F3E?style=for-the-badge&logo=amazonec2&logoColor=white" alt="AWS EC2" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white" alt="AWS" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
</p>

---

## Architecture

The Socket Service sits behind the SlotFlow API Gateway and provides real-time communication and message-related HTTP endpoints.

```mermaid
flowchart TD
    Client["SlotFlow Client"] --> Gateway["SlotFlow API Gateway"]
    Gateway --> Socket["SlotFlow Socket Server"]

    Backend["Main Backend Service"] <--> Kafka[["Apache Kafka"]]
    Notification["Notification Service"] <--> Kafka
    Payment["Payment Service"] <--> Kafka
    Kafka <--> Socket

    Socket <--> Redis[("Upstash Redis")]
    Socket <--> AWS-S3[("AWS S3")]
    Socket <--> MongoDB[("MongoDB")]

    Socket --> OTEL["OpenTelemetry / OTLP"]
```

### Architecture Principles

- Dedicated microservice for real-time workloads
- Socket.IO namespaces for separating communication domains
- HTTP endpoints for message operations
- MongoDB for persistent message and processed-event records
- Redis for temporary state and slot coordination
- Kafka for asynchronous event processing
- AWS S3 for chat image storage
- OpenTelemetry for application telemetry
- Environment-based service configuration

---

## Socket Namespaces

The service exposes three Socket.IO namespaces.

| Namespace | Purpose                                             |
| --------- | --------------------------------------------------- |
| `/chat`   | Real-time chat, presence, and typing-related events |
| `/events` | Application and subscription-related events         |
| `/video`  | WebRTC signaling communication                      |

### Chat Namespace

The chat namespace supports real-time messaging and related communication state.

Implemented event names identified during codebase inspection include:

- `sendMessage`
- `receiveMessage`
- `typing`
- `stopTyping`
- `joinRoom`
- `leaveRoom`

The precise payloads and acknowledgement behavior should be taken from the corresponding event handlers and shared event types in the source code.

### Events Namespace

The events namespace handles application-level real-time events, including subscription-related workflows.

Authentication for this namespace uses JWT verification through the token cookie.

### Video Namespace

The video namespace provides signaling communication used by WebRTC workflows.

It transports signaling messages between connected clients; it does not itself provide a media server.

---

## Data & Infrastructure

### MongoDB

MongoDB stores persistent data used by the service.

Identified data includes:

- Chat messages
- Processed Kafka event records

Processed-event records support tracking of Kafka events that have already been handled.

### Upstash Redis

Redis stores temporary state and coordination data.

Identified use cases include:

- Chat presence
- Appointment slot locks
- Signed URL caching
- Socket-related state cleanup

The configured appointment slot-lock TTL is **15 minutes**.

Socket cleanup targets keys matching `socket:*`; this should not be interpreted as a complete cleanup of every key used by the service.

### Apache Kafka

Kafka provides asynchronous event consumption.

The service includes:

- Configurable broker and consumer group settings
- Configurable subscription topic handling
- Processed-event tracking
- Retry and dead-letter processing

The subscription event handler identified during inspection processes `planSubscribed`. A Stripe-account-status topic is configured, but a corresponding mapped handler was not identified in the inspected code.

### AWS S3

AWS S3 is used for chat image storage.

The service supports generating signed URLs for image access, with expiration controlled through configuration.

---

## Security & Authentication

Authentication behavior differs by transport and namespace. Clients and gateway configuration must account for these differences.

| Interface           | Identified authentication behavior                                      |
| ------------------- | ----------------------------------------------------------------------- |
| HTTP message routes | Middleware reads identity headers such as `x-user-id` and `x-user-role` |
| `/events`           | Verifies a JWT supplied through a token cookie                          |
| `/chat`             | Uses user identity supplied through headers or query parameters         |
| `/video`            | Uses user identity supplied through headers or query parameters         |

## Observability

The service integrates with OpenTelemetry for telemetry collection and OTLP export.

### OpenTelemetry

Used for instrumentation and exporting supported telemetry to a configured collector or endpoint.

### Winston

Winston provides application logging.

### Metrics

The inspected configuration schedules metrics collection at a 10-second interval.

Actual metric availability depends on the instrumentation and exporter configuration.

## Project Structure

The service is organized around its server entry point, socket namespaces, HTTP routes, configuration, integrations, data models, and observability components.

```text
slotflow-socket/
│
├── src/
│   ├── server.ts
│   ├── express.d.ts
│   ├── config/
│   ├── presentation/
│   ├── infrastructure/
│   ├── domain/
│   ├── application/
│   ├── app/
│   ├── shared/
│   └── ...
│
├── Dockerfile
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .env
└── README.md
```

This is a conceptual overview. Keep the tree synchronized with the actual directories and files in the repository.

---

## Related Services

The Socket Service integrates with other services in the SlotFlow platform.

<p align="left">
  <a href="https://github.com/slotflow/slotflow-client">
    <img src="https://img.shields.io/badge/Frontend-slotflow--client-181717?style=for-the-badge&logo=github&logoColor=white" alt="SlotFlow Client" />
  </a>
  <a href="https://github.com/slotflow/slotflow-api-gateway">
    <img src="https://img.shields.io/badge/API_Gateway-slotflow--api--gateway-181717?style=for-the-badge&logo=github&logoColor=white" alt="API Gateway" />
  </a>
  <a href="https://github.com/slotflow/slotflow-backend-main">
    <img src="https://img.shields.io/badge/Main_Backend-slotflow--backend--main-181717?style=for-the-badge&logo=github&logoColor=white" alt="Main Backend" />
  </a>
  <a href="https://github.com/slotflow/slotflow-payment">
    <img src="https://img.shields.io/badge/Payment_Service-slotflow--payment-181717?style=for-the-badge&logo=github&logoColor=white" alt="Payment Service" />
  </a>
  <a href="https://github.com/slotflow/slotflow-api-notification">
    <img src="https://img.shields.io/badge/Notification_Service-slotflow--api--notification-181717?style=for-the-badge&logo=github&logoColor=white" alt="Notification Service" />
  </a>
  <a href="https://github.com/slotflow/slotflow-infra">
    <img src="https://img.shields.io/badge/Infrastructure-slotflow--infra-181717?style=for-the-badge&logo=github&logoColor=white" alt="Infrastructure" />
  </a>
</p>

---

## Project Highlights

- Dedicated real-time communication microservice
- Socket.IO namespaces for chat, application events, and video signaling
- HTTP message endpoints
- MongoDB-backed message persistence
- Redis-backed transient state and slot locks
- Kafka event consumption and processed-event tracking
- Retry and dead-letter processing workflows
- AWS S3 chat image storage
- Signed URL support
- OpenTelemetry instrumentation and OTLP export
- Winston application logging
- TypeScript-based Node.js implementation
- AWS EC2 deployment

---

## License

**Proprietary — All Rights Reserved**

Copyright © 2026 SlotFlow.

The SlotFlow Socket Service source code and associated assets are proprietary and confidential property of SlotFlow Technologies Private Limited.

No permission is granted to use, copy, modify, redistribute, sublicense, or commercialize this software without explicit written permission from SlotFlow.

Viewing the source code does not grant any license or rights to use, modify, distribute, or deploy the software.

All rights reserved.

---

<div align="center">

### SlotFlow Socket Service

**Real-time communication, simplified.**

<a href="https://slotflow.online">Live Application</a>
·
<a href="https://github.com/slotflow">GitHub Organization</a>

© 2026 SlotFlow Technologies Private Limited

</div>
