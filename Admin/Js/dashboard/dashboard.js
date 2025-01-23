const favactionsnum = document.querySelector("#favactionsnum");
const usersnum = document.querySelector("#usersnum");
const moviesnum = document.querySelector("#moviesnum");
const commentsnum = document.querySelector("#commentsnum");
const categoriesnum = document.querySelector("#categoriesnum");
const actorsnum = document.querySelector("#actorsnum");
const contactnum = document.querySelector("#contactnum");
const cardcontainer = document.querySelector("#cardcontainer");

async function getinfo() {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInN1YiI6MywiaWF0IjoxNzM3MjA3MjA2LCJleHAiOjE3NjgzMTEyMDZ9.tIYNB1De_mp7T0z1ymWbCxnuFJjnGuJSVfM_jZ56IUY";
    const responce = await fetch(
      "https://api.sarkhanrahimli.dev/api/filmalisa/admin/dashboard",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const resp = await responce.json();

    localStorage.setItem("Dash_token", token);
    console.log(resp.data);
    const element = resp.data;

    cardcontainer.innerHTML += `

        <div class="cardbig">
            <div class="quote">Favorite actions</div>

            <div class="number" id="favactionsnum">${element.favorites}</div>
          </div>
          <div class="cardpurple">
            <div class="quote">Users</div>

            <div class="number" id="usersnum">${element.users}</div>
          </div>
          <div class="card">
            <div class="quote">Movies</div>

            <div class="number" id="moviesnum">${element.movies}</div>
          </div>
          <div class="card">
            <div class="quote">Comments</div>

            <div class="number" id="commentsnum">${element.comments}</div>
          </div>
          <div class="cardbig">
            <div class="quote">Categories</div>

            <div class="number" id="categoriesnum">${element.categories}</div>
          </div>
          <div class="cardpurple">
            <div class="quote">Actors</div>

            <div class="number" id="actorsnum">${element.actors}</div>
          </div>
          <div class="card">
            <div class="quote">Contacts</div>
            <div class="number" id="contactnum">${element.contacts}</div>
          </div>
        `;
  } catch (error) {
    console.log(error);
  }
}
getinfo();
