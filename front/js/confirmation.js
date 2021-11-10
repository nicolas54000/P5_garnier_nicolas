
// conformation de la commande

function confirme(){
    const idNode = document.getElementById("orderId");

    idNode.innerText = localStorage.getItem("orderId");
   // console.log(localStorage.getItem("orderId"))

    // on vide la panier

    localStorage.clear();
}

confirme();