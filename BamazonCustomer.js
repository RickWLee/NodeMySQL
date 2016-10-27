
// Then create a Node application called BamazonCustomer.js. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

//Create connection

var mysql = require('mysql');
var inquirer = require('inquirer');

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

//Display all products
var listProduct = function(){

	connection.query('SElECT * FROM products', function(err, respond){
		console.log(respond);
    inquirer.prompt([{
        name: "item",
        type: "input",
        message:  "What product you are interested, please type itemID",
    }, {
        // The second message should ask how many units of the product they would like to buy.
        name: "quantityBuy",
        type: "input",
        message:  "How many units you want to buy?",
    }]).then(function(answer) {
        console.log(answer);
        var quantityBuy= parseInt(answer.quantityBuy);
        console.log(quantityBuy);
        connection.query("SElECT StockQuantity FROM products WHERE ?", [{
                itemID: answer.item
            }], function(err, respond) {
                // console.log(respond);
                //cannot extract StockQuantity
                // console.log(respond[0].StockQuantity);
                // Check if the quantity is enough in the stock. if not show user "Insufficient quantity"
                if (respond[0].StockQuantity < quantityBuy){
                    console.log("Insufficient quantity!");
                    listProduct();
                } else {
                    //If the quantity is enough, fulfill customer's order and update the store
                    StockQuantity=respond[0].StockQuantity-parseInt(answer.quantityBuy);
                    console.log(StockQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        StockQuantity: StockQuantity
                    },{
                        itemID: answer.item
                    }], function(err, respond){
                        console.log("Quantity Update!");
                        listProduct();
                    });
      
                }
            });
        });
	});   
}




// // UPDATE [table] SET [column] = '[updated-value]' WHERE [column] = [value];

listProduct();


// Once the update goes through, show the customer the total cost of their purchase.