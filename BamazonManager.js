// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `BamazonManager.js`. Running this application will:
var mysql = require('mysql');
var inquirer = require('inquirer');
var table=require('text-table');

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
    // console.log("connected as id " + connection.threadId);
   
});

// 	* List a set of menu options: 
// 		* View Products for Sale 
// 		* View Low Inventory
// 		* Add to Inventory
// 		* Add New Product

var mgrMenu = function() {
    console.reset();
    // console.log(table(action));
    inquirer.prompt({
        name: "choice",
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

        switch(answer.choice) {
            case 'View Products for Sale':
                viewSales();
            break;

            case 'View Low Inventory':
                viewStocklow();
            break;

            case 'Add to Inventory':
                addInv();
            break;

            case 'Add New Product':
                addProdnew();

            break;

        }
    })
}


// 	* If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
function viewSales(){
    console.reset();
	connection.query('SELECT * FROM products ORDER BY DepartmentName, ItemID', function(err, respond){
		// console.log(respond);
        buildTable(respond);

	});
	//Ask user to go back to main menu
    returnTomenu();
}


// 	* If a manager selects `View Low Inventory`, then it should list all items with a inventory count lower than five.
function viewStocklow(){

   console.reset();
    connection.query('SELECT * FROM products WHERE StockQuantity < ?', 
        [5],
        function(err, respond){
            // console.log(respond);
        // console.log(respond);
        buildTable(respond);

        });
        returnTomenu();

}

// 	* If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store. 
function addInv(){
    
    console.reset();

    connection.query('SELECT * FROM products', function(err, respond){

        buildTable(respond);

        inquirer.prompt([{
        //******************question 1
        name: "item",
        type: "input",
        message: "Which product you wish to adjust inventory? (Select item ID)",
        validate: function(value){
            if (isNaN(value) == false){
                return true;
            } else {
                return false;
            }
        }
        //******************question 2
    }, {
        name: "quantity",
        type: "input",
        message: "How many unit you want to buy?"
        
    }]).then(function(answer){

            console.log("");
            var quantityAdd=parseInt(answer.quantity);
            connection.query("SELECT * FROM products WHERE ?", [{
                itemID: answer.item
            }], function(err, respond) {

                var totalQty=respond[0].StockQuantity+quantityAdd;

                console.log("===========================");
                console.log("Selected ItemID =" + respond[0].ItemID);
                console.log("Selected Product = "+ respond[0].ProductName);
                console.log("Add Quantity units = "+quantityAdd);
                console.log("The total quantity will be "+totalQty);
                console.log("===========================");
                connection.query("UPDATE products SET? WHERE?",[{
                    StockQuantity:totalQty
                },{
                    itemID: answer.item
                }],function(err, respond){
                    console.log("Inventory updated!");
                   
                //asking if need another transaction
                inquirer.prompt({
                    name: "update",
                    type: "list",
                    message: "Another transaction? ",
                    choices: ["YES","NO"] 
                }).then(function(answer){
                    if(answer.update=="YES"){
                        addInv();
                    } else {
                        mgrMenu();
                    }
                });
                //=========end of asking ============
                });                
            });
        });
    });
}


// 	* If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
function addProdnew(){
    //list all the product existing in the database
        console.reset();
        connection.query('SELECT * FROM products', function(err, respond){
        buildTable(respond);
    // });
    //Allow manager to add "new product" in the database
    inquirer.prompt([{
        //******************question 1
        name: "prodName",
        type: "input",
        message: "What is your product name?"
    },{
        //******************question 2
        name: "deptName",
        tyep: "input",
        message: "What Department does this product belong to?"
    },{
        //******************question 3
        name: "price",
        type: "input",
        message: "What is the sale unit price?"
    },{
        //******************question 4
        name: "quantity",
        type: "input",
        message: "What is the quantity?"
    }]).then(function(answer) {
        console.log(answer);
        var post = {
                ProductName: answer.prodName,
                DepartmentName: answer.deptName,
                Price: answer.price,
                StockQuantity: answer.quantity
        }
        console.log(post);
        connection.query('INSERT INTO products SET ?', post, function(err,respond){
            console.log("Product is updated!");
                //asking if need another transaction
                inquirer.prompt({
                    name: "update",
                    type: "list",
                    message: "Add another product? ",
                    choices: ["YES","NO"] 
                }).then(function(answer){
                    if(answer.update=="YES"){
                        addProdnew();
                    } else {
                        mgrMenu();
                    }
                });
                //=========end of asking ============

        });
    });
    });
}


//build table function
function buildTable(respond){

        var built = [[],['ItemID','ProductName','DepartmentName','Price(US$)','Quantity'],['-----','-----------','--------------','-----------','--------']];
        for (var i=0; i<respond.length; i++){

            var r = [
                respond[i].ItemID,
                respond[i].ProductName,
                respond[i].DepartmentName,
                respond[i].Price.toFixed(2),
                respond[i].StockQuantity
                ]
            built.push(r);   
        }
        var s={align: ['l','l','l','r','r']}
        var t = table(built,s);
        console.log(t);
}

function returnTomenu(){

    console.log("=========================");
    inquirer.prompt({
        name: "returnTomenu",
        type: "input",
        message: "Back to Menu [Enter] ",
    
    }).then(function(answer){
        // console.log(answer);
        mgrMenu();

    })
    console.log("");
    console.log("=========================");}


console.reset = function (){
  return process.stdout.write('\033c');
}

mgrMenu();
