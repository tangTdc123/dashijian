const mysql = require('mysql')

const db=mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'tdc520',
    database : 'my_db_01'
})
db.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + db.threadId);
  });

module.exports=db