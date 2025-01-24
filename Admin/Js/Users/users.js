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
    console.log(resp.data);

    resp.data.forEach((element) => {
      users_table.innerHTML += `
          <tr>
                <td>${element.id}</td>
                <td>${element.full_name}</td>
                <td>${element.email}</td>
                <td class="table_title">
                  <img src="${element.img_url}" alt="" />
                </td>
              </tr>
        `;
    });
  } catch (error) {
    console.error(error);
  }
}
getUsers();
