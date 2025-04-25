const { Client } = require("pg");

const client = new Client({
    host: "aws-0-us-east-1.pooler.supabase.com",
    port: 5432,
    user: "postgres.nlytbggsdcvgnyssrstf",
    password: "#hUJ4G#Xh3!ebr3",
    database: "postgres",
    ssl: { rejectUnauthorized: false }
});

client.connect((err) => {
    if (err) {
        console.error("Error conectando con la base de datos:", err.stack);
    } else {
        console.log("Conectado a la base de datos PostgreSQL");
    }
});

module.exports = client;