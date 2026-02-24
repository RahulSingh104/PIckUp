const mongoose = require('mongoose');


function connectToDb() {
    if (!process.env.DB_CONNECT) {
        console.error("❌ DB_CONNECT is missing in .env");
        process.exit(1);
    }

    mongoose.connect(process.env.DB_CONNECT)
        .then(() => console.log('✅ Connected to MongoDB'))
        .catch((err) => console.error('❌ DB Error:', err));
}

module.exports = connectToDb;