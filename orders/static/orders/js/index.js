function empty(){
    localStorage.setItem("order", null);
    displayCart();
    document.querySelector('.insert').innerHTML='';
}

function buy(user){
    chatSocket.send(localStorage.getItem("order"),{"user":user});
}

function displayCart(){
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
        console.log(itemName);

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

    var row = document.createElement('tr');
    row.id="b";
    document.querySelector('.insert').append(row);

    var html = document.createElement('th');
    html.innerHTML = "Total Cost:";
    html.scope = "row";
    document.querySelector("#b").append(html);

    html = document.createElement('td');
        document.querySelector("#b").append(html);

    html = document.createElement('td');
    html.innerHTML = "$"+totalCost.toFixed(2);
    document.querySelector("#b").append(html);

    html = document.createElement('td');
    document.querySelector("#b").append(html);
}

document.addEventListener('DOMContentLoaded', () => {

    var chatSocket = new WebSocket(
        'ws://' + window.location.host +
        '/ws/chat/');

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
            const itemName = button.dataset.itemName;
            console.log(itemName);
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