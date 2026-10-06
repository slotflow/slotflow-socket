export enum ChatSocketEnum {
    getOnlineUsers = "getOnlineUsers",
    typing = "typing",
    stopTyping = "stopTyping",
    connection = "connection",
    disconnect = "disconnect",
    newMessage = "newMessage"
}

export enum VideoSocketEnum {
    // Join the active call room.
    roomJoin = 'room:join',
    // Watch lobby updates for a call room.
    roomWatch = 'room:watch',
    // Stop watching lobby updates for a call room.
    roomUnwatch = 'room:unwatch',
    // Receive the current participants in a call room.
    roomState = 'room:state',
    // Notify the room that a participant joined.
    userJoined = 'user:joined',
    // Send a call offer to another participant.
    userCall = 'user:call',
    // Receive a call offer from another participant.
    incomingCall = 'incoming:call',
    // Return the answer to a call offer.
    callAccepted = 'call:accepted',
    // Send a WebRTC renegotiation offer.
    peerNegotiation = 'peer:nego:needed',
    // Return the answer to a renegotiation offer.
    peerNegotiationDone = 'peer:nego:done',
    // Receive the final renegotiation answer.
    peerNegotiationFinal = 'peer:nego:final',
    // Leave the active call room.
    roomLeave = 'room:leave',
    // Notify the room that a participant left.
    userLeft = 'user:left',
    // Notify that the video socket disconnected.
    disconnect = "disconnect"
}

export enum EventSocketEnum {
    // The socket connection is ready.
    connection = "connection",
    // The socket connection has ended.
    disconnect = 'disconnect',
    // Notify the user that their subscription is active.
    subscriptionActivated = 'subscription:activated',
    // Subscribe to updates for a provider.
    providerJoin = 'provider:join',
    // Request access to a provider's time slot.
    slotEngageRequest = 'slot:engage:request',
    // Notify that the slot request was rejected.
    slotEngageRejected = 'slot:engage:rejected',
    // Notify that the slot request was approved.
    slotEngageApproved = 'slot:engage:approved',
    // Stop receiving updates for a provider.
    providerLeave = 'provider:leave',
    // Notify that a time slot has been locked.
    slotLocked = 'slot:locked',
    // Request that a locked slot be released.
    slotUnlockRequest = 'slot:unlock:request',
    // Notify that a time slot is available again.
    slotUnlocked = 'slot:unlocked',
    // Notify that the provider's Stripe account status changed.
    stripeAccountStatusUpdated = 'stripe:account:status:updated',
}