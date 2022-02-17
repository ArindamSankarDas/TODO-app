const inputText = document.getElementById("input_text");
const notesContainer = document.getElementById("notes_container");
const addButton = document.getElementById("btn");
const itemCount = document.getElementById("item_count");

let numberOfItems = 0;

const deleteNote = (event) => {
  numberOfItems -= 1;
  itemCount.innerText = `${numberOfItems} items left`;

  const note_container = event.target.parentElement;
  return note_container.remove();
};

const checkBoxToggle = (event) => {
  let classListData = event.target.classList;

  if (classListData.contains("active")) {
    classListData.remove("active");
    return classListData.add("completed");
  } else {
    classListData.remove("completed");
    return classListData.add("active");
  }
};

const addNote = (data) => {
  numberOfItems += 1;
  itemCount.innerText = `${numberOfItems} items left`;

  notesContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="note">
    <div class="check_box active" id="check_box"></div>
    <p class="text">${data}</p>
    <img id="delete" src="./images/icon-cross.svg" alt="cross"  />
    </div>`
  );

  const checkBox = document.getElementById("check_box");
  const deleteButton = document.getElementById("delete");

  checkBox.addEventListener("click", checkBoxToggle);

  deleteButton.addEventListener("click", deleteNote);
};

addButton.addEventListener("click", () => {
  const inputTextVal = inputText.value;

  if (inputTextVal) {
    inputText.value = "";
    return addNote(inputTextVal);
  } else {
    return;
  }
});
