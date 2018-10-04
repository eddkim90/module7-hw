(function() {
    'use strict';

    // Insert Module, Controllers, and Service
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    // Pre-Populated Groceries
    var toBuyGroceries = [
        { name: "Pepsi", quantity: 10 },
        { name: "Oreos", quantity: 2 },
        { name: "Beyond Meat Burger Patties", quantity: 3 },
        { name: "Chicken Breast", quantity: 1 },
        { name: "Broccoli", quantity: 1 },
        { name: "Tomatoes", quantity: 3 }
    ];

    // Bought Groceries Array
    var boughtGroceries = [];

    // To Buy Controller
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var itemAdder = this;

        itemAdder.itemName = "";
        itemAdder.itemQuantity = "";
        itemAdder.toBuyGroceries = ShoppingListCheckOffService.displayAllToBuy();
        itemAdder.moveGrocery = function(itemIndex) { ShoppingListCheckOffService.moveGrocery(itemIndex); };
        itemAdder.listCount = function() {
            ShoppingListCheckOffService.listCount(toBuyGroceries);
        };
    }

    // Already Bought Controller
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var itemBought = this;

        itemBought.itemName = "";
        itemBought.itemQuantity = "";
        itemBought.boughtGroceries = ShoppingListCheckOffService.displayAllBought();
        itemBought.listCount = function() {
            ShoppingListCheckOffService.listCount(boughtGroceries);
        };
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
            console.log("ToBuy Groceries: " + toBuyGroceries);
            return toBuyGroceries;
        };

        // Display all the groceries bought
        service.displayAllBought = function() {
            console.log("Bought Groceries: " + boughtGroceries);
            return boughtGroceries;
        };

        // Item Count
        service.itemCount = function(list) {
            return list.length;
        };

        // Move From ToBuy to Bought
        service.moveGrocery = function(indexPosition) {
            boughtGroceries.push(toBuyGroceries[indexPosition]);
            toBuyGroceries.splice(indexPosition, 1);
        }
    }

})();