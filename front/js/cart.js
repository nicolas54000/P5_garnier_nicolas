// gestion du panier
document.getElementById("order").addEventListener("click", xpostForm);

//recuperation du local storage ajout des articles dans le tableau  produitLocalStorage

let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
//
// console.table("localStorage" + produitLocalStorage);

 const positionEmptyCart = document.querySelector("#cart__items");

// Si le panier est vide
//function getCart(){
if (produitLocalStorage === null || produitLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;

    // si panier vide on cache le formulaire
    var d = document.getElementById("cart__order__form");
    // consoleP.log(d.style);
    d.style.visibility = "hidden";
} else {
    for (let produit in produitLocalStorage) {
        // Insertion de l'élément "article"
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute(
            "data-id",
            produitLocalStorage[produit].idProduit
        );

        // Insertion de l'élément "div"
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = produitLocalStorage[produit].imgProduit;
        productImg.alt = produitLocalStorage[produit].altImgProduit;

        // Insertion de l'élément "div"
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className =
            "cart__item__content__titlePrice";

        // Insertion du titre h3
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = produitLocalStorage[produit].nomProduit;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
        productColor.style.fontSize = "20px";

        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML =
            produitLocalStorage[produit].prixProduit + " €";

        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(
            productItemContentSettingsQuantity
        );
        productItemContentSettingsQuantity.className =
            "cart__item__content__settings__quantity";

        // Insertion de "Qté : "
        let productQte = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQte);
        productQte.innerHTML = "Qté : ";

        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = produitLocalStorage[produit].quantiteProduit;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(
            productItemContentSettingsDelete
        );
        productItemContentSettingsDelete.className =
            "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
    }
}

// Récupération du total des quantités
var elemsQtt = document.getElementsByClassName("itemQuantity");
// nombre d'elmements dans le tableau
var myLength = elemsQtt.length,
    totalQtt = 0;

for (var i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
}

let productTotalQuantity = document.getElementById("totalQuantity");
productTotalQuantity.innerHTML = totalQtt;
console.log(totalQtt);

// Récupération du prix total
totalPrice = 0;

for (var i = 0; i < myLength; ++i) {
    totalPrice +=
        elemsQtt[i].valueAsNumber * produitLocalStorage[i].prixProduit;
}

let productTotalPrice = document.getElementById("totalPrice");
productTotalPrice.innerHTML = totalPrice;
console.log(totalPrice);

// Modification d'une quantité de produit

let qttModif = document.querySelectorAll(".itemQuantity");

//console.log(qttModif.length);

for (let k = 0; k < qttModif.length; k++) {
    // si l'évènement n'est pas explicitement géré, l'action par défaut ne devrait pas être exécutée
    qttModif[k].addEventListener("change", (event) => {
        event.preventDefault();

        // qte actuelle
        let quantityModif = produitLocalStorage[k].quantiteProduit;
         // nouvelle qte
        let qttModifValue = qttModif[k].valueAsNumber;

        // selectionne l'article de pannier qui a sa quantité modifiée
        const resultFind = produitLocalStorage.find(x => x.qttModifValue !== quantityModif);
        // on lu affecte la nouvelle valeur
        resultFind.quantiteProduit = qttModifValue;

        produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

        // mise a jour ecran
        location.reload();
    });
}

// Suppression d'un produit
//function deleteProduct() {
let btn_supprimer = document.querySelectorAll(".deleteItem");

for (let j = 0; j < btn_supprimer.length; j++) {
    btn_supprimer[j].addEventListener("click", (event) => {
        event.preventDefault();

        //Selection de l'element à supprimer en fonction de son id ET sa couleur
        let idDelete = produitLocalStorage[j].idProduit;
        let colorDelete = produitLocalStorage[j].couleurProduit;

        produitLocalStorage = produitLocalStorage.filter(
            (el) =>
                el.idProduit !== idDelete || el.couleurProduit !== colorDelete
        );

        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));

        //Alerte produit supprimé et refresh
        alert("Ce produit a bien été supprimé du panier");
        location.reload();
    });
}

function isValide(regExpNom, nomElement, valeurElement, MessageErreur) {
    let valide = true;

    ZoneMessage = nomElement + "ErrorMsg";
    //console.log("zone  " +zone1 + zone2)
    if (regExpNom.test(valeurElement)) {
        document.getElementById(ZoneMessage).innerHTML = "";
    } else {
        document.getElementById(ZoneMessage).innerHTML = MessageErreur;
        //firstNameErrorMsg.innerHTML = "Prénom invalide";
        valide = false;
    }
    return valide;
}

// validation champs formulaire

function Validation() {
    //Création des expressions régulières
    let emailRegExp = new RegExp(
        "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
    );
    let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
    let addressRegExp = new RegExp(
        "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
    );

    const validFirstName = document.getElementById("firstName").value;
    const validLastName = document.getElementById("lastName").value;
    const validaddress = document.getElementById("address").value;
    const validcity = document.getElementById("city").value;
    const validemail = document.getElementById("email").value;

    //validation des zones

    let isValideForm = isValide(
        charRegExp,
        "firstName",
        validFirstName,
        "Prénom invalide"
    );
    isValideForm =
        isValide(charRegExp, "lastName", validLastName, "Nom invalide") &&
        isValideForm;
    isValideForm =
        isValide(addressRegExp, "address", validaddress, "Adresse invalide") &&
        isValideForm;
    isValideForm =
        isValide(charRegExp, "city", validcity, "ville invalide") &&
        isValideForm;
    isValideForm =
        isValide(emailRegExp, "email", validemail, "couriel invalide") &&
        isValideForm;

    return isValideForm;
}

// getForm();

//Envoi des informations client au localstorage

function xpostForm() {
    // on verifie qu'il n'y a pas d'erreur de format dans la saisieles
    // si  validation = true pas d'erreur

    if (Validation()) {
        //Récupération des coordonnées du formulaire client
        let inputName = document.getElementById("firstName");
        let inputLastName = document.getElementById("lastName");
        let inputAdress = document.getElementById("address");
        let inputCity = document.getElementById("city");
        let inputMail = document.getElementById("email");

        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let i = 0; i < produitLocalStorage.length; i++) {
            // ajpout ligne
            idProducts.push(produitLocalStorage[i].idProduit);
        }
        console.log(idProducts);

        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idProducts,
        };

        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        // La méthode fetch() accepte un second paramètre, optionnel
        // un objet init qui vous permet de contrôler un certain nombre de réglages

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                localStorage.clear();
                //ajout au local storage
                localStorage.setItem("orderId", data.orderId);

                document.location.href = "confirmation.html";
            })

            .catch((err) => {
                alert(
                    "Erreur dans l'API de validation des commandes : " +
                        err.message
                );
            });
    }
}
