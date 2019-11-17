"use strict";

/**
 * Class TodoList: Lists all todos
 */

class TodoList {

    constructor(app) {
        this._app = app;
        this._mainElement = document.getElementById("vorlage-aufgaben-liste");

        this._filterBar = document.getElementById("filterbar");
        this._filterBar.addEventListener('keyup', () => this._filtere());

        this._sortButton = document.getElementById("sortButton");
        this._sortCriteria = 0; // 0 -> dringlichkeit absteigend
        this._sortButton.addEventListener('click', () => this._sortiere());
    }

    show() {
        this._renderList();
        this._mainElement.classList.remove("hidden");
    }

    hide() {
        this._mainElement.classList.add("hidden");
    }

    _renderList() {
        let liste = document.querySelector("#vorlage-aufgaben-liste > ul");
        liste.innerHTML = "";

        let todos = this._app.getTodos();
        if (todos.length < 1) {
            let template = document.getElementById("vorlage-aufgaben-liste-leer").innerHTML;
            liste.innerHTML = template;
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
                // not
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
                var liZeit = document.createElement("LI");
                var liZeitText = document.createTextNode(todo.datum);
                liZeit.appendChild(liZeitText);
              ulTodoFooter.appendChild(liZeit);
                var liBeschreibung = document.createElement("LI");
                var liBeschreibungText = document.createTextNode(todo.beschreibung);
                liBeschreibung.appendChild(liBeschreibungText);
              ulTodoFooter.appendChild(liBeschreibung);
            divTodoBox.appendChild(ulTodoHeader);
            divTodoBox.appendChild(ulTodoFooter);
            liste.appendChild(divTodoBox);
        });
        // add buttons
        var headerElements = document.getElementsByClassName("todoheader");
        for (var i = 0; i < headerElements.length; i++) {
          let index = i;
          // delete button
          var löschButton = document.createElement("SPAN");
          var löschText = document.createTextNode("\u00D7");
          löschButton.className = "close";
          löschButton.appendChild(löschText);
          löschButton.addEventListener("click", () => this._askDelete(0 + index));
          headerElements[i].appendChild(löschButton);
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

    _filtere(){
      let eingabe = this._filterBar.value.toUpperCase();
      let filterWerte = eingabe.split(/[ ,]+/); // Bei EIngabe von "Test blub" werden Einträge gesucht, die sowohl "Test" wie auch "blub" enthalten

      let elemente = document.getElementById("aufgabenliste").getElementsByClassName("todobox");
      let listenIndex, filterWerteIndex;

      for (listenIndex = 0; listenIndex < elemente.length; listenIndex++) {
        let elementText = elemente[listenIndex].innerText.toUpperCase();
        elemente[listenIndex].style.display = "";
        for (filterWerteIndex = 0; filterWerteIndex < filterWerte.length; filterWerteIndex++) {
          if (!elementText.includes(filterWerte[filterWerteIndex])){
            // Element wird rausgefiltert
            elemente[listenIndex].style.display = "none";
            break;
          }
        }
      }
    }

    _sortiere(){
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
      this._filtere();
    }
}
