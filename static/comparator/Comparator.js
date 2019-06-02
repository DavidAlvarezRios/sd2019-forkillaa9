function search(ip){
    var city = $("#inputCity").val();
    var category = $("#category_selector").val();
    var price = $("#inputPrice").val();

    url = 'https://'+ ip + '.herokuapp.com/api/restaurants/?';
    url += (category)? 'category='+category : '';
    url += (city)? '&city='+city : '';
    url += (price)? '&category='+price : '';

    $.getJSON(url, function ( data ){

        var items = [];
        var tmp = [];

        items.push("<p>For "+ip+":</p>");

        if(data["count"] == 0){
            items.push("<p>No hi ha dades per aquesta ip");
            items.push("---------------");
        }else{
            for(var i = 0; i < data["count"]; i++){
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

				tmp.push([parseInt(data["results"][i]["price_average"]), dades]);
            }
        }

        tmp.sort(comparator);

        for(var i = 0; i < tmp.length; i++){
            for(var j = 0; i < tmp[0][1].length; j++){
                items.push(tmp[i][1][j]);
            }
        }

        $( "<div/>", {
	    html: items.join( "" ),
		id: "Results"
	  }).appendTo("body");
    })




}

function comparator(a, b) {
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

	while($('#Results').length>0){
		$('#Results').remove();
	}

	ips.forEach(function (arrayItem) {
		arrayItem = arrayItem.replace(' ', '');
		search(arrayItem);
	});
}