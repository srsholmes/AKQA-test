(function(w,d) {

	//Cache common selectors we need. 

	var $quantities = $('input[type=text].quantity'),
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
		$removeItem.each(function() {
			var $this = $(this);
			var input = $this.parent().parent().find('input');
			$this.on('click', function(event) {
				event.preventDefault();	
				$this.parent().parent().remove();
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
		$button.each(function() {
			var $this = $(this),
				input = $this.parent().parent().find('input');
			$this.on('click', function(event) {
				event.preventDefault();
				if($this.hasClass('plus')) {
					changeQuantity('inc', input);
				} else {
					changeQuantity('dec', input);
				}
			});
		});
	};

	//When the user types in an amount to the box, update the quantities
	function inputAmount() {
		$quantities.each(function() {
			var $this = $(this);
			$this.change(function() {
			  	var val = $this.val();
			  	changeQuantity(val, $this)
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
		var $costs = $('.cost span');
		var subtotal = 0.00;
		$costs.each(function() {
			var $this = $(this);
			var amount =  parseFloat($this.text().replace(/\u00A3/g, ''));
			subtotal = subtotal + amount;
		});
		var newSub = parseFloat(subtotal).toFixed(2);
		$('.subtotal span').text('£' + newSub);
		valueAddedTax(newSub);
	};

	//Calculate the VAT
	function valueAddedTax(newSub){
		var $vatField = $('.vat span'),
			vat = parseFloat((0.2 * newSub)).toFixed(2);
		$vatField.text('£' + vat);
		calculateTotalPrice(newSub, vat);
	}

	//Calculate the total price
	function calculateTotalPrice(newSub, vat){
		var $total = $('.total-cost');
		newSub = parseFloat(newSub);
		vat = parseFloat(vat);
		var total = parseFloat(newSub + vat).toFixed(2);
		$total.text('£' + total);
	}
	init();
	
})(window,document);
