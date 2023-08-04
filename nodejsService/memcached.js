const Memcached = require("memcached");

var memcached = new Memcached();
memcached.connect("memcached-svc", function (err, conn) {
    if (err) {
        console.log(conn.server, "error while memcached connection!!");
    }
});

module.exports = Memcached