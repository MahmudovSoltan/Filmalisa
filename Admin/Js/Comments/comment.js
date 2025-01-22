const movieModal = document.querySelector("#movieModal");
const deleteBtn = document.querySelector(".table_delete_btn");
const exitModal = document.querySelector(".owarlay");
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
    document.querySelector("#table_body").innerHTML = comments.data
      .map((comment) => {
        return `
            <tr>
            <td>${comment.id}</td>
            <td>${comment.movie.title}</td>
            <td>${comment.comment}</td>
            <td>
                <button class="table_delete_btn" onClick="handLeMovieId(${comment.movie.id},${comment.id})">   <i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
            `;
      })
      .join("");
  } catch (err) {
    console.log(err);
  }
}
getCommnetsFunc();
async function deleteCommentFunc() {
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
  } catch (err) {
    console.log(err);
  }
}
