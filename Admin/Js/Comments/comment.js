const movieModal = document.querySelector("#movieModal");
const deleteBtn = document.querySelector(".table_delete_btn");
const exitModal = document.querySelector(".owarlay");
const loading = document.querySelector("#loading")
const paginationContainer = document.querySelector(".pagination-container"); 
const perPage = 4;
let index = 1;

deleteBtn.addEventListener("click", () => {
  movieModal.classList.add("active");
});
exitModal.addEventListener("click", () => {
  movieModal.classList.remove("active");
});

let itemId = null;
let movieId = null;
function handLeMovieId(moviId, id) {
  itemId = id;
  movieId = moviId;
  console.log(id, moviId);
  movieModal.classList.add("active");
}
function closeOwarlay() {
  movieModal.classList.remove("active");
  console.log("clicked");
}
async function getCommnetsFunc() {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/comments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const comments = await response.json();
    const data2 = comments.data;
    data2.map((comment) => {
      console.log(comment.movie.id);
    });
    console.log(data2);
    const newPagination = comments.data.slice(
      (index - 1) * perPage,
      index * perPage
    );
    console.log(newPagination, "newPagination", comments);

    document.querySelector("#table_body").innerHTML = newPagination
      .map((comment) => {
        return `
            <tr>
            <td>${comment.id}</td>
             <td style="display: flex;justify-content: center;"><img class="table_image" src=${comment.movie?.cover_url} alt=""></td>
            <td>${comment.movie.title}</td>
            <td id="owerlay">
               <div class="overview_div">
                                  ${comment.comment}
                                  </div>
           </td>
            <td>
                <button class="table_delete_btn" onClick="handLeMovieId(${comment.movie.id},${comment.id})">   <i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
            `;
      })
      .join("");
    document.querySelectorAll("#owerlay").forEach((btn) => {
      btn.addEventListener("click", () => {
        movieModal3.classList.add("active");
        modal_header.innerHTML = btn.textContent;
        console.log(btn.textContent, "owerivewContent");
      });
    });
    document.querySelector("#owarlay3").addEventListener("click", () => {
      movieModal3.classList.remove("active");
    });
    document.querySelectorAll(".table_delete_btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        movieModal.classList.add("active");
      });
    });

    const totalPage = Math.ceil(data2.length / perPage);
   console.log("hello");
   
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
        getCommnetsFunc();
      });
      paginationContainer.appendChild(pageButton);
    }

    loading.classList.add("loadFalse")
  } catch (err) {
    console.log(err);
  }
}
getCommnetsFunc();
async function deleteCommentFunc() {
  loading.classList.remove("loadFalse")
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/movies/${movieId}/comment/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    getCommnetsFunc();
    movieModal.classList.remove("active");
    loading.classList.add("loadFalse")
  } catch (err) {
    console.log(err);
  }
}

function logOutFunc() {
  localStorage.removeItem("Admin_token");
  window.location.href = "./login.html";
}
