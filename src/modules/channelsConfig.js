// Single place to edit when the channels backend moves off localhost (e.g. once
// deployed publicly). apiBaseUrl/hubUrl point at the ASP.NET Core + SignalR server
// (a separate process from the static frontend server).
export const apiBaseUrl = "http://localhost:5095";
export const hubUrl = `${apiBaseUrl}/hubs/channels`;

// STUN only for now (public, free, no account needed). TURN is required for
// reliable audio between arbitrary internet users behind restrictive NATs/firewalls
// -- add credentials here once a TURN service is provisioned; until then, calls
// between peers on restrictive networks may fail to connect.
export const iceServers = [
  { urls: "stun:stun.l.google.com:19302" }
];
