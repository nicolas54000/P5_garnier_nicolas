fetch("http://localhost:3000/api/products")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    //throw Error;
  })
  .then((resultatAPI) => {
    //traitement des données de la réponse

    //Affiche des données tabulaires sous la forme d'un tableau.
    // console.table(resultatAPI);

    for (let article in resultatAPI) {
      // Insertion de l'élément "a"
      let productLink = document.createElement("a");
      // appendChild ajoute un noed à la fin de la liste des enfants d'un nœud parent spécifié.
      // on ajoute 'a' a item
      document.querySelector(".items").appendChild(productLink);
      productLink.href = `product.html?id=${resultatAPI[article]._id}`;

      // Insertion de l'élément "article"
      let productArticle = document.createElement("article");
      // on ajoute enfant article a  <a>
      productLink.appendChild(productArticle);

      // Insertion de l'image
      let productImg = document.createElement("img");
      // on ajoute enfant imag a article
      productArticle.appendChild(productImg);
      productImg.src = resultatAPI[article].imageUrl;
      productImg.alt = resultatAPI[article].altTxt;

      // Insertion du titre "h3"
      let productName = document.createElement("h3");
      // on ajoute enfant h3 article
      productArticle.appendChild(productName);
      productName.classList.add("productName");
      productName.innerHTML = resultatAPI[article].name;

      // Insertion de la description "p"
      let productDescription = document.createElement("p");
      // on ajoute enfant <P> a article
      productArticle.appendChild(productDescription);
      productDescription.classList.add("productName");
      productDescription.innerHTML = resultatAPI[article].description;
    }
  })
  .catch(manageFetchError);

function manageFetchError(error) {
  alert("node n'est pas activé");
  console.log(error);
  return error;
}
