const creatBtn = document.querySelector("#creatBtn");
const movieModal2 = document.querySelector("#movieModal2");
const movieModal = document.querySelector("#movieModal");
const movies_table_container = document.querySelector(
  "#movies_table_container"
);
const title = document.querySelector("#title");
const Overview = document.querySelector("#Overview");
const cover_url = document.querySelector("#cover_url");
const youtube_embed_url = document.querySelector("#youtube_embed_url");
const watch_url = document.querySelector("#watch_url");
const imdb = document.querySelector("#imdb");
const run_time_munite = document.querySelector("#run_time_munite");
let movieId = null;

creatBtn.addEventListener("click", () => {
  movieModal2.classList.add("active");
});

document.querySelectorAll(".owarlay").forEach((overlay) => {
  overlay.addEventListener("click", () => {
    overlay.closest(".modal_section").classList.remove("active");
  });
});

// Filmləri alma funksiyası
async function getMoviesFunc() {
  const token = localStorage.getItem("admin_tokon");
  if (!token) {
    console.error("Admin token is missing!");
    window.location.href = "/login.html";
    return;
  }

  try {
    // API-dan filmləri gətirin
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/movies",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const movies = await response.json();

    // Mövcud məzmunu təmizləyin
    movies_table_container.innerHTML = "";

    // Gələn filmləri siyahıya əlavə edin
    movies.data.forEach((element, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td class="table_title"><img width="29px" src="${
          element.cover_url || "../Assets/Image/movie.svg"
        }" alt=""> ${element.title}</td>
        <td>${element.overview || "No description"}</td>
        <td>${element.category.name || "Unknown"}</td>
        <td>${element.imdb || "N/A"}</td>
        <td class="table_creat_btn"><i class="fa-solid fa-pen-to-square"></i></td>
        <td class="table_delete_btn" onclick="handleMovieId(${element.id})"><i class="fa-solid fa-trash"></i></td>
      `;
      movies_table_container.appendChild(tr);
    });
  } catch (error) {
    console.error(error);
  }
}

// Dinamik Event Handling
movies_table_container.addEventListener("click", (event) => {
  if (event.target.closest(".table_creat_btn")) {
    movieModal2.classList.add("active");
    console.log("Edit button clicked");
  }
  if (event.target.closest(".table_delete_btn")) {
    movieModal.classList.add("active");
    console.log("Delete button clicked");
  }
});

getMoviesFunc();

function handleMovieId(id) {
  movieId = id;
}

async function deleteMovi() {
  try {
    const token = localStorage.getItem("admin_tokon");
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (response.ok) {
      console.log("Movie deleted successfully");
      getMoviesFunc(); // Siyahını yenilə
    } else {
      console.error("Failed to delete movie:", await response.text());
    }
    movieModal.classList.remove("active");
  } catch (error) {
    console.error(error);
  }
}

async function creatMovies(event) {
  event.preventDefault();
  const token = localStorage.getItem("admin_tokon");
  if (!token) {
    console.error("Admin token is missing!");
    return;
  }

  const formData = {
    title: title.value.trim(),
    cover_url: cover_url.value.trim(),
    fragman: youtube_embed_url.value.trim(),
    watch_url: watch_url.value.trim(),
    adult: true,
    run_time_min: Number(run_time_munite.value.trim()),
    imdb: imdb.value.trim(),
    category: 1,
    actors: [1, 2],
    overview: Overview.value.trim(),
  };

  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      movieModal2.classList.remove("active");
      console.log("Movie created successfully:", await response.json());
      getMoviesFunc(); // Siyahını yenilə
    } else {
      console.error("Failed to create movie:", await response.text());
    }
  } catch (err) {
    console.error("Error occurred:", err);
  }
}
