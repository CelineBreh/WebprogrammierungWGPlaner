"use strict";

/**
 * Klasse AufgabenListe: Listet alle Aufgaben auf
 */
class AufgabenListe {

    constructor(app) {
        this._app = app;
        this._mainElement = document.getElementById("vorlage-aufgaben-liste");
    }

    show() {
        this._renderList();
        this._mainElement.classList.remove("hidden");
    }

    hide() {
        this._mainElement.classList.add("hidden");
    }

    _renderList() {
        // Alte Einträge verwerfen
        let liste = document.querySelector("#vorlage-aufgaben-liste > ul");
        liste.innerHTML = "";

        let data = this._app.getData();
        if (data.length < 1) {
            let template = document.getElementById("vorlage-aufgaben-liste-leer").innerHTML;
            liste.innerHTML = template;
            return;
        }

        data.forEach(dataset => {
            var divTodoBox = document.createElement("LI");
            divTodoBox.className = "todobox";
              var ulTodoHeader = document.createElement("UL");
              if (dataset.dringlichkeit == "1"){
                ulTodoHeader.style="background-color: #FF2035"
              } else if (dataset.dringlichkeit == "2"){
                ulTodoHeader.style="background-color: #FF8B07"
              } else if (dataset.dringlichkeit == "3"){
                ulTodoHeader.style="background-color: #3BBF4C"
              } else{
                // nicht einfärben
              }
              ulTodoHeader.className = "todoheader";
                var liPerson = document.createElement("LI");
                var liPersonText = document.createTextNode(dataset.zustaendig+ ":");
                liPerson.appendChild(liPersonText);
              ulTodoHeader.appendChild(liPerson);
                var liTitle = document.createElement("LI");
                var liTitleText = document.createTextNode(dataset.aufgabe);
                liTitle.appendChild(liTitleText);
              ulTodoHeader.appendChild(liTitle);
              var ulTodoFooter = document.createElement("UL");
              ulTodoFooter.className = "todofooter";
                var liZeit = document.createElement("LI");
                var liZeitText = document.createTextNode(dataset.datum);
                liZeit.appendChild(liZeitText);
              ulTodoFooter.appendChild(liZeit);
                var liBeschreibung = document.createElement("LI");
                var liBeschreibungText = document.createTextNode(dataset.beschreibung);
                liBeschreibung.appendChild(liBeschreibungText);
              ulTodoFooter.appendChild(liBeschreibung);
            divTodoBox.appendChild(ulTodoHeader);
            divTodoBox.appendChild(ulTodoFooter);
            liste.appendChild(divTodoBox);
        });
        // Buttons hinzufügen
        var headerElements = document.getElementsByClassName("todoheader");
        for (var i = 0; i < headerElements.length; i++) {
          let index = i;
          // Lösch button
          var löschButton = document.createElement("SPAN");
          var löschText = document.createTextNode("\u00D7");
          löschButton.className = "close";
          löschButton.appendChild(löschText);
          löschButton.addEventListener("click", () => this._askDelete(0 + index));
          headerElements[i].appendChild(löschButton);
          // Update button
          var updateButton = document.createElement("SPAN");
          var updateText = document.createTextNode("\u270E");
          updateButton.className = "close";
          updateButton.appendChild(updateText);
          updateButton.addEventListener("click", () => this._askUpdate(0 + index));
          headerElements[i].appendChild(updateButton);
        }
    }

    _askDelete(index) {
        // Nochmals nachfragen
        let answer = confirm("Soll die ausgewählte Aufgabe wirklich gelöscht werden?");
        if (!answer) return;

        // Datensatz löschen
        this._app.deleteDataByIndex(index);

        // Liste neu ausgeben
        this._renderList();
    }

    _askUpdate(index) {
      // Nochmals nachfragen
      let answer = confirm("Soll die ausgewählte Aufgabe wirklich bearbeitet werden?");
      if (!answer) return;

      // Datensatz bearbeiten
      this._app.showPage("aufgabe-bearbeiten", index)

      // Liste neu ausgeben
      this._renderList();
    }
}
