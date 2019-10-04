const functions = {
    flatarray: function(input){
        if(Array.isArray(input)){  // Check to see if the input is an array, if yes flatten it recursively
            return input.reduce(
                function flatthearray(store,value){
                    if(typeof value == "object" || typeof value == "number")  // checking if the value is not an object [] or number
                    {
                        if(Array.isArray(value)){        // if array item is an array, pass it to flatten function recursively
                            return store.concat(value.reduce(flatthearray,[]))
                        } else {                        // otherwise append it to resulting array
                            return store.concat(value)
                        }
                    } else {
                        throw new TypeError('input is not a number')
                    }
                }
                ,[]
            )
        } else {
            throw new TypeError('input not a array')
        }
    },
    GreatCircle: function(lat1,lon1,lat2,lon2){
        
        // converting the received latitudes and longitudes from degrees to radians
        lat1 *= Math.PI / 180;
        lon1 *= Math.PI / 180;
        lat2 *= Math.PI / 180;
        lon2 *= Math.PI / 180;
        
        /** Applying the Great Circle Distance Formula
         * 
         * Source https://en.wikipedia.org/wiki/Great-circle_distance
         * 
         * Computational formulas
         * */

        let lonDiff = lon2 - lon1;
        let upper = Math.pow(Math.cos(lat2) * Math.sin(lonDiff) , 2) + Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDiff) , 2);
        let lower = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lonDiff);
        let angle = Math.atan2(Math.sqrt(upper) , lower);
        return angle * 6371.009;            // Multiplying by Mean Spherical Radius of Earth(Km) to return value in Km.
    },
    SendCoupon: function() {

        const restaurant_lat = 25.096849, restaurant_lon = 55.173583;   // The Restaurant Latitude and Longitude
        let fs = require('fs');
        let jsonData = fs.readFileSync('./customer.json').toString().split("\n");   // reading the customer.json file
        
        let customerData =[]
        let shortlistedCustomer = []
        for(let i=0; i<jsonData.length; i++)                // JSON Parsing each object and pushing it into the customerData array
        {
            customerData.push(JSON.parse(jsonData[i]));
        }

        for(let i=0; i<customerData.length; i++)
        {   // Calculating  and storing the distance between the Restaurant and Customer using the Great Circle Function 
            customerData[i]["distance"] = this.GreatCircle(customerData[i].latitude,customerData[i].longitude,restaurant_lat,restaurant_lon)
        }
        shortlistedCustomer = customerData.filter(customer => customer.distance < 5) // Shortlisting the customers within 5km of the Restaurant

        shortlistedCustomer.sort(function(customer1,customer2){     //Sorting the Customers on the basis of their id
            return customer1.id - customer2.id
        })

        for(let i=0; i<shortlistedCustomer.length; i++)         // Displaying the customer id and name in console
        {
            console.log("id: ", shortlistedCustomer[i].id,"- name: ",shortlistedCustomer[i].name);
        }

        return Number(shortlistedCustomer.length);
    }


}
module.exports = functions;