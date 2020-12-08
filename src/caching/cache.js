const mongoose = require("mongoose");

// backup of default exec method
const exec = mongoose.exec.prototype.exec;
// overriding the default behaviour of exec
mongoose.Query.prototype.exec = function () {
  console.log("ADD CUSTOM LOGIC");
  // THEN run the default exec method
  return exec.apply(this, arguments);
};
