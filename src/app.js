import "./styles/style.css";
import "./script/components/AppBar.js";
import "./script/components/BodyText.js";
import "./script/components/NoteItem.js";
import DataApi from "./script/data/data-api.js";
import anime from "animejs";

document.addEventListener("DOMContentLoaded", () => {
  const notesContainer = document.getElementById("notes-container");
  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerText = "Loading...";
  document.body.appendChild(loader);

  function showLoader() {
    loader.style.display = "block";
    document.body.style.pointerEvents = "none";
    document.body.style.opacity = "0.4";
    anime({
      targets: loader,
      opacity: 1,
      duration: 500,
      easing: "easeInOutSine",
    });
  }

  function hideLoader() {
    loader.style.display = "none";
    document.body.style.pointerEvents = "auto";
    document.body.style.opacity = "1";
    anime({
      targets: loader,
      opacity: 0,
      duration: 500,
      easing: "easeInOutSine",
    });
  }

  function loadNotes() {
    showLoader();
    DataApi.search()
      .then((responseJson) => {
        hideLoader();
        notesContainer.innerHTML = ""; // Clear existing notes
        responseJson.data.forEach((note) => {
          const noteElement = document.createElement("note-item");
          noteElement.setAttribute("id", note.id); // Assuming ID is included in note
          noteElement.setAttribute("title", note.title);
          noteElement.setAttribute("body", note.body);
          notesContainer.appendChild(noteElement);
          anime({
            targets: noteElement,
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutSine",
          });
        });
      })
      .catch((error) => {
        hideLoader();
        alert(`Error loading notes: ${error.message}`);
      });
  }

  function toggleModal() {
    const modal = document.getElementById("modal");
    modal.classList.toggle("hidden");
    modal.style.display = modal.style.display === "block" ? "none" : "block";
    anime({
      targets: modal,
      opacity: [0, 1],
      duration: 500,
      easing: "easeInOutSine",
    });
  }

  // Event listener for removing notes
  notesContainer.addEventListener("click", function (event) {
    const noteElement = event.target.closest("note-item");
    if (!noteElement) return; // No note-item found

    const noteId = noteElement.getAttribute("id");

    if (event.target.classList.contains("remove-btn")) {
      const confirmation = confirm("Are you sure you want to delete this note?");
      if (confirmation) {
        showLoader();
        DataApi.delete(noteId)
          .then(() => {
            hideLoader();
            noteElement.remove();
          })
          .catch((error) => {
            hideLoader();
            alert(`Error deleting note: ${error.message}`);
          });
      }
    }

    if (event.target.classList.contains("archive-btn")) {
      const confirmation = confirm("Are you sure you want to archive this note?");
      if (confirmation) {
        showLoader();
        DataApi.archive(noteId)
          .then(() => {
            hideLoader();
            noteElement.remove();
          })
          .catch((error) => {
            hideLoader();
            alert(`Error archiving note: ${error.message}`);
          });
      }
    }

    if (event.target.classList.contains("unarchive-btn")) {
      const confirmation = confirm("Are you sure you want to unarchive this note?");
      if (confirmation) {
        showLoader();
        DataApi.unarchive(noteId)
          .then(() => {
            hideLoader();
            noteElement.remove();
          })
          .catch((error) => {
            hideLoader();
            alert(`Error unarchiving note: ${error.message}`);
          });
      }
    }
  });

  // Event listener for adding notes
  document.getElementById("add-note-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const title = document.getElementById("note-title").value;
    const body = document.getElementById("note-body").value;
    showLoader();
    DataApi.insert(title, body)
      .then((responseJson) => {
        hideLoader();
        const newNote = responseJson.data; // Assuming API returns the new note data
        const noteElement = document.createElement("note-item");
        noteElement.setAttribute("id", newNote.id);
        noteElement.setAttribute("title", newNote.title);
        noteElement.setAttribute("body", newNote.body);
        notesContainer.appendChild(noteElement);
        anime({
          targets: noteElement,
          opacity: [0, 1],
          duration: 500,
          easing: "easeInOutSine",
        });
        document.getElementById("add-note-form").reset();
        toggleModal();
      })
      .catch((error) => {
        hideLoader();
        alert(`Error adding note: ${error.message}`);
      });
  });

  // Event listener for modal toggle
  document.querySelector("app-bar button").addEventListener("click", function () {
    toggleModal();
  });

  document.querySelector(".close-btn").addEventListener("click", function () {
    toggleModal();
  });

  // Flag button event listener
  document.querySelector(".flag-btn").addEventListener("click", function () {
    const flagInput = document.getElementById("flag");
    const flagButton = document.querySelector(".flag-btn");

    if (flagInput.value === "x") {
      flagInput.value = "";
      flagButton.style.opacity = "0.5";
      DataApi.searchArc()
        .then((responseJson) => {
          notesContainer.innerHTML = "";
          responseJson.data.forEach((note) => {
            const noteElement = document.createElement("note-item");
            noteElement.setAttribute("id", note.id);
            noteElement.setAttribute("title", note.title);
            noteElement.setAttribute("body", note.body);
            notesContainer.appendChild(noteElement);
          });
        })
        .catch((error) => {
          alert(`Error fetching archived notes: ${error.message}`);
        });
    } else {
      loadNotes();
      flagInput.value = "x";
      flagButton.style.opacity = "1";
    }
  });

  // Close modal on outside click
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
      toggleModal();
    }
  });

  // Initial load of notes
  loadNotes();
});
