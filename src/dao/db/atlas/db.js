const mongoose = require("mongoose");
const { MONGO_URI } = require("../../../config/globals");

exports.getConnection = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
