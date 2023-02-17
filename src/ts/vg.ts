/*
1. Se om du kan hitta problem med koden nedan och se om du kan göra den bättre.
*/
export enum Sort {
  PRICE_ASCENDING = "Stigande pris",
  PRICE_DECENDING = "Sjunkande pris",
  NAME_ALPHABETIC = "Alfabetisk ordning",
  NAME_ALPHABETIC_REVERSE = "Omvänd alfabetisk ordning",
}

export class Product {
  constructor(
    public id: number,
    public name: string,
    public imageUrl: string[],
    public price: number,
    public description: string
  ) {}
}

export function sortProductsBy(sort: Sort, products: Product[]): Product[] {
  if (sort === Sort.PRICE_ASCENDING) {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === Sort.PRICE_DECENDING) {
    products.sort((a, b) => b.price - a.price);
  } else if (
    sort === Sort.NAME_ALPHABETIC ||
    sort === Sort.NAME_ALPHABETIC_REVERSE
  ) {
    products.sort((a, b) => (a.name < b.name ? -1 : 1));
  }

  return products;
}

/*
  2. Refaktorera funktionen createProductHtml :)
  */
class Cart {
  addToCart(i: number) {}
}
export let cartList = JSON.parse(localStorage.getItem("savedCartList") || "[]");
export let productList = JSON.parse(localStorage.getItem("savedList") || "[]");

function createDogImgContainer() {
  let dogImgContainer: HTMLDivElement = document.createElement("div");
  dogImgContainer.className = "dogimgcontainer";

  return dogImgContainer;
}

function createDogImg(src: string, alt: string) {
  let dogImg: HTMLImageElement = document.createElement("img");
  dogImg.src = src;
  dogImg.alt = alt;

  return dogImg;
}

function createCartSymbolContainer() {
  let cartSymbolContainer: HTMLDivElement = document.createElement("div");
  cartSymbolContainer.className = "cartSymbolContainer";

  return cartSymbolContainer;
}

function createCartSymbol() {
  let cartSymbol: HTMLElement = document.createElement("i");
  cartSymbol.className = "bi bi-bag-plus";

  return cartSymbol;
}

function createNameHeading(name: string) {
  let nameHeading: HTMLHeadingElement = document.createElement("h5");
  nameHeading.innerHTML = name;

  return nameHeading;
}

function createPriceNode(price: number) {
  let priceNode: HTMLParagraphElement = document.createElement("p");
  priceNode.innerHTML = "$" + price.toString();

  return priceNode;
}

function createInfoNode(info: string) {
  let infoNode: HTMLParagraphElement = document.createElement("p");
  infoNode.innerHTML = info;

  return infoNode;
}

function addEventListeners(container: HTMLDivElement, img: HTMLImageElement) {
  img.addEventListener("mouseover", () => {
    container.classList.add("hover");
    img.classList.add("hover");
  });

  img.addEventListener("mouseout", () => {
    img.classList.remove("hover");
    container.classList.remove("hover");
  });
}

export function createProductHtml() {
  const quantity = cartList.reduce(
    (previousValue: number, currentValue: any) =>
      previousValue + currentValue.quantity,
    0
  );
  const floatingCart = document.getElementById(
    "floatingcartnumber"
  ) as HTMLElement;
  floatingCart.innerHTML = quantity.toString();

  for (let i = 0; i < productList.length; i++) {
    let dogproduct: HTMLDivElement = document.createElement("div");
    let dogImgContainer: HTMLDivElement = createDogImgContainer();
    let dogImg: HTMLImageElement = createDogImg(
      productList[i].picture,
      productList[i].pictureAlt
    );
    let cartSymbolContainer: HTMLDivElement = createCartSymbolContainer();
    let cartSymbol: HTMLElement = createCartSymbol();
    let name: HTMLHeadingElement = createNameHeading(productList[i].name);
    let price: HTMLHeadingElement = createPriceNode(productList[i].price);
    let info: HTMLHeadingElement = createInfoNode(productList[i].info);

    dogproduct.appendChild(dogImgContainer);
    dogImgContainer.appendChild(dogImg);
    dogImgContainer.appendChild(cartSymbolContainer);
    cartSymbolContainer.appendChild(cartSymbol);
    dogproduct.appendChild(name);
    dogproduct.appendChild(price);
    dogproduct.appendChild(info);

    addEventListeners(cartSymbolContainer, dogImg);

    productList[i].productSpec = false;

    dogproduct.className = "dogproduct";

    const category = productList[i].category;
    const container = document.getElementById(category) as HTMLElement;

    switch (category) {
      case "sassy":
        container.appendChild(dogproduct);
        break;
      case "kriminella":
        container.appendChild(dogproduct);
        break;
      case "singlar":
        container.appendChild(dogproduct);
        break;
      case "puppy":
        container.appendChild(dogproduct);
        break;
      case "oldies":
        container.appendChild(dogproduct);
        break;
      default:
        break;
    }
  }
  localStorage.setItem("savedList", JSON.stringify(productList));
  sessionStorage.clear();
}

/*
  3. Refaktorera funktionen getfromstorage
  */
export class CartProduct {
  constructor(
    public name: string,
    public image: string,
    public price: number,
    public amount: number
  ) {}
}

function getfromstorage() {
  let container = document.getElementById("checkout-table");

  let fromStorage: string = localStorage.getItem("cartArray") || "";
  let asText: CartProduct[] = JSON.parse(fromStorage);

  let productcontainer = document.getElementById(
    "product-checkout-container"
  ) as HTMLDivElement;

  let amountcontainer = document.getElementById(
    "amount-checkout-container2"
  ) as HTMLDivElement;
  let amounttext: HTMLTableCellElement = document.createElement("th");
  amountcontainer.appendChild(amounttext);
  amounttext.innerHTML = "amount:";

  let titlecontainer = document.getElementById(
    "title-container"
  ) as HTMLTableRowElement;
  titlecontainer.innerHTML = "<strong>products:</strong>";

  let productquantity = document.getElementById(
    "product-quantity"
  ) as HTMLTableRowElement;
  let qttext: HTMLTableCellElement = document.createElement("th");
  productquantity.appendChild(qttext);
  qttext.innerHTML = "change quantity:";

  let checkkouttotal2 = document.getElementById(
    "title-total"
  ) as HTMLTableCellElement;
  let totaltext: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totaltext);
  totaltext.innerHTML = "total:";

  for (let i: number = 0; i < asText.length; i++) {
    let productt: HTMLTableCellElement = document.createElement("th");
    titlecontainer.appendChild(productt);
    productt.innerHTML = asText[i].name;
    productt.className = "hej";

    let amountt: HTMLTableCellElement = document.createElement("th");
    amountcontainer.appendChild(amountt);
    amountt.innerHTML = "x" + asText[i].amount;
    amountt.className = "hej";

    let amountqt: HTMLTableCellElement = document.createElement("th");
    productquantity.appendChild(amountqt);
    let amountplusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountplusbtn);
    amountqt.className = "hej";

    let icon: HTMLSpanElement = document.createElement("i");
    amountplusbtn.appendChild(icon);

    icon.className = "fas fa-minus";
    amountplusbtn.className = "plusbtn";

    let icon2: HTMLSpanElement = document.createElement("i");
    icon2.className = "fas fa-plus";

    let amountminusbtn: HTMLButtonElement = document.createElement("button");
    amountqt.appendChild(amountminusbtn);
    amountminusbtn.appendChild(icon2);
    amountminusbtn.className = "minusbtn";
  }

  let addition: number = 0;

  for (let i = 0; i < asText.length; i++) {
    addition += asText[i].price *= asText[i].amount;
  }

  let totalprice2: HTMLTableCellElement = document.createElement("th");
  checkkouttotal2.appendChild(totalprice2);
  totalprice2.innerHTML = addition + "$";
  totalprice2.id = "totalincenter";
}
