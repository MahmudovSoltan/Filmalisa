const creatBtn = document.querySelector("#creatBtn");
const movieModal2 = document.querySelector("#movieModal2");
const owarlay = document.querySelector(".owarlay");
const submit_btn = document.querySelector("#submit_btn")
const movieModal = document.querySelector("#movieModal");
const owarlay2 = document.querySelector("#owarlay2");
const table_body = document.querySelector("#table_body");

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
  
 let itemId = null


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
    console.log(movies.data);
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
                                <td class="table_creat_btn" id="creat"><i class="fa-solid fa-pen-to-square"></i></td>
                                <td class="table_delete_btn" onClick="handLeMovieId(${item.id})"><i class="fa-solid fa-trash"></i></td>
                            </tr>
                        
            
            `;
      })
      .join("");

    document.querySelectorAll(".table_creat_btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        movieModal2.classList.add("active");
      });
    });

    document.querySelectorAll(".table_delete_btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        movieModal.classList.add("active");
      });
    });
  } catch (err) {
    console.log(err);
  }
}

getMoviesFunc();

creatBtn.addEventListener("click", () => {
  movieModal2.classList.add("active");
});
owarlay.addEventListener("click", () => {
  movieModal2.classList.remove("active");
});
owarlay2.addEventListener("click",closeOwarlay2 );

function closeOwarlay2() {
    movieModal.classList.remove("active"); 
}
async function creatMoviesFunc(event) {

    event.preventDefault()
  const moviData = {
    title: title.value,
    cover_url:cover_url.value,
    fragman: fragman.value,
    watch_url:watch_url.value,
    adult: true,
    run_time_min: Number(run_time_min.value),
    imdb: imdb.value,
    category: 1 /* Comedy*/,
    actors: [2, 10],
    overview:overview.value,
  };
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
      getMoviesFunc();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

function handLeMovieId(id) {
    itemId = id
    console.log(itemId);
    
}

async function deleteMovie() {
    try{
         await fetch(`https://api.sarkhanrahimli.dev/api/filmalisa/admin/movie/${itemId}`,{
            method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: ` Bearer ${localStorage.getItem("Admin_token")}`,
        },
        })
        getMoviesFunc();
        movieModal2.classList.remove("active");
        movieModal.classList.remove("active");
    }catch(err){
        console.log(err);
        
    }
}  
