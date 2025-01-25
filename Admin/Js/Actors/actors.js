const movieModal = document.querySelector("#movieModal");
const exitModal = document.querySelector(".owarlay");
const yesBtn = document.querySelector("#yesbtn");
const noBtn = document.querySelector("#nobtn");
const createModal = document.querySelector("#createModal"); // Create Modal
const editModal = document.querySelector("#editModal"); // Edit Modal
const overlay = document.querySelector(".owarlay");
const createBtn = document.querySelector("#createBtn");
let selectedActorId = null; // Seçilən aktyorun ID-ni saxlamaq üçün dəyişən
let actorList = [];
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
    resp.data.forEach((element) => {
      actorList.push(element);
    });

    actorstable.innerHTML = ""; // Cədvəlin içinə əvvəlki məlumatları sil
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
console.log(actorList, "actorList");

// Seçilmiş aktyoru silən funksiyanı çağıran Yes düyməsi
yesBtn.addEventListener("click", async () => {
  if (selectedActorId) {
    try {
      await deleteActor(selectedActorId);
      alert(`Actor with ID ${selectedActorId} has been deleted.`);
      location.reload(); // Yenidən yükləyərək siyahını yenilə
    } catch (error) {
      console.error("Failed to delete actor:", error);
    }
    movieModal.classList.remove("active");
  }
});

// Seçilmiş aktyoru silən funksiya
async function deleteActor(actorId) {
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor/${actorId}`,
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
  } catch (error) {
    throw error;
  }
}

// Redaktə düyməsinə basıldığında
document.querySelector("#editConfirm").addEventListener("click", (event) => {
  const editBtn = event.target.closest(".table_edit_btn");
  if (editBtn) {
    selectedActorId = editBtn.getAttribute("data-id");
    openModal(editModal); // Edit modalı aç
    // Redaktə etmək üçün lazım olan məlumatları API-dən çək və modala doldur
    // fetchActorDetails(selectedActorId);
  }
});

// Seçilmiş aktyorun məlumatlarını çək və modala doldur

// async function fetchActorDetails(actorId) {
//   try {
//     const response = await fetch(
//       `https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor/${actorId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
//         },
//       }
//     );
//     const actor = await response.json();
//     console.log(actorId);

//     document.querySelector("#editName").value = actor.name;
//     document.querySelector("#editSurname").value = actor.surname;
//     document.querySelector("#editImage").value = actor.img_url;
//   } catch (error) {
//     console.error("Failed to fetch actor details:", error);
//   }
// }

// Aktyor redaktə funksiyası
const editConfirmBtn = document.querySelector("#editConfirm");
editConfirmBtn.addEventListener("click", async () => {
  const name = document.querySelector("#editName").value;
  const surname = document.querySelector("#editSurname").value;
  const img_url = document.querySelector("#editImage").src;

  if (!name || !surname || !img_url) {
    alert("All fields are required!");
    return;
  }

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
    console.log(data);

    if (response.ok) {
      closeModal(editModal);
      alert("Actor updated successfully!");
      getActors(); // Yenidən cədvəli yenilə
    } else {
      alert("Failed to update actor.");
    }
  } catch (err) {
    console.error("Error updating actor:", err);
  }
});

// Aktyor yaratma funksiyası
const createConfirmBtn = document.querySelector("#createConfirm");
createConfirmBtn.addEventListener("click", async () => {
  const name = document.querySelector("#createName").value;
  const surname = document.querySelector("#createSurname").value;
  const img_url = document.querySelector("#createImage").value;

  if (!name || !surname || !img_url) {
    alert("All fields are required!");
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

    if (response.ok) {
      closeModal(createModal);
      alert("Actor created successfully!");
      getActors(); // Yenidən cədvəli yenilə
    } else {
      alert("Failed to create actor.");
    }
  } catch (err) {
    console.error("Error creating actor:", err);
  }
});

// Get and display actors when the page loads
getActors();

function editActors(id) {
  const actor = actorList.find((actor) => actor.id === id);
  console.log(id);
  document.querySelector("#editName").value = actor.name;
  document.querySelector("#editSurname").value = actor.surname;
  document.querySelector("#editImage").value = actor.img_url;
  selectedActorId = id;
  openModal(editModal);
}
