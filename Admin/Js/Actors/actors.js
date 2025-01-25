
const movieModal = document.querySelector("#movieModal");
const exitModal = document.querySelector(".owarlay");
const yesBtn = document.querySelector("#yesbtn");
const noBtn = document.querySelector("#nobtn");
const createModal = document.querySelector("#createModal"); // Create Modal
const editModal = document.querySelector("#editModal"); // Edit Modal
const overlay = document.querySelector(".owarlay");
const createBtn = document.querySelector("#createBtn");
let selectedActorId = null; // Seçilən aktyorun ID-ni saxlamaq üçün dəyişən
// Modalı bağlama funksiyası
let selectedidinfo = [];
const createConfirmBtn = document.querySelector("#createConfirm");
const editConfirmBtn = document.querySelector("#editConfirm");
const createNameInput = document.querySelector("#createName");
const createSurnameInput = document.querySelector("#createSurname");
const createImageInput = document.querySelector("#createImage");
const editNameInput = document.querySelector("#editName");
const editSurnameInput = document.querySelector("#editSurname");
const editImageInput = document.querySelector("#editImage");
const actorstable = document.querySelector("#actorstable");
//modali baglama funksiyasi
function closeModal(modal) {
  if (modal) {
    modal.classList.remove("active");
  }
}
// Modalı açma funksiyası
function openModal(modal) {
  if (modal) {
    modal.classList.add("active");
  }
}
// "Create" düyməsinə basıldığında modal acilir
createBtn.addEventListener("click", () => {
  openModal(createModal);
});
//modaldaki save btn a basanda melumatlari cedvele oturur
createConfirmBtn.addEventListener("click", function () {
  const data = {
    name: createNameInput.value,
    surname: createSurnameInput.value,
    img_url: createImageInput.value,
  };
  console.log("data", data);
  createActor(data);
  closeModal(createModal);
  getActors();
});
//yaradan funksiya
async function createActor(actordata) {
  try {
    const responce = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
        },
        body: JSON.stringify(actordata),
      }
    );
    const data2 = await responce.json();
    console.log("data2", data2);
  } catch (error) {
    console.log("error", error);
  }
}
// API-dən aktyorların siyahısını əldə etmək və göstərmək
async function getActors() {
  const actorstable = document.querySelector("#actorstable tbody");
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actors",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
        },
      }
    );
    const resp = await response.json();
    console.log(resp.data);
    selectedidinfo = resp.data;
    console.log("selectedidinfo", selectedidinfo);
    resp.data.forEach((element) => {
      actorstable.innerHTML += `
        <tr>
          <td>${element.id}</td>
          <td>${element.name}</td>
          <td>${element.surname}</td>
          <td><img class="tableimage" src="${element.img_url}" alt="Actor Image" /></td>
          <td class="table_edit_btn" onclick="editFn(${element.id})">
          <i class="fa-solid fa-pen"></i>
          </td>
          <td class="table_delete_btn"  onclick="removeFn(${element.id})">
            <i class="fa-solid fa-trash"></i>
          </td>
        </tr>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}
getActors();
//edit butonuna basanda
function editFn(elid) {
  selectedActorId = elid;
  console.log("idedit", selectedActorId);
  const findEl = selectedidinfo.find((item) => item.id == elid);
  console.log("findEl", findEl);
  openModal(editModal);
  editNameInput.value = findEl.name;
  editSurnameInput.value = findEl.surname;
  editImageInput.value = findEl.img_url;
}
async function updateFn() {
  const data = {
    name: editNameInput.value,
    surname: editSurnameInput.value,
    img_url: editImageInput.value,
  };
  console.log("dataedit", data);
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor/${selectedActorId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
        },
        body: JSON.stringify(data),
      }
    );
    location.reload();
  } catch (error) {
    console.log(error);
  } finally {
    selectedActorId = null; // ID-ni sıfırla
  }
}
//silmek ikonuna basanda
function removeFn(id) {
  selectedActorId = id;
  openModal(movieModal);
  console.log("id budur", selectedActorId);
}
//acilan modaldaki yes btn a basanda
async function getDelyes() {
  if (!selectedActorId) {
    console.error("No actor selected for deletion.");
    return;
  }
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor/${selectedActorId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete the actor.");
    }
    alert(`Actor with ID ${selectedActorId} has been deleted.`);
    closeModal(movieModal); // Modalı bağla
    location.reload(); // Siyahını yenilə
  } catch (error) {
    console.error("Failed to delete the actor:", error);
    alert("Failed to delete the actor.");
  } finally {
    selectedActorId = null; // ID-ni sıfırla
  }
}
function getDelno() {
  closeModal(movieModal); // Modalı bağla
  location.reload(); // Siyahını yenilə
}