(async ()=>{
    const url="https://fakestoreapi.com/products/";
    const productContainer=document.querySelector(".product-container");
    const search=document.querySelector("#input");


const fetchApi=async()=>{
    try{
        const res=await fetch(url);
        return await res.json();
    }catch(error){
        return error;
    }
}
const products=await fetchApi();
const generateProducts=(product)=>{
    return ` 
    <div class="product-card">
    <div class="img-container">
        <img src=${product.image} alt="product ${product.id}">
    </div>
    <div class="content">
        <h2> ${product.title}</h2>
        <p>${product.description}</p>
        <button type="button">Rs.${product.price}</button>
    </div>
</div>`
}

const renderProducts=(products)=>{
    productContainer.innerHTML="";
    products.forEach(product => {
        productContainer.innerHTML+=generateProducts(product);
    });
}
const checkTextContain = (text, searchText) => {
    return text.toString().toLowerCase().includes(searchText);
  };

const filter=(event)=>{
    const searchText=event.target.value.toLowerCase();
    const filteredProducts=products.filter(product=>{
        return (
            checkTextContain(product.description, searchText) ||
            checkTextContain(product.title, searchText) ||
            checkTextContain(product.price, searchText)
        
        );
    });
    renderProducts(filteredProducts);
}
search.addEventListener("keyup",filter);
renderProducts(products);
})();