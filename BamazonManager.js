// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `BamazonManager.js`. Running this application will:
var mysql = require('mysql');
var inquirer = require('inquirer');
require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
});


//Test connection
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

   
});

// 	* List a set of menu options: 
// 		* View Products for Sale 
// 		* View Low Inventory
// 		* Add to Inventory
// 		* Add New Product
var mgrMenu = function() {
    console.reset();
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale", 
            "View Low Inventory", 
            "Add to Inventory", 
            "Add New Product" 
        ]
    }).then(function(answer) {
    	// console.log(answer.action);
        switch(answer.action) {
            case 'View Products for Sale':
                viewSales();
            break;

            case 'View Low Inventory':
                viewStocklow();
            break;

            case 'Add to Inventory':
                addInv();
            break;

            case 'add New Product':
                addProdnew();
            break;

        }
    })
}




// 	* If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function viewSales(){
    // console.reset();
	connection.query('SELECT * FROM products', function(err, respond){
		console.table(respond); 
	});
	//Ask user to go back to main menu
    returnTomenu();
    
}
// 	* If a manager selects `View Low Inventory`, then it should list all items with a inventory count lower than five.
function viewStocklow(){
   // console.reset();
    connection.query('SELECT * FROM products WHERE StockQuantity < ?', 
        [5],
        function(err, respond){
            // console.log(respond);
        console.table(respond); 
        });

    //go back to main menu.
    returnTomenu();
   


}
// 	* If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store. 
function addInv(){
    //Need to display all inventory so manager can select item to add.
        connection.query('SELECT * FROM products', function(err, respond){
        console.table(respond); 
    });

    //prompt how many he wants to add for the selected item.


}
// 	* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProdnew(){
    //list all the product existing in the database
        connection.query('SELECT * FROM products', function(err, respond){
        console.table(respond); 
    });
    
    //Allow manager to add "new product" in the database

}

function returnTomenu(){

    console.log("=========================");
    inquirer.prompt({
        name: "returnTomenu",
        type: "input",
        message: "Back to Menu [Enter] ",
    
    }).then(function(answer){
        // console.log(answer);
        if(answer.returnTomenu.toUpperCase()==""){
            mgrMenu();  
        } else {
            mgrMenu(); 
        }

    })
    console.log("");
    console.log("=========================");}

console.reset = function (){
  return process.stdout.write('\033c');
}

mgrMenu();