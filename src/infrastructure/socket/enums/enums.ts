export enum ChatSocketEnum {
    getOnlineUsers = "getOnlineUsers",
    typing = "typing",
    stopTyping = "stopTyping",
    connection = "connection",
    disconnect = "disconnect"
}

export enum VideoSocketEnum {
    roomJoin = "room:join",
    userJoined = "user:joined",
    userCall = "user:call",
    incomingCall = "incoming:call",
    callAccepted = "call:accepted",
    peerNegotiation = "peer:nego:needed",
    peerNegotiationDone = "peer:nego:done",
    peerNegotiationFinal = "peer:nego:final",
    userLeft = "user:left",
    roomLeave = "room:leave",
    disconnect = "disconnect"
}

export enum EventSocketEnum {
    connection = "connection",
    disconnect = "disconnect",
    subscriptionActivated = "subscription:activated",
    providerJoin = "provider:join",
    slotEngageRequest = "slot:engage:request",
    slotEngageRejected = "slot:engage:rejected",
    slotEngageApproved = "slot:engage:approved",
    providerLeave = "provider:leave",
    slotLocked = "slot:locked",
    slotUnlockRequest = "slot:unlock:request",
    slotUnlocked = "slot:unlocked",
    stripeAccountStatusUpdated = "stripeAccountStatusUpdated",
}