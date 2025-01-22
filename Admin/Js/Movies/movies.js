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
let category = document.querySelector("#category");
const adult = document.querySelector("#adult");
const categoryId = document.querySelector("#categoryId");
const miltiselectEl = document.querySelectorAll("#miltiselectEl");
//ELAVE MODALLARI ACMAQ VE DELETE BUTTONUN DUZGUN ISTIFADE ETMEK UCUN OLAN VARIABLLAR
let itemId = null;
let mode = true;
let selectedMovie = null;
let allMovies = [];
let multiselctValyu = [];
let selectedItemsId = null
let adultValue = null
//Sehife acilanda butun filmleri gosterir
getMoviesFunc();


const dropdown = document.getElementById("dropdown");
const dropdownMenu = document.getElementById("dropdownMenu");
const selectedItemsContainer = document.getElementById("selectedItems");

function handleCheckBox() {
  adultValue = adult.checked;
}


// Dropdown-u açıb-bağlamaq üçün funksiya
const toggleMenu = () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
};

const updateSelectedItems = (item) => {
  const value = item.getAttribute("data-value");
  if (item.classList.contains("active")) {
    item.classList.remove("active");
    selectedItemsContainer.querySelector(`[data-value="${value}"]`).remove();
  } else {
    item.classList.add("active");
    const selectedSpan = document.createElement("span");
    selectedSpan.setAttribute("data-value", value);
    selectedSpan.textContent = value;
    selectedItemsContainer.appendChild(selectedSpan);
  }
};

// Dropdown kliklə hadisəni idarə et
dropdown.addEventListener("click", toggleMenu);

// Dinamik seçimləri idarə etmək üçün funksiyanı bağlama
const attachClickEventToMenu = () => {
  dropdownMenu.querySelectorAll("li").forEach((item) => {
    item.addEventListener("click", (event) => {
      event.stopPropagation(); // Başqa klik hadisələrinin qarşısını al
      updateSelectedItems(item);
      console.log(item.value);
      multiselctValyu.push(item.value);

      console.log(multiselctValyu);
    });
  });
};

// Aktyorları çəkən və menyuya əlavə edən funksiya
const getActorsFunc = async () => {
  try {
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/actors",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const actor = await response.json();
    console.log(actor);

    // Gələn məlumatlarla menyunu yenilə
    let options = "";
    actor.data.forEach((element) => {
      options += `
        <li data-value="${element.name}" value='${element.id}' id='miltiselectEl'><i class="fa fa-check"></i> ${element.name}</li>
      `;
    });
    dropdownMenu.innerHTML = options;

    // Seçimlərə klik hadisələrini bağlamaq
    attachClickEventToMenu();
  } catch (err) {
    console.error("Error fetching actors:", err);
  }
};

// İlk olaraq aktyorları çağır
getActorsFunc();

// Dropdown bağlamaq üçün klik hadisəsini idarə et
document.addEventListener("click", (event) => {
  if (!dropdown.contains(event.target)) {
    dropdownMenu.style.display = "none";
  }
});

function submit() {
  const moviData = {
    title: title.value,
    cover_url: cover_url.value,
    fragman: fragman.value,
    watch_url: watch_url.value,
    adult: adultValue,
    run_time_min: Number(run_time_min.value),
    imdb: imdb.value,
    category: Number(selectedItemsId) /* Comedy*/,
    actors: multiselctValyu,
    overview: overview.value,
  };
  if (mode === false) {
    creatMoviesFunc(moviData);
  } else if (mode === true) {
    updateMoviesFunc(moviData);
  }
}
function handleselctCategiryId(e) {
  // selectedItemsId = id;
  console.log(selectedItemsId);
  console.log(e);
}
console.log(category);

category.addEventListener("click",()=>{
  console.log();
  
})
const getCategoriesFunc = async () => {
  try {
    // API sorğusu
    const response = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/categories",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const category = await response.json();

    // HTML-də seçmə elementini tap
    const categorySelect = document.getElementById("category");

    let options = '<option value="">Kateqoriya seç</option>'; // Default seçim
    category.data.forEach((element) => {
      options += `
         <option value="${element.id}">${element.name}</option>
      `;
    });

    // Seçmə elementinə seçimləri əlavə et
    categorySelect.innerHTML = options;

    // Dəyişiklik hadisəsini bağla
    categorySelect.addEventListener("change", (e) => {
      selectedItemsId = e.target.value
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};

// Funksiyanı çağır
getCategoriesFunc();


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
    movieModal2.classList.remove("active");
    window.location.reload();
    console.log(moviData);
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
    // movieModal2.classList.remove("active");
    // window.location.reload();
    console.log(element);
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
  multiselctValyu = [];
  movieModal2.classList.add("active");
  adultValue=null
});

function editMoviesFunc(element) {
  selectedMovie = element;
  let findElement = allMovies.find((item) => item.id === element);
  (title.value = findElement.title),
    (cover_url.value = findElement.cover_url),
    (fragman.value = findElement.fragman),
    (watch_url.value = findElement.watch_url),
    adult.checked = findElement.adult,
    (run_time_min.value = findElement.run_time_min),
    (imdb.value = findElement.imdb),
    category.value = selectedItemsId /* Comedy*/,
    // actors.value = [159],
    (overview.value = findElement.overview);
  movieModal2.classList.add("active");
  console.log(findElement);
  
}
