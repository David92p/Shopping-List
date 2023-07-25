import { LIST_MEASURES } from "./data/list_measures.js";
import { LIST_PRODUCTS } from "./data/list_products.js";
import { setListMeasures } from "./functions/setListMeasures.js";
import { setListProducts } from "./functions/setListProducts.js";
import { setTdTable } from "./functions/setTdTable.js";

const form = document.querySelector("form") as HTMLFormElement;
const typology = document.querySelector("#typology") as HTMLSelectElement;
const products = document.querySelector("#product") as HTMLSelectElement;
const quantity = document.querySelector("#quantity") as HTMLInputElement;
const quantityType = document.querySelector(
  "#quantityType"
) as HTMLSelectElement;
const textArea = document.querySelector("textarea") as HTMLTextAreaElement;
const table = document.querySelector("table") as HTMLTableElement;
const btnSubmit = document.querySelector(".submit") as HTMLButtonElement;
const btnReset = document.querySelector(".reset-btn") as HTMLButtonElement;
const tFoot = document.querySelector("tfoot");
// const checkButton = document.querySelector(".checkButton") as HTMLButtonElement;
// const deleteButton = document.querySelector(
//   "#deleteButton"
// ) as HTMLButtonElement;

let valueTipology = typology.value;
let valueProduct = products.value;

typology.addEventListener("change", (e: Event) => {
  e.preventDefault();

  typology.style.border = "1px solid black";

  products.removeAttribute("disabled");
  products.classList.remove("not-allowed");

  quantity.removeAttribute("disabled");
  quantity.classList.remove("not-allowed");

  quantityType.removeAttribute("disabled");
  quantityType.classList.remove("not-allowed");

  textArea.removeAttribute("disabled");
  textArea.classList.remove("not-allowed");

  if (typology.value !== valueTipology) {
    quantity.value = "";
    quantityType.value = "";
    textArea.value = "";
  }
  setListProducts({
    type: typology.value,
    select: products,
    list: LIST_PRODUCTS,
  });

  setListMeasures({
    type: products.value,
    select: quantityType,
    list: LIST_MEASURES,
  });
});

products.addEventListener("change", (e: Event) => {
  e.preventDefault();

  if (valueProduct !== products.value) {
    quantity.value = "";
    quantityType.value = "";
    textArea.value = "";
  }

  setListMeasures({
    type: products.value,
    select: quantityType,
    list: LIST_MEASURES,
  });
});

quantity.oninput = () => {
  if (quantity.value.length > quantity.maxLength)
    quantity.value = quantity.value.slice(0, quantity.maxLength);
};

quantity.addEventListener("change", (e: Event) => {
  e.preventDefault();
  quantity.style.border = "1px solid rgba(0, 0, 0, 0.6)";
});

quantityType.addEventListener("change", (e: Event) => {
  e.preventDefault();
  quantityType.style.border = "1px solid rgba(0, 0, 0, 0.6)";
});

btnSubmit.addEventListener("click", (e: Event) => {
  e.preventDefault();
  setTdTable({
    typology,
    products,
    quantity,
    quantityType,
    textArea,
    table,
  });

  if (!quantity.value) quantity.value = "";
  else if (quantityType.value == "---") quantityType.value = "";
  else {
    typology.value = "";
    products.value = "";
    quantity.value = "";
    quantityType.value = "";
    textArea.value = "";

    products.classList.add("not-allowed");
    products.setAttribute("disabled", "");
    quantity.classList.add("not-allowed");
    quantity.setAttribute("disabled", "");
    quantityType.classList.add("not-allowed");
    quantityType.setAttribute("disabled", "");
    textArea.classList.add("not-allowed");
    textArea.setAttribute("disabled", "");
  }
});

btnReset.addEventListener("click", (e: Event) => {
  e.preventDefault();
  while (tFoot?.firstChild) tFoot.removeChild(tFoot.firstChild);
  console.log(tFoot);
});

// checkButton?.addEventListener("click", (e: Event) => {
//   e.preventDefault();
//   console.log("stampato");
// });
