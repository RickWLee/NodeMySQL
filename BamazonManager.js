// ### Challenge #2: Manager View (Next Level)

// * Create a new Node application called `BamazonManager.js`. Running this application will:
var mysql = require('mysql');
var inquirer = require('inquirer');
// require('console.table');
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
// var action=[[1,"View Products for Sale"],
//             [2,"View Low Inventory"], 
//             [3,"Add to Inventory"], 
//             [4,"Add New Product"]];

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

            case 'add New Product':
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
        // console.table(respond);
        var built = [[],['ItemID','ProductName','DepartmentName','Price(US$)'],['-----','-----------','--------------','-----------']];
        for (var i=0; i<respond.length; i++){

            var r = [
                respond[i].ItemID,
                respond[i].ProductName,
                respond[i].DepartmentName,
                respond[i].Price.toFixed(2)
                ]

            built.push(r);   
        }
        var s={align: ['l','l','l','r']}
        var t = table(built,s);
        console.log(t);


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
        var built = [[],['ItemID','ProductName','DepartmentName','Quantity'],['-----','-----------','--------------','--------']];
        for (var i=0; i<respond.length; i++){

            var r = [
                respond[i].ItemID,
                respond[i].ProductName,
                respond[i].DepartmentName,
                respond[i].StockQuantity
                ]

            built.push(r);   
        }
        var s={align: ['l','l','l','r','r']}
        var t = table(built,s);
        console.log(t);

        });
        returnTomenu();

}

// 	* If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store. 
function addInv(){
    //Need to display all inventory so manager can select item to add.
        connection.query('SELECT * FROM products', function(err, respond){
        console.table(respond);
               inquirer.prompt([{
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
            },{
                name: "quantity",
                type: "input",
                message: "How many unit you want to buy?",
            }]).then(function(answer){

                var quantity=parseInt(answer.quantities);

                consolelog("");
                console.log("=========================================");
                console.log("Selected order = "+ respond[0].ProductName);
                console.log("Quantity will be added = "+ quantity);
                console.log("=========================================");
                console.log("");
                StockQuantity=respond[0].StockQuantity+quantity;


            })







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
