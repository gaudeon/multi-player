// Export all Server callback routines here for the WebSocket Client to use.

var exports = exports || {};

var connections = {};

// The _internal methods can use "this" to access the main eurecaServer object
exports._internal = {};
exports._internal.onConnect = function (connection) {
    console.log('NEW Connection ', connection.id, connection.eureca.remoteAddress);
    var client = connection.clientProxy; //this.getClient(connection.id);
    //console.log("REAL CLIENT",client);
    connections[connection.id] = { name:null, client:client };
    // Run client.exports.setId function
    client.setId(connection.id);
};

exports._internal.onDisconnect = function (connection) {
    console.log('END Connection ', connection.id);
    delete connections[connection.id];
};

// These other callbacks hooks can use "this" to access client Socket object.
// The this.user.clientId is always the key in the connections[] hash
// The this.connection.clientProxy object is the same as connections[this.user.clientId].client object
// which contains all the callback methods (defined in hooks.js) ready to execute on the client

exports.handshake = function() {
    var id = this.user.clientId;
    var conn = connections[id];
    if (conn) {
        var client = conn.client;
        client.message("[SYSTEM] Handshake complete!");
    }
    console.log('HANDSHAKE from Client ID ' + id);
};

exports.login = function(name) {
    var id = this.user.clientId;
    var conn = connections[id];
    if (conn) {
        var client = conn.client;
        client.name = name;
        console.log('ClientID ' + id + ' logged in as: ' + name);
        client.message("[SYSTEM] Logged in as: " + name);
        return 1;
    }
    else {
        console.log('ClientID ' + id + ' does not exist');
        return 0;
    }
};
