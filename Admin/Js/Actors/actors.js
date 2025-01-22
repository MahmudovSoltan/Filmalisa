////
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
// "Create" düyməsinə basıldığında
createBtn.addEventListener("click", () => {
  openModal(createModal);
});

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

// Modalı açan hadisə dinləyicisi
document.addEventListener("click", (event) => {
  const deleteBtn = event.target.closest(".table_delete_btn");
  if (deleteBtn) {
    selectedActorId = deleteBtn.getAttribute("data-id"); // ID-ni əldə et
    movieModal.classList.add("active");
  }
});

// Modalı bağlayan hadisə dinləyiciləri
exitModal.addEventListener("click", () => {
  movieModal.classList.remove("active");
});
noBtn.addEventListener("click", () => {
  movieModal.classList.remove("active");
});
//aktyor creat eden funksiya
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

    resp.data.forEach((element) => {
      actorstable.innerHTML += `
        <tr>
          <td>${element.id}</td>
          <td>${element.name}</td>
          <td>${element.surname}</td>
          <td><img class="tableimage" src="${element.img_url}" alt="Actor Image" /></td>
          <td class="table_edit_btn" data-id="${element.id}">
          <i class="fa-solid fa-pen"></i>
          </td>
          <td class="table_delete_btn" data-id="${element.id}">
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
          Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
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
// // Redaktə düyməsinə basıldığında
// document.addEventListener("click", (event) => {
//   const editBtn = event.target.closest(".table_edit_btn");
//   if (editBtn) {
//     selectedActorId = editBtn.getAttribute("data-id");
//     openModal(editModal); // Edit modalı aç
//     // Redaktə etmək üçün lazım olan məlumatları API-dən çək və modala doldur
//     fetchActorDetails(selectedActorId);
//   }
// });

// // Seçilmiş aktyorun məlumatlarını çək və modala doldur
// async function fetchActorDetails(actorId) {
//   try {
//     const response = await fetch(
//       `https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor/${actorId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
//         },
//       }
//     );
//     const actor = await response.json();
//     document.querySelector("#editName").value = actor.name;
//     document.querySelector("#editSurname").value = actor.surname;
//     document.querySelector("#editImage").value = actor.img_url;
//   } catch (error) {
//     console.error("Failed to fetch actor details:", error);
//   }
// }

// ///creat function start
// // Aktyor yaratma funksiyası
// createConfirmBtn.addEventListener("click", async () => {
//   const name = createNameInput.value;
//   const surname = createSurnameInput.value;
//   const img_url = createImageInput.value;

//   if (!name || !surname || !img_url) {
//     alert("All fields are required!");
//     return;
//   }

//   const data = {
//     data: {
//       name,
//       surname,
//       img_url,
//     },
//   };

//   try {
//     const response = await fetch(
//       "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
//         },
//         body: JSON.stringify(data), // Tələb olunan quruluşu göndəririk
//       }
//     );

//     if (response.ok) {
//       closeModal(createModal);
//       alert("Actor created successfully!");
//       getActors(); // Yeni aktoru göstərmək üçün cədvəli yenilə
//     } else {
//       alert("Failed to create actor.");
//     }
//   } catch (err) {
//     console.error("Error creating actor:", err);
//   }
// });

// ///creat function end
// // İlk olaraq aktyorları yüklə
// getActors();
