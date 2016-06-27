const logger = require("./logger.js"),
      messages = require("@horizon/client/dist/horizon")
      ({host: "104.197.145.237:8181"})
      ("messages");

listenForChanges(process.argv[2]);

function listenForChanges(id) {
  messages.find(id)
  .watch().subscribe((message)=>{
    logger.log(`Change: ${JSON.stringify(message)}`);
  }, logger.log);
}
