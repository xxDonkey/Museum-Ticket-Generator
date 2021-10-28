// Defines settings dictionary
var settings = 
{
    "base-price"    : 30,
    "weekend-price" : 35,
    "daily-discounts": [
        0, // Sunday
        0, // Monday
        5, // Tuesday
        0, // Wednesday
        5, // Thursday
        0, // Friday
        0  // Saturday
    ],
    "age-below-discount": [5, 5],
    "age-above-discount": [65, 5],
    "coupon": ["tyler sucks at val", 5]
}

// Returns the computed price given the age, coupon_code, and the day
function compute_price(age, coupon_code, day)
{
    // fetch current price
    var price = settings["base-price"]

    // initilize discount
    var discount = 0

    // if sunday or saturday, set the price to weekend price
    if (day == 0 || day == 6)
        price = settings["weekend-price"]

    // add the discount for the durrent day
    discount += settings["daily-discounts"][day]

    // if age is below threshold, add discount
    if (age < settings["age-below-discount"][0])
        discount += settings["age-below-discount"][1]

    // if age is above threshold, add discount
    else if (age > settings["age-above-discount"][0])
        discount += settings["age-above-discount"][1]

    // if the coupon code is valid, add discount
    if (coupon_code === settings["coupon"][0])
        discount += settings["coupon"][1]

    // clamp total price between (0, infinity)
    return Math.max(price - discount, 0)
}

// Compute button onClick method
function compute()
{
    // read inputs
    var age = parseInt(document.getElementById("age").value)
    var coupon_code = document.getElementById("coupon").value
    var override = document.getElementById("override").checked
    var day = document.getElementById("day").value

    // if override, it will used inputed day
    // otherwise, it will use the current weekday
    if (override)
        day = new Date().getDay()

    // computes price
    var price = compute_price(age, coupon_code, day)

    // displays price
    document.getElementById("price").innerHTML = "$" + price
}

// body onLoad method
function onload()
{
    // fetch html elements
    var prices = document.getElementById("prices_label")
    var coupon = document.getElementById("coupon_label")
    var ages = document.getElementById("ages_label")

    // set the discount info
    prices.innerHTML = "Base price: $" + settings["base-price"] + "<br>Weekend price: $" + settings["weekend-price"]
    coupon.innerHTML = "The coupon code is \"" + settings["coupon"][0] + "\" for $" + settings["coupon"][1]
    ages.innerHTML = "If you are below " + settings["age-below-discount"][0] + " years old you get $" + settings["age-below-discount"][1] + " off"
    ages.innerHTML += "<br>If you are above " + settings["age-above-discount"][0] + " years old you get $" + settings["age-above-discount"][1] + " off"
    
    // get the table html element
    var tr = document.getElementById("table_values")

    // load discounts
    var discounts = settings["daily-discounts"]

    for (var i = 0; i < discounts.length; i++)
    {
        // create row for each discount
        var td = document.createElement("td")
        td.innerHTML = discounts[i]

        tr.appendChild(td)
    }
}

// Toggle mode button onClick method
function toggle_mode()
{
    // fetch html elements
    var generator = document.getElementById("generator")
    var discounts = document.getElementById("discounts")
    var button = document.getElementById("switch_mode")

    // switch the button'stext
    if (generator.hidden)
        button.innerText = "Show Discounts  "

    else 
        button.innerText = "Show Generator"

    // hide/show the divs
    generator.hidden = !generator.hidden
    discounts.hidden = !discounts.hidden
}