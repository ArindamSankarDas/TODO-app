const addButton = document.getElementById("btn");
const select = document.querySelectorAll(".select");
const inputText = document.getElementById("input_text");
const itemCount = document.getElementById("item_count");
const setAll = document.getElementById("set_all");
const setActive = document.getElementById("set_active");
const setCompleted = document.getElementById("set_completed");
const notesContainer = document.getElementById("notes_container");
const clearCompleted = document.getElementById("clear_completed");

let numberOfItems = 0;

const showAll = (notes) => {
  notes.forEach((elem) => {
    if (
      elem.classList.contains("active") ||
      elem.classList.contains("completed")
    ) {
      elem.style.display = "inherit";
    }
  });
};

const filterActive = (notes) => {
  notes.forEach((elem) => {
    if (!elem.classList.contains("active")) {
      elem.style.display = "none";
    } else {
      elem.style.display = "inherit";
    }
  });
};

const filterCompleted = (notes) => {
  notes.forEach((elem) => {
    if (!elem.classList.contains("completed")) {
      elem.style.display = "none";
    } else {
      elem.style.display = "inherit";
    }
  });
};

const checkElementForToggle = (notes) => {
  select.forEach((elem) =>
    elem.addEventListener("click", (event) => {
      let classData = event.target.classList;

      if (classData.contains("active")) {
        return filterActive(notes);
      } else if (classData.contains("completed")) {
        return filterCompleted(notes);
      } else {
        return showAll(notes);
      }
    })
  );
};

const clearAllCompletedNotes = (notes) => {
  notes.forEach((elem) => {
    if (elem.classList.contains("completed")) {
      return elem.remove();
    } else {
      return;
    }
  });
};

const deleteNote = (event) => {
  numberOfItems -= 1;
  itemCount.innerText = `${numberOfItems} items left`;

  const note_container = event.target.parentElement;
  note_container.remove();

  if (numberOfItems === 0) {
    return (setAll.style.color = "#777a92");
  }
};

const checkBoxToggle = (event) => {
  let classListData = event.target.classList;
  let parentDat = event.target.parentElement.classList;

  if (classListData.contains("active")) {
    parentDat.remove("active");
    parentDat.add("completed");
    classListData.remove("active");
    return classListData.add("completed");
  } else {
    parentDat.remove("completed");
    parentDat.add("active");
    classListData.remove("completed");
    return classListData.add("active");
  }
};

const addNote = (data) => {
  numberOfItems += 1;
  itemCount.innerText = `${numberOfItems} items left`;

  notesContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="note active">
        <div class="check_box active" id="check_box"></div>
        <p class="text">${data}</p>
        <img id="delete" src="./images/icon-cross.svg" alt="cross"  />
    </div>`
  );

  setAll.style.color = "#3a7bfd";

  const notes = document.querySelectorAll(".note");
  const checkBox = document.getElementById("check_box");
  const deleteButton = document.getElementById("delete");

  if (notesContainer.hasChildNodes()) {
    checkElementForToggle(notes);
  }

  checkBox.addEventListener("click", checkBoxToggle);
  deleteButton.addEventListener("click", deleteNote);
  clearCompleted.addEventListener("click", () => {
    return clearAllCompletedNotes(notes);
  });
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

setAll.addEventListener("click", () => {
  setAll.style.color = "#3a7bfd";
  setActive.style.color = "#777a92";
  setCompleted.style.color = "#777a92";
});

setActive.addEventListener("click", () => {
  setActive.style.color = "#3a7bfd";
  setAll.style.color = "#777a92";
  setCompleted.style.color = "#777a92";
});

setCompleted.addEventListener("click", () => {
  setCompleted.style.color = "#3a7bfd";
  setActive.style.color = "#777a92";
  setAll.style.color = "#777a92";
});
