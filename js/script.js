// Events before any note is present
const addButton = document.getElementById("btn");
const select = document.querySelectorAll(".select");
const inputText = document.getElementById("input_text");
const itemCount = document.getElementById("item_count");
const setAll = document.getElementById("set_all");
const setActive = document.getElementById("set_active");
const setCompleted = document.getElementById("set_completed");
const notesContainer = document.getElementById("notes_container");
const clearCompleted = document.getElementById("clear_completed");
const imgToggler = document.getElementById("img_btn");
const theme = document.getElementById("theme");

// variable created to keep track of the number of items
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
  let newArr = [];
  notes.forEach((elem) => {
    if (elem.classList.contains("active")) {
      newArr.push(elem);
    }
  });

  numberOfItems = newArr.length;
  itemCount.innerText = `${numberOfItems} items left`;

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

  if (numberOfItems === 0) {
    setAll.style.color = "#777a92";
  }
  const note_container = event.target.parentElement;
  return note_container.remove();
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
  // Keeping track of the number of notes added
  numberOfItems += 1;
  itemCount.innerText = `${numberOfItems} items left`;

  // Insert html content after add item is clicked
  notesContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="note active">
        <div class="check_box active" id="check_box"></div>
        <p class="text">${data}</p>
        <img id="delete" src="./images/icon-cross.svg" alt="cross"  />
    </div>`
  );

  //Setting the default color
  setAll.style.color = "#3a7bfd";

  // Events after notes are added
  const notes = document.querySelectorAll(".note");
  const checkBox = document.getElementById("check_box");
  const deleteButton = document.getElementById("delete");

  // to check if there are any child Nodes
  if (notesContainer.hasChildNodes()) {
    checkElementForToggle(notes);
  }

  // Event actions available after creating a note
  checkBox.addEventListener("click", checkBoxToggle);
  deleteButton.addEventListener("click", deleteNote);
  clearCompleted.addEventListener("click", () => clearAllCompletedNotes(notes));
};

// click event action to add note
addButton.addEventListener("click", () => {
  const inputTextVal = inputText.value;

  if (inputTextVal) {
    inputText.value = "";
    return addNote(inputTextVal);
  } else {
    return;
  }
});

imgToggler.addEventListener("click", () => {
  let img = imgToggler.src;
  theme.classList.toggle("light_mode");

  if (img.indexOf("icon-moon.svg") != -1) {
    return (imgToggler.src = "../images/icon-sun.svg");
  } else {
    return (imgToggler.src = "../images/icon-moon.svg");
  }
});

// click event actions to change color after a note is added
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
