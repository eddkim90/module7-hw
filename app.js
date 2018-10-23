(function() {
    'use strict';

    // Insert Module, Controllers, and Service
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .filter('TripleDollarFilter', TripleDollarFilter)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // Pre-Populated Groceries
    var toBuyGroceries = [
        { name: "Pepsi", quantity: 10, pricePerItem: 3.99 },
        { name: "Oreos", quantity: 2, pricePerItem: 4.99 },
        { name: "Beyond Meat Burger Patties", quantity: 3 , pricePerItem: 5.16},
        { name: "Chicken Breast", quantity: 1, pricePerItem: 12.34 },
        { name: "Broccoli", quantity: 1, pricePerItem: 4.99 },
        { name: "Tomatoes", quantity: 3, pricePerItem: 1.34 }
    ];

    // Bought Groceries Array
    var boughtGroceries = [];

    // To Buy Controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var itemAdder = this;
        
        itemAdder.quantity = "";

        itemAdder.toBuyGroceries = ShoppingListCheckOffService.displayAllToBuy();
        itemAdder.moveGrocery = function(itemIndex) { 
            console.log(itemAdder.quantity);
            ShoppingListCheckOffService.moveGrocery(itemIndex); 
        };
        itemAdder.calculateTotalPrice = function(itemIndex) {
            var currentItem = toBuyGroceries[itemIndex];
            return ShoppingListCheckOffService.calculateTotalPrice(currentItem);
        };
    }

    // Already Bought Controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var itemBought = this;

        itemBought.boughtGroceries = ShoppingListCheckOffService.displayAllBought();
        itemBought.calculateTotalPrice = function(item) {
            return ShoppingListCheckOffService.calculateTotalPrice(item);
        }
    }

    // Shopping List Check-Off Service
    function ShoppingListCheckOffService() {
        var service = this;

        // Add a new grocery
        service.addGrocery = function(itemName, itemQuantity) {
            // Crate a new item object
            var grocery = { name: itemName, quantity: itemQuantity };

            // Push the new item onto the pre-populated item.
            toBuyGroceries.push(grocery);
        };

        // Display all the groceries to buy
        service.displayAllToBuy = function() {
            return toBuyGroceries;
        };

        // Display all the groceries bought
        service.displayAllBought = function() {
            return boughtGroceries;
        };

        // Move From ToBuy to Bought
        service.moveGrocery = function(indexPosition) {
            console.log(toBuyGroceries[indexPosition]);
            boughtGroceries.push(toBuyGroceries[indexPosition]);
            toBuyGroceries.splice(indexPosition, 1);
        };

        // Calculate Total Price
        service.calculateTotalPrice = function(item) {
            return item.pricePerItem * item.quantity;
        };
    }

    // Custom Triple Dollar Filter
    function TripleDollarFilter() {
        return function(input, numOfDollarSigns, decimalPlaces) {
            return numOfDollarSigns + input.toFixed(decimalPlaces);
        };
    }

})();
