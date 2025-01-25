const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const paginationContainer = document.querySelector(".pagination-container");
const perPage = 5;
let index = 1;

async function getUsers() {
  const users_table = document.querySelector("#users_table tbody");
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Dash_token")}`,
        },
      }
    );
    const resp = await response.json();
    const allData = resp.data;

    // Tablo məlumatlarını təmizləyirik
    users_table.innerHTML = "";

    // Yeni səhifənin məlumatlarını əlavə edirik
    const newPagination = allData.slice((index - 1) * perPage, index * perPage);
    newPagination.forEach((element, i) => {
      users_table.innerHTML += `
          <tr>
                <td>${i + 1 + (index - 1) * perPage}</td>
                <td style="display: flex;justify-content: center;"><img class="table_image" src=${
                  element.img_url
                    ? element.img_url
                    : "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                } alt=""></td>
                <td>${element.full_name}</td>
                <td>${element.email}</td>
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
        getUsers();
      });
      paginationContainer.appendChild(pageButton);
    }

    // `Prev` və `Next` düymələrinin əvvəlki dinləyicilərini silmək
    prev.replaceWith(prev.cloneNode(true));
    next.replaceWith(next.cloneNode(true));
  } catch (error) {
    console.error(error);
  }
}
getUsers();
