"use strict";

/**
 * Class TodoList: Lists all todos
 */

class TodoList {

    constructor(app) {
        this._app = app;
        this._mainElement = document.getElementById("vorlage-aufgaben-liste");

        this._filterBar = document.getElementById("filterbar");
        this._filterBar.addEventListener('keyup', () => this._filter());

        this._sortButton = document.getElementById("sortButton");
        this._sortCriteria = 0; // 0 -> dringlichkeit absteigend
        this._sortButton.addEventListener('click', () => this._sort());
    }

    show() {
        this._renderList();
        this._mainElement.classList.remove("hidden");
    }

    hide() {
        this._mainElement.classList.add("hidden");
    }

    _renderList() {
        let list = document.querySelector("#vorlage-aufgaben-liste > ul");
        list.innerHTML = "";

        let todos = this._app.getTodos();
        if (todos.length < 1) {
            let template = document.getElementById("vorlage-aufgaben-liste-leer").innerHTML;
            list.innerHTML = template;
            return;
        }
        this._app.sortTodos(this._sortCriteria);

        todos.forEach(todo => {
            var divTodoBox = document.createElement("LI");
            divTodoBox.className = "todobox";
              var ulTodoHeader = document.createElement("UL");
              if (todo.dringlichkeit == "1"){
                ulTodoHeader.style="background-color: #FF2035"
              } else if (todo.dringlichkeit == "2"){
                ulTodoHeader.style="background-color: #FF8B07"
              } else if (todo.dringlichkeit == "3"){
                ulTodoHeader.style="background-color: #3BBF4C"
              } else{
                // not highlight
              }
              ulTodoHeader.className = "todoheader";
                var liPerson = document.createElement("LI");
                var liPersonText = document.createTextNode(todo.zustaendig+ ":");
                liPerson.appendChild(liPersonText);
              ulTodoHeader.appendChild(liPerson);
                var liTitle = document.createElement("LI");
                var liTitleText = document.createTextNode(todo.aufgabe);
                liTitle.appendChild(liTitleText);
              ulTodoHeader.appendChild(liTitle);
              var ulTodoFooter = document.createElement("UL");
              ulTodoFooter.className = "todofooter";
                var liTime = document.createElement("LI");
                var liTimeText = document.createTextNode(todo.datum);
                liTime.appendChild(liTimeText);
              ulTodoFooter.appendChild(liTime);
                var liDescription = document.createElement("LI");
                var liDescriptionText = document.createTextNode(todo.beschreibung);
                liDescription.appendChild(liDescriptionText);
              ulTodoFooter.appendChild(liDescription);
            divTodoBox.appendChild(ulTodoHeader);
            divTodoBox.appendChild(ulTodoFooter);
            list.appendChild(divTodoBox);
        });
        // add buttons
        var headerElements = document.getElementsByClassName("todoheader");
        for (var i = 0; i < headerElements.length; i++) {
          let index = i;
          // delete button
          var deleteButton = document.createElement("SPAN");
          var deleteText = document.createTextNode("\u00D7");
          deleteButton.className = "close";
          deleteButton.appendChild(deleteText);
          deleteButton.addEventListener("click", () => this._askDelete(0 + index));
          headerElements[i].appendChild(deleteButton);
          // update button
          var updateButton = document.createElement("SPAN");
          var updateText = document.createTextNode("\u270E");
          updateButton.className = "close";
          updateButton.appendChild(updateText);
          updateButton.addEventListener("click", () => this._askUpdate(0 + index));
          headerElements[i].appendChild(updateButton);
        }
    }

    _askDelete(index) {
        //ask again
        let answer = confirm("Soll die ausgewählte Aufgabe wirklich gelöscht werden?");
        if (!answer) return;

        //delete dataset
        this._app.deleteTodoByIndex(index);

        //output list again
        this._renderList();
    }

    _askUpdate(index) {
      //ask again
      let answer = confirm("Soll die ausgewählte Aufgabe wirklich bearbeitet werden?");
      if (!answer) return;

      //edit dataset
      this._app.showPage("aufgabe-bearbeiten", index)

      //output list again
      this._renderList();
    }

    _filter(){
      let input = this._filterBar.value.toUpperCase();
      let filterValues = input.split(/[ ,]+/);

      let element = document.getElementById("aufgabenliste").getElementsByClassName("todobox");
      let listIndex, filterValueIndex;

      for (listIndex = 0; listIndex < element.length; listIndex++) {
        let elementText = element[listIndex].innerText.toUpperCase();
        element[listIndex].style.display = "";
        for (filterValueIndex = 0; filterValueIndex < filterValues.length; filterValueIndex++) {
          if (!elementText.includes(filterValues[filterValueIndex])){
            // hide element
            element[listIndex].style.display = "none";
            break;
          }
        }
      }
    }

    _sort(){
      this._sortCriteria = (this._sortCriteria + 1) % 4;
      if (this._sortCriteria == 0) {
        this._sortButton.innerHTML = "Dringlichkeit absteigend";
      } else if (this._sortCriteria == 1) {
        this._sortButton.innerHTML = "Dringlichkeit aufsteigend";
      } else if (this._sortCriteria == 2) {
        this._sortButton.innerHTML = "Datum absteigend";
      } else if (this._sortCriteria == 3) {
        this._sortButton.innerHTML = "Datum aufsteigend";
      }
      this._renderList();
      this._filter();
    }
}
