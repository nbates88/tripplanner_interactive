
$(document).ready(function(){
	var itineraryArray = [];
	var dayObject = {
		hotels:[],
		restaurants: [],
		activities: []
	};
	var dayNumber = 1;

	initializeMap();
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
		var optionSelected = $(this).siblings().find('option:selected').val();
		var siblingId = $(this).siblings()[1].id;
		var itineraryId = "#my-" + siblingId;
		$(itineraryId).append($('<li>').text(optionSelected).append('<button class="btn btn-xs btn-danger remove btn-circle">x</button>'));
		var parentOptionSelected = $(this).siblings()[1];
		var optionSelectedType = $(parentOptionSelected).attr('data-type');

		var arrayTables = [{name: "hotels", data: hotels}, {name: "restaurants", data: restaurants}, {name: "activities", data: activities}];
	
		function findId(optionSelected, optionSelectedType){
			var foundId;
			arrayTables.forEach(function(i){
				if(i.name === optionSelectedType){
					i.data.forEach(function(table){
						
						if(table.name === optionSelected){

							foundId = table.placeId;
						};
					})
				}
			})
			return foundId;
		}

		function findLocationById(optionSelected, optionSelectedType){
			var foundId = findId(optionSelected, optionSelectedType);
			for(var i = 0; i < places.length; i++){
				if(places[i].id === foundId){
					return places[i].location;
				}
			}
		}

		var longLat = findLocationById(optionSelected, optionSelectedType);
		var long = longLat[0];
		var lat = longLat[1];

		drawMarker(optionSelectedType, longLat);

		function insertItineraryItems(optionSelected, optionSelectedType){
			if(itineraryArray.length === dayNumber){
				addToExistingDay(optionSelected, optionSelectedType);
			}
			// } else if (itineraryArray[dayNumber - 1] && dayNumber !== itineraryArray.length){
			// 	addToExistingDay(optionSelected, optionSelectedType);
			// } else{
			else{
				createDay(optionSelected, optionSelectedType);
			}
		}

		insertItineraryItems(optionSelected, optionSelectedType);
		console.log(itineraryArray);

		event.preventDefault();
	});

	$('ul').on('click', ".btn-danger", function(event){
		// var valueToDelete = $(this).parent()[0].innerText.slice(0, -1);
		$(this).parent()[0].remove()
		event.preventDefault();
	})

	var counter = 1;

	$('#day-add').on('click', function(event){
		counter++;
		// $('.day-buttons').append($('<button class="btn btn-circle day-btn day-added">').text(counter));
		$('.active').removeClass('active');
		$('<button class="btn btn-circle day-btn day-added">').text(counter).addClass('active').insertBefore("#day-add");
		dayNumber = counter;
	})

	$('.day-buttons').on('click', ".day-added", function(event){
		$('.active').removeClass('active');
		$(this).addClass('active');
		dayNumber = $(this).children().context.innerText;
		
	})

	function createDay(optionSelected, optionSelectedType){
		var createdDayObject = Object.create(dayObject);
		createdDayObject[optionSelectedType].push(optionSelected);
		itineraryArray.push(createdDayObject);
	}

	function addToExistingDay(optionSelected, optionSelectedType){
		itineraryArray[dayNumber-1][optionSelectedType].push(optionSelected);
	}

})
