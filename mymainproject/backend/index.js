// To connect with your MongoDB database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'mymainprojectdb',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Connected to mainproject database');
});

// Schema for users of the app
const UserSchema = new mongoose.Schema({
    ename: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    remarks: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Enquiries = mongoose.model('enquiries', UserSchema);
Enquiries.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, resp) => {
    resp.send("App is Working");
});

app.post("/register", async (req, resp) => {
    try {
        const enquiry = new Enquiries(req.body);
        let result = await enquiry.save();
        result = result.toObject();
        if (result) {
            delete result.password;
            resp.send(req.body);
            console.log(result);
        } else {
            console.log("Could not store enquiry");
        }
    } catch (e) {
        console.error("Error storing enquiry:", e);
        resp.status(500).send("Something went wrong");
    }
});

app.listen(5000, () => {
    console.log("App is listening on port 5000");
});
