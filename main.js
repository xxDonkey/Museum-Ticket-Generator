var settings = 
{
    "base-price"    : 30,
    "weekend-price" : 35,
    "daily-discounts": [
        0, // Sunday
        5, // Monday
        0, // Tuesday
        0, // Wednesday
        0, // Thursday
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
        button.innerText = "Show Discounts"

    else 
        button.innerText = "Show Generator"

    generator.hidden = !generator.hidden
    discounts.hidden = !discounts.hidden
}