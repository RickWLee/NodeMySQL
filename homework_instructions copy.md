#Week of 12 HW: Node.js & MySQL

### Overview

In this activity, you'll be creating an Amazon-like storefront with the MySQL skills you learned this week. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus task, you can program your app to track product sales across your store's departments and then provide a summary of the highest-grossing departments in the store. 

Make sure you save and require the MySQL and Prompt npm packages in your homework files--your app will need them for data input and storage.

### Submission Guide

Make sure you use the normal GitHub and Heroku process. This time, though, you need to include screenshots and/or a video showing us that you got the app working with no bugs. You can include these screenshots or a link to a video in a `README.md` file. 

If you haven't written a markdown file yet, [click here for a rundown](https://guides.github.com/features/mastering-markdown/), or just take a look at the raw file of these instructions.

#### Instructions:

------------------------------------

### Challenge #3: Executive View (Final Level)

1. Create a new MySQL table called `Departments`. Your table should include the following columns:

	* DepartmentID

	* DepartmentName

	* OverHeadCosts (A dummy number you set for each department)

	* TotalSales

2. Modify your `BamazonCustomer.js` app so that when a customer purchases anything from the store, the program will calculate the total sales from each transaction.
	* Add the revenue from each transaction to the `TotalSales` column for the related department.
	* Make sure your app still updates the inventory listed in the `Products` column.

3. Create another Node app called `BamazonExecutive.js`. Running this application will list a set of menu options: 
	* View Product Sales by Department 
	* Create New Department

4. When an executive selects `View Product Sales by Department`, the app should display a summarized table in their terminal/bash window. Use the table below as a guide. 

	| DepartmentID | DepartmentName | OverHeadCosts | ProductSales | TotalProfit |
	|--------------|----------------|---------------|--------------|-------------|
	| 01           | Electronics    | 10000         | 20000        | 10000       |
	| 02           | Clothing       | 60000         | 100000       | 40000       |


5. The `TotalProfit` should be calculated on the fly using the difference between `OverheadCosts` and `ProductSales`. `TotalProfit` should not be stored in any database. You should use a custom alias. 

6. If you can't get the table to display properly after a few hours, then feel free to go back and just add `TotalProfit` to the `Departments` table.

	* Hint: You will need to use joins to make this work. 

	* Hint: You may need to look into grouping in MySQL.

	* **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)

-------
### One More Thing
If you have any questions about this project or about the material we covered, the instructor and your TAs are only a Slack message away.

**Good Luck!**

## Copyright
Coding Boot Camp (C) 2016. All Rights Reserved.