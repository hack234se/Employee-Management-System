const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

//database connection
const empmngtdb = async () => {
    try {
        mongoose.connect(
            "mongodb+srv://Nimisha:1234@cluster0.88ownqv.mongodb.net/employee?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (error) => {
                if (error) {
                    console.log("MongoDB is not connected" + error);
                } else {
                    console.log("MongoDB is connected");
                }
            }
        );
    } catch (error) {
        console.log(`Error ${error.message}`);
    }
};

module.exports = empmngtdb ;
