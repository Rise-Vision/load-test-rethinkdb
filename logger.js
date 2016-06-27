const logfile = "logfile.txt",
      fs = require("fs");

module.exports = {
  log(data) {
    if (typeof data !== "string") {data = require("util").inspect(data);}
    if (data === "undefined") {return;}
    fs.appendFileSync(logfile, (new Date()) + " " + data + "\n");
  }
};

