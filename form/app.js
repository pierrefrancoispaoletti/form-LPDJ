const Init = {
  form: null,
  datas: [],
  objectModel: { id: "", qte: "", pu: "", totalLigne: "" },

  inputRegex: /(\d{1,})/gm,
  init: () => {
    let form = document.querySelector("form");
    let firstLigne = document.getElementById("ligne_0");
    let inputs = firstLigne.querySelectorAll("input");
    let TVA = document
      .getElementById("tva")
      .addEventListener("input", Init.computeTotalWithTVA);
    inputs.forEach((input) =>
      input.addEventListener("input", Init.computeTotalHTLigne)
    );
    Init.form = form;
    Init.form.addEventListener("submit", Init.submitForm);
    Init.datas = [...Init.datas, { ...Init.objectModel, id: 0 }];
  },

  addElement: () => {
    let currentMaxId = Math.max(...Init.datas.map((el) => el.id)) + 1;
    Init.datas = [...Init.datas, { ...Init.objectModel, id: currentMaxId }];
    let ligne = document.getElementById("ligne_0");
    let parent = document.getElementById("tbody");
    let cloned = ligne.cloneNode(true);
    cloned.id = "ligne_" + currentMaxId;
    let inputs = cloned.querySelectorAll("input");
    inputs.forEach((input) => {
      input.value = "";
      input.name = input.name.replace(Init.inputRegex, currentMaxId);
      input.id = input.id.replace(Init.inputRegex, currentMaxId);
      input.addEventListener("input", Init.computeTotalHTLigne);
    });

    let deleteLigneButton = Init.addDeleteButtonElement(currentMaxId);
    parent.appendChild(cloned);
    cloned.appendChild(deleteLigneButton);
  },
  deleteElement: (e) => {
    console.log(Init.datas);
    const { id } = e.target;
    const currentId = id.split("-")[1];
    const currentIndex = currentId.split("_")[1];

    let ligneToDelete = document.getElementById(currentId);
    if (ligneToDelete) {
      ligneToDelete.remove();
      let newDatas = [...Init.datas]
        .map((el) => (el.id != currentIndex ? el : ""))
        .filter((el) => el != "");
      Init.datas = newDatas;
    }
    Init.computeTotalHTArticles();
  },
  addDeleteButtonElement: (currentMaxId) => {
    let deleteLigneButton = document.createElement("button");
    deleteLigneButton.id = "delete-ligne_" + currentMaxId;
    deleteLigneButton.innerText = "X";
    deleteLigneButton.className = "delete_ligne";
    deleteLigneButton.type = "button";
    deleteLigneButton.addEventListener("click", Init.deleteElement);
    return deleteLigneButton;
  },
  submitForm: (e) => {
    e.preventDefault();
    let formData = new FormData(Init.form);
    const request = new XMLHttpRequest();
    request.open("POST", "traitement.php");
    request.send(formData);
  },
  computeTotalHTLigne: (e) => {
    console.log(e.target.value);
    let newDatas = [...Init.datas];
    const { name, value } = e.target;
    const indexLigne = name.split("_")[1];

    if (name.includes("qte")) {
      newDatas.find((el) => el.id == indexLigne).qte = value;
    }
    if (name.includes("pu")) {
      newDatas.find((el) => el.id == indexLigne).pu = value;
    }
    if (
      newDatas.find((el) => el.id == indexLigne).qte &&
      newDatas.find((el) => el.id == indexLigne).pu
    ) {
      newDatas.find((el) => el.id == indexLigne).totalLigne = (
        Number(newDatas.find((el) => el.id == indexLigne).qte) *
        Number(newDatas.find((el) => el.id == indexLigne).pu)
      ).toFixed(2);
      document.getElementById(`ligne_${indexLigne}_total_ht`).value =
        newDatas.find((el) => el.id == indexLigne).totalLigne;
    }
    Init.datas = [...newDatas];
    Init.computeTotalHTArticles();
  },
  computeTotalHTArticles: () => {
    let ht = document.getElementById("total_ht");
    let ttc = document.getElementById("total_cfp");
    let tva = document.getElementById("tva");
    let total = Init.datas.reduce(
      (acc, amt) => acc + Number(amt.totalLigne),
      0
    );
    ht.value = total.toFixed(2);
    ttc.value = (Number(total) + Number(tva.value ?? 0)).toFixed(2);

    return total.toFixed(2);
  },
  computeTotalWithTVA: (e) => {
    const { value: TVA } = e.target;
    const totalTTC = document.getElementById("total_cfp");
    const totalHt = Init.computeTotalHTArticles();

    totalTTC.value = (Number(TVA) + Number(totalHt)).toFixed(2);
  },
};

document.addEventListener("DOMContentLoaded", Init.init);
