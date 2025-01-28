const creatBtn = document.querySelector("#creatBtn");
const movieModal2 = document.querySelector("#movieModal2");
const owarlay = document.querySelector(".owarlay");
// const submit_btn = document.querySelector("#submit_btn");
const movieModal = document.querySelector("#movieModal");
const owarlay2 = document.querySelector("#owarlay2");
const table_body = document.querySelector("#table_body");
const categorySelect = document.querySelector("#category");
const actorsSelect = document.querySelector("#actors");
const sucsesfullModal = document.querySelector("#modal-success")
const failModal = document.querySelector("#modal-fail")
const loading = document.querySelector("#loading")
const modal_image = document.querySelector("#modal_image")
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
const modal_header = document.querySelector("#modal_header");
const movieModal3 = document.querySelector("#movieModal3");

const paginationContainer = document.querySelector(".pagination-container"); 
const perPage = 4;
let index = 1;
let multiselctValyu = [];
let selectedItemsId = null;
let adultValue = null;

modal_image.src = cover_url.value
  ? cover_url.value
  : "https://www.beelights.gr/assets/images/empty-image.png";

// Input sahəsində dəyişiklikləri izləyirik
cover_url.addEventListener("input", () => {
  modal_image.src = cover_url.value
    ? cover_url.value
    : "https://www.beelights.gr/assets/images/empty-image.png";
});
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

      const actorId = Number(item.getAttribute("value")); // Elementin ID-sini al

      if (multiselctValyu.includes(actorId)) {
        // Əgər artıq seçilibsə, sil
        multiselctValyu = multiselctValyu.filter((id) => id !== actorId); // Massivdən çıxar
        item.classList.remove("active"); // Dropdown-dan aktiv sinfini sil

        // Seçilmişlərdən də DOM-da sil
        const spanToRemove = selectedItemsContainer.querySelector(
          `span[data-value="${item.getAttribute("data-value")}"]`
        );
        if (spanToRemove) spanToRemove.remove();
      } else {
        // Əgər seçilməyibsə, əlavə et
        multiselctValyu.push(actorId);
        item.classList.add("active"); // Dropdown-da aktiv sinfini əlavə et

        const selectedSpan = document.createElement("span");
        selectedSpan.setAttribute(
          "data-value",
          item.getAttribute("data-value")
        );
        selectedSpan.textContent = item.getAttribute("data-value");

        // Silmə düyməsini əlavə et
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => removeActor(actorId, item, selectedSpan);

        selectedSpan.appendChild(deleteBtn);
        selectedItemsContainer.appendChild(selectedSpan);
      }

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
    adult: adult.checked,
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
      selectedItemsId = e.target.value;
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
    let newData = movies.data;
    newData.map((item) => {
      allMovies.push(item);
    });

    const allData = movies.data;
    const newPagination = allData.slice((index - 1) * perPage, index * perPage);

    // Cədvəli təmizləyirik

    table_body.innerHTML = "";

    table_body.innerHTML += newPagination
      ?.map((item, i) => {
        return `
                 <tr>
                                <td>${i + 1}</td>
                                <td style="display: flex;justify-content: center;"><img class="table_image" src=${
                                  item?.cover_url
                                } alt=""></td>
                                  <td> ${item?.title}</td>
                                <td id="owerlay" value="${item.overview}">
                                
                                  <div class="overview_div">
                                   ${item.overview}
                                  </div>
                                
                               </td>
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
        getMoviesFunc();
      });
      paginationContainer.appendChild(pageButton);
    }
    loading.classList.add("loadFalse")
  } catch (err) {
    console.log(err);
  }
}

owarlay.addEventListener("click", () => {
  movieModal2.classList.remove("active");
  window.location.reload();
});
owarlay2.addEventListener("click", closeOwarlay2);

function closeOwarlay2() {
  movieModal.classList.remove("active");
}
async function creatMoviesFunc(moviData) {
  loading.classList.remove("loadFalse")
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
    // window.location.reload();
    getMoviesFunc();
    getMoviesFunc();
   
    if (data.statusCode === 400) {
      failModal.classList.add("active")
    }else{
      sucsesfullModal.classList.add("active")
    }
    console.log(data);
    loading.classList.add("loadFalse")
  } catch (err) {
    console.log(err);
   
    console.log(failModal);

  }
}
console.log(failModal);

async function updateMoviesFunc(element) {
  loading.classList.remove("loadFalse")
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
    // window.location.reload();
    getMoviesFunc();
    if (data.statusCode === 400) {
      failModal.classList.add("active")
    }else{
      sucsesfullModal.classList.add("active")
    }
    loading.classList.add("loadFalse")
  } catch (err) {
    console.log(err);
    failModal.classList.add("active")
  }
}

function handLeMovieId(id) {
  itemId = id;
  console.log(itemId);
}

async function deleteMovie() {
  loading.classList.remove("loadFalse")
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
    sucsesfullModal.classList.add("active")
    loading.classList.add("loadFalse")
  } catch (err) {
    console.log(err);
    failModal.classList.add("active")
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
  adultValue = null;
  modal_image.src = "https://www.beelights.gr/assets/images/empty-image.png"
});

async function editMoviesFunc(element) {
  selectedMovie = element;
  try {
    const response = await fetch(
      `https://api.sarkhanrahimli.dev/api/filmalisa/admin/movies/${element}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
      }
    );
    const data = await response.json();

    // Form sahələrini doldur
    title.value = data.data.title;
    cover_url.value = data.data.cover_url;
    fragman.value = data.data.fragman;
    watch_url.value = data.data.watch_url;
    adult.checked = data.data.adult;
    run_time_min.value = data.data.run_time_min;
    imdb.value = data.data.imdb;
    overview.value = data.data.overview;
    category.value = data.data.category.id;
    modal_image.src = cover_url.value

    // Multiselect üçün aktyor ID-lərini massivin içində saxla
    multiselctValyu = data.data.actors.map((actor) => actor.id);

    // Seçilmiş elementləri DOM-a yenidən əlavə etmək
    selectedItemsContainer.innerHTML = ""; // Seçimləri təmizlə
    dropdownMenu.querySelectorAll("li").forEach((item) => {
      const actorId = Number(item.getAttribute("value"));
      const actorName = item.getAttribute("data-value");

      if (multiselctValyu.includes(actorId)) {
        // Əgər aktyor seçilmişsə, onu aktiv et və DOM-a əlavə et
        item.classList.add("active");

        const selectedSpan = document.createElement("span");
        selectedSpan.setAttribute("data-value", actorName);
        selectedSpan.textContent = actorName;

        // Silmə düyməsini əlavə et
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = () => removeActor(actorId, item, selectedSpan);

        selectedSpan.appendChild(deleteBtn);
        selectedItemsContainer.appendChild(selectedSpan);
      } else {
        // Əgər aktiv deyilsə, sinifdən çıxar
        item.classList.remove("active");
      }
    });

    movieModal2.classList.add("active");
  } catch (err) {
    console.log(err);
  }
}
function removeActor(actorId, item, span) {
  // Aktor ID-ni massivdən çıxar
  multiselctValyu = multiselctValyu.filter((id) => id !== actorId);

  // Dropdown elementindən aktiv sinifi sil
  item.classList.remove("active");

  // DOM-dan span-ı sil
  span.remove();
 // Yenilənmiş massiv
}


function closeModal() {
 sucsesfullModal.classList.remove("active")
  owarlay2.style.display = "none";
  failModal.classList.remove("active")
}

function logOutFunc() {
  localStorage.removeItem("Admin_token");
  window.location.href = "./login.html";
}
