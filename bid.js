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
    password: "abmis",
    database: "ice_creamDB"
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
            choices:[{title:"Post", value:"post"},{title:"Bid", value:"bid"} ]
    
        }]);
      if (responseInitial.action === "bid"){
          bidItem();
      }else if (responseInitial.action === "post")
      postItem();
      })();
}

//console.log("... Testing")
function postItem(){
(async () => {
    const response = await prompts([{
        type: 'text',
        name: 'name',
        message: 'What is the name of your Item?'

    },{
        type: 'number',
        name: 'bid',
        message: 'What is the initial bid of this Item?'

    }]);
  console.log(response)
  })();




}