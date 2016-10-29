
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
       
	connection.query('SELECT * FROM products', function(err, respond){
		// console.log(respond); 
        for (var i=0; i<respond.length; i++){
     
            console.log(respond[i].ItemID+"    "+respond[i].ProductName+"   |   Unit Price = USD$ "+respond[i].Price);
        }

    inquirer.prompt([{
        name: "item",
        type: "input",
        message:  "What product you are interested, please type itemID",
        validate: function(value){
            if (isNaN(value) == false){
                return true;
            } else {
                return false;
            }
        }
    }, {
        // The second message should ask how many units of the product they would like to buy.
        name: "quantityBuy",
        type: "input",
        message:  "How many units you want to buy?",
    }]).then(function(answer) {
        // console.log(answer);
        var quantityBuy= parseInt(answer.quantityBuy);
        // console.log(quantityBuy);
        connection.query("SELECT * FROM products WHERE ?", [{
                itemID: answer.item
            }], function(err, respond) {
                // console.log(respond);
                //cannot extract StockQuantity
                // console.log(respond[0].StockQuantity);
                // Check if the quantity is enough in the stock. if not show user "Insufficient quantity"
                if (respond[0].StockQuantity < quantityBuy){
                    console.log("Insufficient quantity!");
                    StartAgain();
                } else {
                    console.log("");
                    console.log("=========================================");
                    console.log("Selected order = "+ respond[0].ProductName);
                    console.log("Unit price = $"+ respond[0].Price);
                    console.log("Ordered quantity = "+parseInt(answer.quantityBuy));
                    console.log("=========================================");
                    console.log("");


                    //If the quantity is enough, fulfill customer's order and update the store
                    StockQuantity=respond[0].StockQuantity-parseInt(answer.quantityBuy);
                    // console.log(StockQuantity);
                    var Total= respond[0].Price*quantityBuy;
                    

                    connection.query("UPDATE products SET ? WHERE ?", [{
                        StockQuantity: StockQuantity
                    },{
                        itemID: answer.item
                    }], function(err, respond){
                        // console.log(respond);
                        console.log("Our inventory is updated!");
                        console.log("=========================================");
                        console.log("Total cost for your order is $",Total);
                        console.log("=========================================");
                        console.log("");
                        StartAgain();
                    });
      
                }
            });
        });
	});   
}


function StartAgain(){
    inquirer.prompt({
        name: "buyOrnot",
        type: "rawlist",
        message: "Would you like to have another purchase? ",
        choices: ["YES","NO"]
    }).then(function(answer){
        // console.log(answer);
        if(answer.buyOrnot.toUpperCase()=="YES"){
            listProduct();  
        } else {
            console.log("");
            console.log("Thank you for coming and have nice day!");
        }

    })

}


listProduct();

