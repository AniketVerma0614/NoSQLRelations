//user.js
const mongoose = require('mongoose');

main()
    .then(() => console.log("Connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    addresses: [
        {   
            _id: false,
            location: String,
            city: String,
        }
    ]
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "sherlockhomes",
        addresses: [{
            location: "221B Baker Street",
            city: "London"
        }]
    });

    user1.addresses.push({ location: "P32 WallStreet", city: "London" });

    let result = await user1.save();
    console.log(result);
}

addUsers();


