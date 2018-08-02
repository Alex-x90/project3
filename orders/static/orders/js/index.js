function empty(){
    //empties the user's cart
    localStorage.setItem("order", null);
    displayCart();
    document.querySelector('.insert').innerHTML='';
}

function buy(user){
    //sends the user's order to the server for it to store
    var totalCost = document.querySelector("#totalCost").value;
    var r = confirm("Are you sure you want to do this? Your total is $" + totalCost.toFixed(2));
    if (r == true) {

        var formData = new FormData();

        order = JSON.stringify(JSON.parse(localStorage.getItem("order")));
        formData.append("input",order);

        formData.append("user",user);

        empty();

        var csrftoken = getCookie('csrftoken');

        var request = new XMLHttpRequest();
        request.open("POST", "/store_order");
        request.setRequestHeader("X-CSRFToken", csrftoken);
        request.send(formData);

        window.location.assign("/");
    }
}

function displayCart(){
    //puts the users data on the page when they view their cart
    var order = JSON.parse(localStorage.getItem("order"));
    if (!order)
    {
         document.querySelector('.empty').innerHTML = "Your cart is empty";
         return;
    }
    var totalCost=0;
    for(i=0;i<order.length;++i)
    {
        var temp = order[i];

        itemName = temp["itemName"];
        size = temp["size"];
        cost = parseFloat(temp["cost"]);
        topping1 = temp["topping1"];
        topping2 = temp["topping2"];
        topping3 = temp["topping3"];

        totalCost += cost;

        var row = document.createElement('tr');
        row.id = "a"+i;
        document.querySelector('.insert').append(row);

        var html = document.createElement('th');
        html.innerHTML = itemName;
        html.scope = "row";
        document.querySelector("#a"+i).append(html);

        html = document.createElement('td');
        html.innerHTML = size;
        document.querySelector("#a"+i).append(html);

        html = document.createElement('td');
        html.innerHTML = "$"+cost.toFixed(2);
        document.querySelector("#a"+i).append(html);
        html = document.createElement('td');
        if (topping1)
        {
            html.innerHTML += topping1;
            if (topping2)
            {
                if(!topping3)
                    html.innerHTML += " and "+topping2;
                if(topping3)
                {
                    html.innerHTML += ", "+topping2;
                    html.innerHTML += ", and "+topping3;
                }
            }
        }
        else
        {
            html.innerHTML = "None";
        }
        document.querySelector("#a"+i).append(html);
    }

    row = document.createElement('tr');
    row.id="b";
    document.querySelector('.insert').append(row);

    html = document.createElement('th');
    html.innerHTML = "Total Cost:";
    html.scope = "row";
    document.querySelector("#b").append(html);

    html = document.createElement('td');
        document.querySelector("#b").append(html);

    html = document.createElement('td');
    html.value = totalCost;
    html.id = "totalCost";
    html.innerHTML = "$"+totalCost.toFixed(2);
    document.querySelector("#b").append(html);

    html = document.createElement('td');
    document.querySelector("#b").append(html);
}

document.addEventListener('DOMContentLoaded', () => {

    //sets up all the buttons to order different items
    var buttons = document.querySelectorAll('.add'), i;
    for (i = 0; i < buttons.length; ++i) {
        let button = buttons[i];
        button.onclick = () => {

            var order = JSON.parse(localStorage.getItem("order"));
            if (!order)
            {
                var order = [];
            }

            const cost = button.dataset.cost;
            const item = button.value;
            const itemName = button.dataset.item_name;
            const size = button.dataset.size;

            try{
                if ( document.querySelector('#a'+item.toString()+'_1').value ) {
                    var topping1 = document.querySelector('#a'+item.toString()+'_1').value;
                    if ( document.querySelector('#a'+item.toString()+'_2').value ) {
                        var topping2 = document.querySelector('#a'+item.toString()+'_2').value;
                        if ( document.querySelector('#a'+item.toString()+'_3').value ) {
                            var topping3 = document.querySelector('#a'+item.toString()+'_3').value;
                        }
                    }
                }
            }
            catch(err){
            }
            finally{

                var dict = {};
                dict.cost = cost;
                dict.item = item;
                dict.size = size;
                dict.topping1 = topping1;
                dict.topping2 = topping2;
                dict.topping3 = topping3;
                dict.itemName = itemName;

                order.push(dict);

                localStorage.setItem("order", JSON.stringify(order));
            }

        };
    }
});

//creates a csrf token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}