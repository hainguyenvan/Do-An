module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      // host: "127.0.0.1",
      host: "172.104.167.189",
      port: 7545,
      network_id: "*" // Match any network id
    }
  }
};
