const mongoose = require("mongoose");

exports.getConnection = async () => {
  await mongoose.connect(
    "mongodb+srv://murreli:mO1v7AzKkZwl53z3@cluster0.k0hps.mongodb.net/ecommerce?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};
