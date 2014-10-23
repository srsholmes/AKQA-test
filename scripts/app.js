(function(w,d) {

	//Cache common selectors we need. 

	var $quantities = $('input.quantity'),
		$removeItem = $('.remove-item'),
		$thead = $('thead');

	function init() {
		console.log('init called');
		removeItems();
		plusMinus();
		inputAmount();
	}

	//Add a click event for when the bin is clicked and also check if it is the last row.
	function removeItems() {
		$removeItem.each(function(i, el) {
			var $el = $(el);
			var input = $el.parent().parent().find('input');
			$el.on('click', function(event) {
				event.preventDefault();	
				$el.parent().parent().remove();
				var $rows = $('tbody tr');
				//When the user gets to the last row
				if($rows.length < 1) {
					// $thead.remove();
					$('tbody').append('<p>Sorry, you have no items in your basket.</p>');
					$('input[type="submit"]').attr('disabled','disabled').addClass('disabled');
				}

				changeQuantity('removed', input);
			});
		});
	};

	//Deal with the plus and minus buttons.
	function plusMinus() {
		var $button = $('span.quantity button');
		$button.each(function(i, el) {
			var $el = $(el),
				input = $el.parent().parent().find('input');
			$el.on('click', function(event) {
				event.preventDefault();
				if($el.hasClass('plus')) {
					changeQuantity('inc', input);
				} else {
					changeQuantity('dec', input);
				}
			});
		});
	};

	//When the user types in an amount to the box, update the quantities
	function inputAmount() {
		$quantities.each(function(i, el) {
			var $el = $(el),
				//Need to declare the input to find the hidden fields as well so they update.
				input = $el.parent().parent().find('input');
			var oldVal = $el.val();
			$el.change(function() {
			  	var val = $el.val();
			  	//Check to see if the user inputs anything other than a number and if so revert it to its original state. 
			  	if (!isNaN(val)) {
					changeQuantity(val, input);
			  	} else {
			  		val = oldVal;
			  		changeQuantity(val, input);
			  	}		  	
			});
		});
	}

	//Deal with the change in quanities. Handles both text input and buttons
	function changeQuantity(change, input) {
		if(change == 'removed') quantity = 0;
		if(change =='inc' || change =='dec'){
			var quantity = input.val();
			//Handle if the user tries to do more than 10 or less than 0.
			if(quantity >= 10 && change == 'inc') return;
			if(quantity <= 0 && change == 'dec') return;
			change == 'inc' ? quantity++ : quantity--;
		} else {
			var quantity = change;
			//Handle if the user puts in more than 10, or a negative number.
			if(change > 10) quantity = 10;
			if(change < 0)  quantity = 0;
		}

		input.val(parseInt(quantity)).attr('value', parseInt(quantity));
		calculateCost(quantity, input);
		
	};


	//Calculates the costs of the individual items x quantities
	function calculateCost(quantity, input) {
		var row = input.parent().parent(),
			$itemPrice = row.find('.price span'),
			$itemCost = row.find('.cost span'),
			itemCost = parseFloat($itemPrice.text().replace(/\u00A3/g, '')).toFixed(2),
			qCost = parseFloat(quantity * itemCost).toFixed(2);

		$itemCost.text('£' + qCost);
		calculateSubtotal();
	};

	//Calculate the sub total of all the items
	function calculateSubtotal() {
		var $costs = $('.cost span'),
			subtotal = 0;
		$costs.each(function(i, el) {
			var $el = $(el);
			var amount =  parseFloat($el.text().replace(/\u00A3/g, ''));
			subtotal = subtotal + amount;
		});
		var newSub = parseFloat(subtotal);
		$('.subtotal span').text('£' + newSub.toFixed(2));
		valueAddedTax(newSub);
	};

	//Calculate the VAT
	function valueAddedTax(newSub){
		var $vatField = $('.vat span'),
			vat = 0.2 * newSub;
		$vatField.text('£' + vat.toFixed(2));
		calculateTotalPrice(newSub, vat);
	}

	//Calculate the total price
	function calculateTotalPrice(newSub, vat){
		var $total = $('.total-cost');
		var total = (newSub + vat).toFixed(2);
		$total.text('£' + total);
	}
	init();
	
})(window,document);
