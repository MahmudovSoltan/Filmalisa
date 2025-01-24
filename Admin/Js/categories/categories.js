const creatBtn = document.querySelector("#creatBtn");
const movieModal = document.querySelector("#movieModal2");
const owarlay = document.querySelector(".owarlay");
const deleteBtn = document.querySelector("#deleteBtn");
const categoryModal = document.querySelector(".modal_category");
const delete2 = document.querySelector("#delete");
const modal_section = document.querySelector(".modal_section");
const table_body = document.querySelector("#table_body");
const creatInput = document.querySelector("#creatInput");
let deleteId = null;
let selectedCatid = null;
let allCategories = [];
let mode = false;
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const paginationContainer = document.querySelector(".pagination-container");
const perPage = 8;
let index = 1;

creatBtn.addEventListener("click", () => {
  movieModal.classList.add("active");
  mode = false;
  creatInput.value = "";
});
owarlay.addEventListener("click", () => {
  movieModal.classList.remove("active");
  categoryModal.style.display = "none";
  console.log("click");
});
delete2.addEventListener("click", () => {
  console.log("click");
  modal_section.classList.remove("active");
});

function submit() {
  const data = {
    name: creatInput.value,
  };
  if (mode) {
    editCategory(data);
  } else {
    createCategory(data);
  }
}

function handleId(id) {
  deleteId = id;
  getCattegories();
  console.log(deleteId);
}

function closeModal() {
  movieModal.classList.remove("active");
}

async function getCattegories() {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/categories",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const categories = await response.json();
    console.log(categories);
    const allData = categories.data;
    const newPagination = allData.slice((index - 1) * perPage, index * perPage);
    table_body.innerHTML = newPagination
      .map((category, i) => {
        return `
        
           <tr>
                <td>${i + 1}</td>
                <td>${category.name}</td>
                <td class="table_creat_btn" id="creat" onclick="editHandleFunc(${
                  category.id
                })">
                    <i class="fa-solid fa-pen-to-square"></i>
                  </td>
                <td class="table_delete_btn" id="deletebtn" onclick="handleId(${
                  category.id
                })">
                  <i class="fa-solid fa-trash"></i>
                </td>
              </tr>
        
        `;
      })
      .join("");
    const deleteBtn = document.querySelectorAll("#deletebtn");
    let newData = categories.data;
    newData.map((item) => {
      allCategories.push(item);
    });

    deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        categoryModal.classList.add("active");
      });
    });

    const creat = document.querySelectorAll("#creat");
    creat.forEach((btn) => {
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
        getCattegories()
      });
      paginationContainer.appendChild(pageButton);
    }

    // `Prev` düyməsi
    prev.disabled = index === 1;
    prev.addEventListener("click", () => {
      if (index > 1) {
        index--;
      getCattegories()
      }
    });

    // `Next` düyməsi
    next.disabled = index === totalPage;
    next.addEventListener("click", () => {
      if (index < totalPage) {
        index++;
      getCattegories()
      }
    });
  } catch (err) {
    console.log(err);
  }
}
getCattegories();

async function deleteCategory() {
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/category/${deleteId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const result = await response.json();
    console.log(result);
    console.log(deleteId);
    window.location.reload();
    movieModal.classList.remove("active");
  } catch (err) {
    console.log(err);
  }
}

async function createCategory(data) {
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/category`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    window.location.reload();
  } catch (err) {
    console.log(err);
    
  }
}

function editHandleFunc(element) {
  mode = true;
  selectedCatid = element;
  let findElement = allCategories.find((item) => item.id === element);
  creatInput.value = findElement.name;
  console.log(findElement.name);
}

async function editCategory(data) {
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/category/${selectedCatid}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}











function logOutFunc() {
  localStorage.removeItem("Admin_token")
  window.location.href = './login.html'
}
