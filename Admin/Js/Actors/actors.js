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
const sucsesfullModal = document.querySelector("#modal-success");
const failModal = document.querySelector("#modal-fail");
const loading = document.querySelector("#loading");
const owarlay2 = document.querySelector("#owarlay2");


//modali baglama funksiyasi
const paginationContainer = document.querySelector(".pagination-container");
const perPage = 8;
let index = 1;

function closeModal(modal) {
    modal.classList.remove("active");

}
// Modalı açma funksiyası
function openModal(modal) {
  if (modal) {
    modal.classList.add("active");
  }
} 
 function closeModal2() {
  createModal.classList.remove("active")
  editModal.classList.remove("active")
  console.log("click");
  
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
  loading.classList.remove("loadFalse")
  try {
    const responce = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
        body: JSON.stringify(actordata),
      }
    );
    const data2 = await responce.json();
    if (data2.statusCode === 400) {
      failModal.classList.add("active");
      createModal.classList.remove("active")
      getActors();
    } else {
      sucsesfullModal.classList.add("active");
      createModal.classList.remove("active")
      getActors();
    }
    loading.classList.add("loadFalse")
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
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const resp = await response.json();
    console.log(resp.data);
    actorstable.innerHTML = "";
    selectedidinfo = resp.data;

    console.log("selectedidinfo", selectedidinfo);
    const allData = resp.data;
    const newPagination = resp.data.slice((index - 1) * perPage, index * perPage);
    actorstable.innerHTML=""
    newPagination.forEach((element,index) => {
      actorstable.innerHTML += `
        <tr>
          <td>${index+1}</td>
          <td>${element.name}</td>
          <td>${element.surname}</td>
          <td  style="display: flex;justify-content: center;"><img class="tableimage"  src="${element.img_url}" alt="Actor Image" /></td>
          <td class="table_edit_btn" onclick="editFn(${element.id})">
          <i class="fa-solid fa-pen"></i>
          </td>
          <td class="table_delete_btn"  onclick="removeFn(${element.id})">
            <i class="fa-solid fa-trash"></i>
          </td>
        </tr>
      `;
    });

    const totalPage = Math.ceil(allData.length / perPage);

    // Dinamik səhifə düymələrini yaradın
    paginationContainer.innerHTML = ""; // Əvvəlki düymələri təmizləyirik
    for (let i = 1; i <= totalPage; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("page-btn");
      if (i === index) {
        pageButton.classList.add("active"); // Aktiv səhifə üçün xüsusi sinif
      }
      pageButton.addEventListener("click", () => {
        index = i;
        getActors()
      });
      paginationContainer.appendChild(pageButton);
      loading.classList.add("loadFalse")
    }
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
  loading.classList.remove("loadFalse")
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
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
        body: JSON.stringify(data),
      } 
    );
    const data2 = await response.json();
    if (data2.statusCode === 400) {
      failModal.classList.add("active");
      editModal.classList.remove("active")
      getActors();
    } else {
      sucsesfullModal.classList.add("active");
      editModal.classList.remove("active")
      getActors();
    }
    loading.classList.add("loadFalse")
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
  loading.classList.remove("loadFalse")
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
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete the actor.");
    }
    // alert(`Actor with ID ${selectedActorId} has been deleted.`);
    closeModal(movieModal); // Modalı bağla
    // location.reload(); // Siyahını yenilə
    const data = response.json();
    if (data.statusCode === 400) {
      failModal.classList.add("active");
      movieModal  .classList.remove("active")
      getActors();
    } else {
      sucsesfullModal.classList.add("active");
      movieModal  .classList.remove("active")
      getActors();
    }
    loading.classList.add("loadFalse")
  } catch (error) {
    console.error("Failed to delete the actor:", error);
    // alert("Failed to delete the actor.");
  } finally {
    selectedActorId = null; // ID-ni sıfırla
  }
}
function getDelno() {
  closeModal(movieModal); // Modalı bağla
  location.reload(); // Siyahını yenilə
}

function closeModal() {
  sucsesfullModal.classList.remove("active");
  failModal.classList.remove("active");
  window.location.reload()
}



function logOutFunc() {
  localStorage.removeItem("Admin_token")
  window.location.href = './login.html'
}