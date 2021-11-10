// Récupération id du produit selectioné
var str = window.location.href;
var url = new URL(str);
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

//La méthode querySelector() de l'interface Document retourne le premier
// Element dans le document correspondant au sélecteur

//const colorPicked = document.querySelector("#colors");
//const quantityPicked = document.querySelector("#quantity");



// Récupération d'un articles de l'API

fetch("http://localhost:3000/api/products/" + idProduct)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }

    // if (res.status == 404) {
    //     alert('article introuvable');
    // }
    throw Error;
  })

  // Répartition des données de l'API dans le DOM

  .then(async function (resultatAPI) {
    article = await resultatAPI;
    console.table(article);

    //  affichage du detai de l'article

    afficheArticle(article);
  })
  .catch((error) => {
    console.log("le detail de l'aticle n'est pas trouvé pb API");
    alert("le detail de l'aticle n'est pas trouvé pb API");
  });

function afficheArticle(article) {
  // Insertion de l'image
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // lecture du titre "h1"
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // lecture du prix
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // lecture de la description
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // ajout des couleurs
  for (let colors of article.colors) {
    // console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
 addToCart(article);
}

//Gestion du panier
function addToCart(article) {
  const btn_envoyerPanier = document.querySelector("#addToCart");

  //Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100
  btn_envoyerPanier.addEventListener("click", (event) => {


    // on initialise la couleur et le quantité selectionée

    const colorPicked = document.querySelector("#colors");
    const quantityPicked = document.querySelector("#quantity");


      //Recupération du choix de la couleur
      let choixCouleur = colorPicked.value;

      //Recupération du choix de la quantité
      let choixQuantite = quantityPicked.value;

      if (
        choixQuantite > 0 &&
        choixQuantite <= 100 &&
        choixCouleur != 0
      ) {

      //Récupération des options de l'article à ajouter au panier
      let detailproduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };

      //Initialisation du local storage
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

      //fenêtre pop-up
      const popupConfirmation = () => {
        if (
          window.confirm(`Votre commande de ${choixQuantite} ${article.name} ${choixCouleur} est ajoutée au panier
                    Pour consulter votre panier, cliquez sur OK`)
        ) {
          //  on affiche le panier si reponse ok
          window.location.href = "cart.html";
        }
      };

      // ajout local storage
      //Si le panier comporte déjà au moins 1 article
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) =>
            el.idProduit === idProduct && el.couleurProduit === choixCouleur
        );
        //Si le produit commandé est déjà dans le panier et a la meme couleur
        if (resultFind) {
          let newQuantite =
            parseInt(detailproduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          popupConfirmation();
          //Si le produit commandé n'est pas dans le panier on l'ajoute
        } else {
          produitLocalStorage.push(detailproduit);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          popupConfirmation();
        }
        //Si le panier est vide
      } else {
        // creation tableau
        tableproduit = [];
        // ajout article dans localstorage
        tableproduit.push(detailproduit);
        // conversion en json et ajout au localstorage
        localStorage.setItem("produit", JSON.stringify(tableproduit));

        popupConfirmation();
      }
    } else {
      alert("vous devez selectionne une quantité entre 1 et 100 et une couleur");
    }
  });
}
