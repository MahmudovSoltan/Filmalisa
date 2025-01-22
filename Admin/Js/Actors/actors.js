const movieModal = document.querySelector("#movieModal");
const exitModal = document.querySelector(".owarlay");
const yesBtn = document.querySelector("#yesbtn");
const noBtn = document.querySelector("#nobtn");
const createModal = document.querySelector("#createModal"); // Create Modal
const editModal = document.querySelector("#editModal"); // Edit Modal
const overlay = document.querySelector(".owarlay");
const createBtn = document.querySelector("#createBtn");
let selectedActorId = null; // Seçilən aktyorun ID-ni saxlamaq üçün dəyişən
let actorList = []
// Modalı bağlama funksiyası
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

// Modal fonuna basıldığında bağlanması
overlay.addEventListener("click", () => {
  closeModal(movieModal);
  closeModal(createModal);
  closeModal(editModal);
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
    resp.data.forEach((element) => {
      actorList.push(element)
    });
 
    actorstable.innerHTML = ""; // Cədvəlin içinə əvvəlki məlumatları sil
    resp.data.forEach((element) => {
      actorstable.innerHTML += `
        <tr>
          <td>${element.id}</td>
          <td>${element.name}</td>
          <td>${element.surname}</td>
          <td><img class="tableimage" src="${element.img_url}" alt="Actor Image" /></td>
          <td class="table_edit_btn" onclick="editActors(${element.id})">
          <i class="fa-solid fa-pen"></i>
          </td>
          <td class="table_delete_btn" data-id="${element.id}" >
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
document.addEventListener("click", (event) => {
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
    data: {
      name,
      surname,
      img_url,
    },
  };

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

  const data = {
    data: {
      name,
      surname,
      img_url,
    },
  };

  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actor",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
        body: JSON.stringify(data),
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