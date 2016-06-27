const fork = require("child_process").fork,
      logger = require("./logger.js"),
      displayCount = 1000,
      forkedIds = [],
      horizon = require("@horizon/client/dist/horizon")({host: "104.197.145.237:8181"}),
      messages = horizon("messages");

horizon.status(logger.log);

messages.fetch().subscribe((docs)=>{
  logger.log(`itemcount: ${docs.length}`);
  forkDisplays(displayCount, docs);
  setInterval(fakeAChange.bind(null, docs), 10000);
},logger.log, logger.log);

function forkDisplays(remaining, docs) {
  if (!remaining) {return;}

  let id = docs[Math.floor(Math.random() * docs.length)].id,
  child = fork("./horizon-fake-display.js", [id], {detached: true});

  forkedIds.push(id);

  child.disconnect();
  child.unref();
  setTimeout(forkDisplays.bind(null, remaining - 1, docs), 500);
}

function fakeAChange(docs) {
  if (Math.random() > 0.05) {return;}
  let doc = {
    id: forkedIds[Math.floor(forkedIds.length * Math.random())],
    messageList: ["test"+Math.random()]
  };

  logger.log(`Fake change on ${JSON.stringify(doc)}`);
  messages.replace(doc);
}
