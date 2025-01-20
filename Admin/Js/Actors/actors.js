// const movieModal = document.querySelector("#movieModal");
// const deleteBtn = document.querySelector(".table_delete_btn");
// const exitModal = document.querySelector(".owarlay");

// deleteBtn.addEventListener("click", () => {
//   movieModal.classList.add("active");
// });
// exitModal.addEventListener("click", () => {
//   movieModal.classList.remove("active");
// });
const movieModal = document.querySelector("#movieModal");
const exitModal = document.querySelector(".overlay");
const actorstable = document.querySelector("#actorstable");

// Hadisə dinləyiciləri
document.addEventListener("click", (event) => {
  if (event.target.closest(".table_delete_btn")) {
    movieModal.classList.add("active");
  }
  // Modalı bağlama
  if (event.target === exitModal) {
    movieModal.classList.remove("active");
  }
});

async function getActors() {
  const actorstable = document.querySelector("#actorstable");
  try {
    const token = "Dash_token";
    const responce = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actors",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Dash_token")}`,
        },
      }
    );
    const resp = await responce.json();
    console.log(resp.data);
    resp.data.forEach((element) => {
      actorstable.innerHTML += `
       <div class="movies_table_container" id="actorstable">
      <table>

      <tbody>
              <tr>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.surname}</td>
                <td><img class="tableimage" src="${element.img_url}" alt="" /></td>

                <td class="table_delete_btn" id="deletebtn">
                  <i class="fa-solid fa-trash"></i>
                </td>
              </tr>
            </tbody>
      </table>
      </div>

      `;
    });
  } catch (error) {
    console.log(error);
  }
}
getActors();
