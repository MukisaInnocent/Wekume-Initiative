const Database = require('better-sqlite3');
const db = new Database('./wekume_dev.sqlite');

const tables = db.prepare("SELECT name FROM sqlite_schema WHERE type='table'").all();
console.log(JSON.stringify(tables.map(t => t.name)));
