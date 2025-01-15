function addComment() {
  const commentInput = document.querySelector("#commentInput");
  const addedcomment = document.querySelector("#addedcomment");
  data = commentInput.value.jSON;

  if (commentInput.value.trim() !== "") {
    addedcomment.innerText += commentInput.value;
    commentInput.value = "";
    console.log(commentInput.value);
  } else {
    console.log("serh yazin");
  }
}
