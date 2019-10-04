const taskObject = {
    flatArray: function(input){
        if(Array.isArray(input)){  // Check to see if the input is an array, if yes flatten it recursively
            return input.reduce(
                function flatTheArray(store,value){
                    if(typeof value === "object" || typeof value === "number")  // checking if the value is not an object [] or number
                    {
                        return Array.isArray(value) ?  store.concat(value.reduce(flatTheArray,[])) : store.concat(value)  // if array item is an array, pass it to flatten function recursively otherwise append it to resulting array
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
    greatCircle: function(lat1,lon1,lat2,lon2){
        
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
        let numerator = Math.pow(Math.cos(lat2) * Math.sin(lonDiff) , 2) + Math.pow(Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lonDiff) , 2);
        let denominator = Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lonDiff);
        let angle = Math.atan2(Math.sqrt(numerator) , denominator);
        return angle * 6371.009;            // Multiplying by Mean Spherical Radius of Earth(Km) to return value in Km.
    },
    sendCoupon: function() {

        const restaurantLat = 25.096849, restaurantLon = 55.173583;   // The Restaurant Latitude and Longitude
        let fs = require('fs');
        let jsonData = fs.readFileSync('./customer.json').toString().split("\n");   // reading the customer.json file
        
        let customerData =[]
        let shortlistedCustomer = []

        jsonData.map(function(customer){                // JSON Parsing each object and pushing it into the customerData array
            customerData.push(JSON.parse(customer));
        })

        for(let customer of customerData)
        {   // Calculating  and storing the distance between the Restaurant and Customer using the Great Circle Function 
            customer["distance"] = this.greatCircle(customer.latitude,customer.longitude,restaurantLat,restaurantLon)
        }
        shortlistedCustomer = customerData.filter(customer => customer.distance < 5) // Shortlisting the customers within 5km of the Restaurant

        shortlistedCustomer.sort(function(customer1,customer2){     //Sorting the Customers on the basis of their id
            return customer1.id - customer2.id
        })

        shortlistedCustomer.map(function(customer){                     // Displaying the customer id and name in console
            console.log("id: ", customer.id,"- name: ",customer.name);
        })

        return Number(shortlistedCustomer.length);
    }


}
module.exports = taskObject;
