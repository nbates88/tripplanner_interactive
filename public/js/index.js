$(document).ready(function(){
	hotels.forEach(function(hotel){
		$('#hotel-choices').append($('<option>').text(hotel.name).attr('value', hotel.name));
	})

	restaurants.forEach(function(restaurant){
		$('#restaurant-choices').append($('<option>').text(restaurant.name).attr('value', restaurant.name));
	})

	activities.forEach(function(activity){
		$('#activity-choices').append($('<option>').text(activity.name).attr('value', activity.name));
	})

	$('.btn-primary').on('click', function(event){
		// console.log( $(this.option))
		// $('select').val();

		console.log($('select').val());

		// alert($('this').$('.select').val());
		// alert($("this:selected", this).val());
		// alert($(this).find('option:selected').val());
		// alert($('option:selected',this).attr('value'));

		event.preventDefault();
	} )


})