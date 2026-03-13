const products=[

{ id:1, name:"Laptop", category:"electronics", price:800 },

{ id:2, name:"Headphones", category:"electronics", price:40 },

{ id:3, name:"T-Shirt", category:"clothing", price:25 },

{ id:4, name:"Jeans", category:"clothing", price:60 },

{ id:5, name:"JavaScript Book", category:"books", price:30 },

{ id:6, name:"Laptop Bag", category:"electronics", price:70 }

];

let cart=JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts(list){

const grid=document.getElementById("productGrid");

grid.innerHTML="";

list.forEach(product=>{

grid.innerHTML+=`

<div class="product">

<h3>${product.name}</h3>

<p>Category: ${product.category}</p>

<p>Price: $${product.price}</p>

<button onclick="addToCart(${product.id})">Add to Cart</button>

</div>

`;

});

}

function filterProducts(){

let category=document.getElementById("categoryFilter").value;

let price=document.getElementById("priceFilter").value;

let filtered=products.filter(p=>{

let categoryMatch=(category==="all" || p.category===category);

let priceMatch=true;

if(price==="low") priceMatch=p.price<50;

if(price==="mid") priceMatch=p.price>=50 && p.price<=100;

if(price==="high") priceMatch=p.price>100;

return categoryMatch && priceMatch;

});

displayProducts(filtered);

}

function addToCart(id){

let product=products.find(p=>p.id===id);

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

displayCart();

}

function displayCart(){

const cartList=document.getElementById("cart");

cartList.innerHTML="";

let total=0;

cart.forEach(item=>{

cartList.innerHTML+=`<li>${item.name} - $${item.price}</li>`;

total+=item.price;

});

let tax=total*0.1;

let finalTotal=total+tax;

document.getElementById("total").innerText=
`Subtotal: $${total.toFixed(2)} | Tax: $${tax.toFixed(2)} | Total: $${finalTotal.toFixed(2)}`;

}

displayProducts(products);

displayCart();