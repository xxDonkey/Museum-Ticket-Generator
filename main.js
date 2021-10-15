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
    "coupon"            : ["code", 5]
}

function compute_price(age, coupon_code, day)
{
    var price = settings["base-price"]
    var discount = 0

    if (day == 0 || day == 6)
        price = settings["weekend-price"]

    discount += settings["daily-discounts"][day]

    if (age < settings["age-below-discount"][0])
        discount += settings["age-below-discount"][1]

    else if (age > settings["age-above-discount"][0])
        discount += settings["age-above-discount"][1]

    if (coupon_code === settings["coupon"][0])
        discount += settings["coupon"][1]

    return Math.max(price - discount, 0)
}

function compute()
{
    var age = parseInt(document.getElementById("age").value)
    var coupon_code = document.getElementById("coupon").value
    var override = document.getElementById("override").checked
    var day = document.getElementById("day").value

    if (override)
        day = new Date().getDay()

    var price = compute_price(age, coupon_code, day)
    document.getElementById("price").innerHTML = "$" + price
}

function onload()
{
    var prices = document.getElementById("prices_label")
    var coupon = document.getElementById("coupon_label")
    var ages = document.getElementById("ages_label")

    prices.innerHTML = "Base price: $" + settings["base-price"] + "<br>Weekend price: $" + settings["weekend-price"]
    coupon.innerHTML = "The coupon code is \"" + settings["coupon"][0] + "\" for $" + settings["coupon"][1]
    ages.innerHTML = "If you are below " + settings["age-below-discount"][0] + " years old you get $" + settings["age-below-discount"][1] + " off"
    ages.innerHTML += "<br>If you are above " + settings["age-above-discount"][0] + " years old you get $" + settings["age-above-discount"][1] + " off"
    
    var tr = document.getElementById("table_values")
    var discounts = settings["daily-discounts"]

    for (var i = 0; i < discounts.length; i++)
    {
        var td = document.createElement("td")
        td.innerHTML = discounts[i]

        tr.appendChild(td)
    }
}

function toggle_mode()
{
    var generator = document.getElementById("generator")
    var discounts = document.getElementById("discounts")
    var button = document.getElementById("switch_mode")

    if (generator.hidden)
        button.innerText = "Show Discounts  "

    else 
        button.innerText = "Show Generator"

    generator.hidden = !generator.hidden
    discounts.hidden = !discounts.hidden
}