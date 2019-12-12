const inquirer = require("inquirer");
const prompts = require('prompts');
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "orhanpamuk77",
    database: "itemDB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    initialize();
  });

function initialize(){
    (async () => {
        const responseInitial = await prompts([{
            type: 'select',
            name: 'action',
            message: 'Please select an action...',
            choices:[{title:"Post", value:"post"},{title:"Bid", value:"bid"},{title:"Quit", value:"quit"} ]
    
        }]);
      if (responseInitial.action === "bid"){
          bidItem();
          //initialize();
      }else if (responseInitial.action === "post"){
      postItem();
      }
      else if(responseInitial.action==="quit"){connection.end();return;}})();
}

//console.log("... Testing")
function postItem(){
(async () => {
    const response = await prompts([{
        type: 'text',
        name: 'name',
        message: 'What is the name of your Item?'

    },{
      type: 'text',
      name: 'category',
      message: 'What is the category of your Item?'

      },{
        type: 'number',
        name: 'bid',
        message: 'What is the initial bid of this Item?'

    }]);
  console.log(response);
  createItem(response);
  readItems();
  })();

}

function createItem(response) {
  //console.log("Inserting a new item...\n");
  var query = connection.query(
    "INSERT INTO item SET ?",
    {
      title:response.name,
      category:response.category,
      current_bid:response.bid
    },
    function(err, res) {
      if (err) throw err;
      //console.log(res.affectedRows + " items inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      //updateProduct();
    }
  );

  // logs the actual query being run
  //console.log(query.sql);
}

function readItems() {
  console.log("Selecting all items..\n");
  connection.query("SELECT * FROM item", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    //connection.end();
    initialize();
  });
}
