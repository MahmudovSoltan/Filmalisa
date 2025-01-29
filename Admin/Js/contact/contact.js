const movieModal = document.querySelector("#movieModal");
const exitModal = document.querySelector(".owarlay");
const contactTable = document.querySelector("#contact_table");
const loading = document.querySelector("#loading")
const paginationContainer = document.querySelector(".pagination-container");
const perPage = 8;
let index = 1;



exitModal.addEventListener("click", () => {
  movieModal.classList.remove("active");
});



async function deleteContact(id) {
  loading.classList.remove("loadFalse")
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/contacts/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const contact = await response.json();
    console.log("data", id);
    loading.classList.add("loadFalse")
  }
  catch (error) {
    console.log(error);
  }
}


async function getContact() {
  try {
    
    const response = await fetch
      ("https://api.sarkhanrahimli.dev/api/filmalisa/admin/contacts",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
          },
        }
      );
    const contact = await response.json();
    console.log("data", contact);
    const allData = contact.data;
    const newPagination = contact.data.slice((index - 1) * perPage, index * perPage);
    contactTable.innerHTML = ""
    newPagination.forEach((contact,i) => {
      contactTable.innerHTML += `
      <tr>
      <td>${i+1}</td>
      <td>${contact.full_name}</td>
      <td>${contact.email}</td>
      <td>${contact.reason}</td>
      <td>
        <button class="table_delete_btn" onclick="handleId(${contact.id})">   <i class="fa-solid fa-trash"></i></button>
      </td>
    </tr>
      `
    })
    loading.classList.add("loadFalse")
    const deleteBtn = document.querySelectorAll(".table_delete_btn");
    deleteBtn.forEach ((btn) => {
      btn.addEventListener("click", () => {
        movieModal.classList.add("active");
      });
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
        getContact()
      });
      paginationContainer.appendChild(pageButton);
    }
    
  }
  catch (error) {
    console.log(error);
  }
}


getContact();

async function deleteContact() {
  try {
    
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/contact/${contactId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const contact = await response.json();
    console.log("data", contact);
    window.location.reload();
  }
  catch (error) {
    console.log(error
      
    );
  }
}

function logOutFunc() {
  localStorage.removeItem("Admin_token")
  window.location.href = './login.html'
}