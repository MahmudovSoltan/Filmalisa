const creatBtn = document.querySelector("#creatBtn");
const movieModal2 = document.querySelector("#movieModal2");
const owarlay = document.querySelector(".owarlay");
// const submit_btn = document.querySelector("#submit_btn");
const movieModal = document.querySelector("#movieModal");
const owarlay2 = document.querySelector("#owarlay2");
const table_body = document.querySelector("#table_body");
const categorySelect = document.querySelector("#category");
const actorsSelect = document.querySelector("#actors");
// fomr input value

const title = document.querySelector("#title");
const overview = document.querySelector("#Overview");
const cover_url = document.querySelector("#cover_url");
const fragman = document.querySelector("#fragman");
const watch_url = document.querySelector("#watch_url");
const imdb = document.querySelector("#imdb");
const run_time_min = document.querySelector("#run_time_min");
const category = document.querySelector("#category");
const adult = document.querySelector("#adult");
const categoryId = document.querySelector("#categoryId");
//ELAVE MODALLARI ACMAQ VE DELETE BUTTONUN DUZGUN ISTIFADE ETMEK UCUN OLAN VARIABLLAR
let itemId = null;
let mode = true;
let selectedMovie = null;
let allMovies = [];
//Sehife acilanda butun filmleri gosterir
getMoviesFunc();

function submit() {
  const moviData = {
    title: title.value,
    cover_url: cover_url.value,
    fragman: fragman.value,
    watch_url: watch_url.value,
    adult: true,
    run_time_min: Number(run_time_min.value),
    imdb: imdb.value,
    category: 98 /* Comedy*/,
    actors: [159],
    overview: overview.value,
  };
    if (mode === false) {
      creatMoviesFunc(moviData );
    } else if (mode === true) { 
      updateMoviesFunc(moviData);
    }

}


const getCategoriesFunc = async () => {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/categories",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const category = await response.json();
    console.log(category);

    let options = "";
    category.data.forEach((element) => {
      options += `
         <option  id="categoryId" value="${element.id}">${element.name}</option>
      `;
    });
    categorySelect.innerHTML = options;
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};
getCategoriesFunc();

const getActorsFunc = async () => {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actors",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const actor = await response.json();
    console.log(actor);

    let options = "";
    actor.data.forEach((element) => {
      options += `
         <option value="${element.id}">${element.name}</option>
      `;
    });
    actorsSelect.innerHTML = options;
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};
getActorsFunc();

async function getMoviesFunc() {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/movies",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const movies = await response.json();
    console.log(movies);
    let newData = movies.data;
    newData.map((item) => {
      allMovies.push(item);
    });

    table_body.innerHTML = "";

    table_body.innerHTML += movies?.data
      ?.map((item, i) => {
        return `
                 <tr>
                                <td>${i + 1}</td>
                                <td class="table_title"><img class="table_image" src=${
                                  item?.cover_url
                                } alt=""> ${item?.title}</td>
                                <td>${item.overview}</td>
                                <td>${item?.category?.name}</td>
                                <td>${item?.imdb}</td>
                                <td class="table_creat_btn" id="creat" onclick="editMoviesFunc(${
                                  item.id
                                })"><i class="fa-solid fa-pen-to-square"></i></td>
                                <td class="table_delete_btn" onClick="handLeMovieId(${
                                  item.id
                                })"><i class="fa-solid fa-trash"></i></td>
                            </tr>
                        
            
            `;
      })
      .join("");

  

    document.querySelectorAll(".table_delete_btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        movieModal.classList.add("active");
      });
    });
  } catch (err) {
    console.log(err);
  }
}



owarlay.addEventListener("click", () => {
  movieModal2.classList.remove("active");
});
owarlay2.addEventListener("click", closeOwarlay2);

function closeOwarlay2() {
  movieModal.classList.remove("active");
}
async function creatMoviesFunc(moviData) {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
        body: JSON.stringify(moviData),
      }
    );
    const data = await response.json();
    movieModal.classList.remove("active");
    console.log(data);
    getMoviesFunc();
    console.log("Clicked create");
  } catch (err) {
    console.log(err);
  }
}
async function updateMoviesFunc(element) {
  try {
    await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie/${selectedMovie}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
        body: JSON.stringify(element),
      }
    );
    movieModal2.classList.remove("active");
    window.location.reload();
    console.log("Clicked update");
  } catch (err) {
    console.log(err);
  }
}

function handLeMovieId(id) {
  itemId = id;
  console.log(itemId);
}

async function deleteMovie() {
  try {
    await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie/${itemId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    getMoviesFunc();
    movieModal2.classList.remove("active");
    movieModal.classList.remove("active");
  } catch (err) {
    console.log(err);
  }
}

console.log(mode);


creatBtn.addEventListener("click", () => {
  mode = false;
  selectedMovie = null;
  title.value = "";
  overview.value = "";
  cover_url.value = "";
  fragman.value = "";
  watch_url.value = "";
  imdb.value = "";
  run_time_min.value = "";
  category.value = "";
  adult.checked = false;
  movieModal2.classList.add("active");
});


function editMoviesFunc(element) {
  selectedMovie = element;
  let findElement = allMovies.find((item) => item.id === element);
  (title.value = findElement.title),
    (cover_url.value = findElement.cover_url),
    (fragman.value = findElement.fragman),
    (watch_url.value = findElement.watch_url),
    // adult = true,
    (run_time_min.value = findElement.run_time_min),
    (imdb.value = findElement.imdb),
    // category = 98 /* Comedy*/,
    // actors = [159],
    (overview.value = findElement.overview);
  movieModal2.classList.add("active");

  
}