function buscar(ip){
    //Agafem els valors del HTML
	var city = $("#city" ).val();
	var category = $("#category" ).val();
	var price = $("#price" ).val();

	//Construim la url on anirem a buscar les dades.
	url = 'https://' + ip + '.herokuapp.com/api/restaurants/?';
	url += (category)? 'category='+category : '';

	url += (city)? '&city='+city : '';

	url += (price)? '&price_average='+price : '';

    //Utilitzem la funcio getJSON per obtenir el JSON de la api i extreure'n les dades.
	$.getJSON( url, function( data ) {
		var items = [];
		var temp = [];
        //Aquesta funcio la cridem per cada ip que li passem, si no hi ha dades ens diu que no hi han coincidencies
		items.push( "<p>For " + ip + ":</p>" );
		if(data["count"] == 0){
			items.push("<p>No s'ha trobat cap coincidencia amb les dades introduides</p>")
			items.push( "-------------" );
		}
		else{
		    //iterem per tots els restaurants i extreiem les dades.
			for (var i=0; i < data["count"] ; i++ ){
				var dades = [];

				dades.push( "<p><b> -Adress</b>: " + data["results"][i]["address"] + "</p>" );
				dades.push( "<p><b> -Capacity</b>: " + data["results"][i]["capacity"] + "</p>" );
				dades.push( "<p><b> -Category</b>: " + data["results"][i]["category"] + "</p>" );
				dades.push( "<p><b> -City</b>: " + data["results"][i]["city"] + "</p>" );
				dades.push( "<p><b> -Country</b>: " + data["results"][i]["country"] + "</p>" );
				dades.push( "<p><b> -Description</b>: " + data["results"][i]["menu_description"] + "</p>" );
				dades.push( "<p><b> -Name</b>: " + data["results"][i]["name"] + "</p>" );
				dades.push( "<p><b> -Price average</b>: " + data["results"][i]["price_average"] + "</p>" );
				dades.push( "<p><b> -Rate</b>: " + data["results"][i]["rate"] + "</p>" );

				dades.push( "-------------" );

				temp.push([parseInt(data["results"][i]["price_average"]), dades]);
			}
		}

		temp.sort(Comparator);

		for(var i = 0; i<temp.length; i++)
		{
			for(var j=0; j<temp[0][1].length; j++)
			{
				items.push(temp[i][1][j]);
			}
		}

        //Afegim els resultats al body de l'HTML
	  $( "<div/>", {
	    html: items.join( "" ),
		id: "Results"
	  }).appendTo( "body" );
	});
}

function Comparator(a, b) {
   if (a[0] < b[0]) return -1;
   if (a[0] > b[0]) return 1;
   return 0;
 }


function comparar(){
	var ips = $('#ips').text();

	ips = ips.slice(2, ips.length);
	ips = ips.slice(ips, -1);

	ips = ips.replace(/'/g, '');

	ips = ips.split(',');

	//Si s'ha fet alguna cerca abans l'esborrem.
	while($('#Results').length>0){
		$('#Results').remove();
	}

	//Per cada ip cridem a la funcio buscar
	ips.forEach(function (arrayItem) {
		arrayItem = arrayItem.replace(' ', '');
		buscar(arrayItem);
	});
}