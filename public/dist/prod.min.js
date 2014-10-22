(function(w,d) {
	console.log('word up');


	// var quantityRows = $('.quantity');
	// quantityRows = Array.prototype.slice.call(quantityRows);


	function getQuantities(){
		// function changeHandler(entry, total, price, value) {
		// 	// put the totals in the total column.
		// 	var oldValue = value;
		// 	return function() {
		// 		if (parseInt(this.value,10) === 0) {
		// 			var rem = confirm('Are you sure you want to remove the item?');
		// 			if (rem) {
		// 				entry.parentNode.remove();
		// 				calculatePrice();
		// 				return;
		// 			} else {
		// 				this.value = oldValue;
		// 			}
		// 		}
		// 		total.innerText = parseInt(this.value, 10) * price;
		// 		oldValue = this.value;
		// 		calculatePrice();	 		
		// 	}
		// }

		// quantityRows.each(function(entry) {
		//   	console.log('yo');
		//   	var select = $(entry).find('select');
		//     var quantity = parseInt(select.value, 10);
		//     console.log(quantity);
		//     // var total = entry.parentNode.querySelector('.total-price');
		//     // var price = parseInt(entry.parentNode.querySelector('.price').innerText, 10);
		//     // var value = select.value;
		//     // total.innerText = quantity * price;
		//     // select.addEventListener('change', changeHandler(entry, total, price, value));
		// });



		// quantityRows.forEach(function(entry) {
		// 	var select = entry.querySelector('select');
		//     var quantity = parseInt(select.value, 10);
		//     var total = entry.parentNode.querySelector('.total-price');
		//     var price = parseInt(entry.parentNode.querySelector('.price').innerText, 10);
		//     var value = select.value;
		//     total.innerText = quantity * price;
		//     select.addEventListener('change', changeHandler(entry, total, price, value));
		// });
	}


	// function calculatePrice(){
	// 	var totalPrice = 0;
	// 	//Need to redifne quantity rows incase they get removed, the price will not update unless we requery the rows. 
	// 	var quantityRows =  document.querySelectorAll('.quantity');
	// 	quantityRows = [].slice.call(quantityRows);

	// 	quantityRows.forEach(function(entry) {
	// 		var itemTotal = parseInt(entry.parentNode.querySelector('.total-price').innerText, 10);
	// 		totalPrice += itemTotal
	// 		return totalPrice;
	// 	});
	// 	populateSubtotal(totalPrice);
	// 	valueAddedTax(totalPrice);
	// }

	// function populateSubtotal(subtotalPrice){
	// 	var subtotal = document.querySelector('.subtotal-price');
	// 	subtotal.innerText = subtotalPrice;
	// }

	// function valueAddedTax(subtotalPrice){
	// 	var vatField = document.querySelector('.total-vat-price');
	// 	var vat = (0.2 * subtotalPrice);
	// 	vatField.innerText = vat;
	// 	calculateTotalPrice(subtotalPrice, vat);
	// }

	// function calculateTotalPrice(subtotalPrice, vat){
	// 	var totalWithVAT = document.querySelector('.total-price-inc-vat');
	// 	var grandTotal = subtotalPrice + vat;
	// 	totalWithVAT.innerText = grandTotal;
	// }

	// function removeItemClick(){
	// 	quantityRows.forEach(function(el){
	// 		var el = el.parentNode.querySelector('.remove');
	// 		el.addEventListener('click', function(){
	// 			el = el.parentNode;
	// 			var rem = confirm("Blah");
	// 			if (rem) {
	// 				el.remove();
	// 				calculatePrice();
	// 			}
	// 		});
	// 	});
	// }
	getQuantities();
	// calculatePrice();
	// removeItemClick();
})(window,document);
