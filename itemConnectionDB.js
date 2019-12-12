const item1=require("./postItem");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "orhanpamuk77",
 // database: "ice_creamDB"
 database:"itemDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  console.log(item1);
  createItem();
  
});

function createItem() {
  console.log("Inserting a new item...\n");
  var query = connection.query(
    "INSERT INTO item SET ?",
    {
      title=item1.title,
      category=item1.category,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " items inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      //updateProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}



/*function updateProduct() {
  console.log("Updating all Rocky Road quantities...\n");
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        quantity: 100
      },
      {
        flavor: "Rocky Road"
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      deleteProduct();
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}


function deleteProduct() {
  console.log("Deleting all strawberry icecream...\n");
  connection.query(
    "DELETE FROM products WHERE ?",
    {
      flavor: "strawberry"
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}*/

function readItems() {
  console.log("Selecting all items..\n");
  connection.query("SELECT * FROM item", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}
