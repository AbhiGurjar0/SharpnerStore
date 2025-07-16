async function addItem(event) {
    event.preventDefault();

    const itemName = document.getElementById("itemName").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const itemPrice = document.getElementById("itemPrice").value;
    const itemQuantity = document.getElementById("itemQuantity").value;
    if (!itemName || !itemDescription || !itemPrice || !itemQuantity) {
        alert("Please fill in all fields.");
        return;
    }

    if (isNaN(itemPrice) || isNaN(itemQuantity)) {
        alert("Price and Quantity must be numbers.");
        return;
    }
    try {
        const response = await axios.post("https://crudcrud.com/api/d1a961234a4644ebbee34c23ddea079d/items", {
            name: itemName,
            description: itemDescription,
            price: itemPrice,
            quantity: itemQuantity
        });

        console.log("Item added successfully:", response.data);

        const itemCard = createEle(itemName, itemDescription, itemPrice, itemQuantity);

        document.getElementById("itemsContainer").appendChild(itemCard);
        document.getElementById("addItemForm").reset();

    } catch (error) {
        console.error("Error adding item:", error);
    }
}
function createEle(itemName, itemDescription, itemPrice, itemQuantity) {
    const itemCard = document.createElement("div");
    itemCard.className = "bg-white shadow-md rounded-lg p-4 flex justify-between items-center px-5";
    itemCard.innerHTML = `
            <h4 class="font-bold text-lg">${itemName}</h4>
            <p class="text-gray-600">${itemDescription}</p>
            <p class="text-gray-800 font-semibold">Price: Rs ${itemPrice}</p>
            <p class="text-gray-800 font-semibold">Quantity: ${itemQuantity}</p>
            <div class="flex gap-2 mt-2">
               <button onclick="Buy(this,1)" class="px-4 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300">Buy 1</button>
               <button onclick="Buy(this,2)" class="px-4 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300">Buy 2</button>
               <button onclick="Buy(this,3)" class="px-4 py-1 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300">Buy 3</button>
           </div>
        `;
    return itemCard;
}

document.addEventListener("DOMContentLoaded", async function () {
    let allDetails = await axios.get("https://crudcrud.com/api/d1a961234a4644ebbee34c23ddea079d/items");
    document.getElementById("itemsContainer").innerHTML = "";
    allDetails.data.forEach(item => {
        const { name, description, price, quantity } = item;
        const itemCard = createEle(name, description, price, quantity);
        document.getElementById("itemsContainer").appendChild(itemCard);
    });
});
function Buy(button, quantity) {
    const itemCard = button.parentElement.parentElement;
    let quantityElement = itemCard.querySelector("p:nth-child(4)");
    let currentQuantity = parseInt(quantityElement.textContent.split(": ")[1]);
    if (currentQuantity >= quantity) {
        currentQuantity -= quantity;
        quantityElement.textContent = `Quantity: ${currentQuantity}`;
        alert(`You bought ${quantity} item(s). Remaining quantity: ${currentQuantity}`);
    } else {
        alert("Not enough quantity available to buy.");
    }
}
