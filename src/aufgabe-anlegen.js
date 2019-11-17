"use strict";

/**
 * class AufgabeAnlegen: provides the entry form for the task list
 *
 * This class is instantiated and called up from the wgplanerapp-class to
 * cetrtain times in order to show the task list
 *
 */
class AufgabeAnlegen {
    /**
     * Constructor
     *
     * @param {App} app Instance from the wgplanerapp-class
     * @param {String} pageName Name of the accessed page
     * @param  {Integer} editIndex Number of the edited dataset
     */

    constructor(app, pageName, editIndex) {
        // remember parameter
        this._app = app;
        this._editIndex = editIndex;

        // Determine the mainelement with the content of the site
        this._mainElement = document.getElementById("main-aufgabe-bearbeiten");

        // Read the edited dataset
        this._dataset = {
            aufgabe: "",
            beschreibung: "",
            zustaendig: "",
            dringlichkeit: "",
            datum: ""
        };

        if (this._editIndex > -1) {
            let dataset = this._app.getTodoByIndex(this._editIndex);

            this._dataset.aufgabe = dataset.aufgabe;
            this._dataset.beschreibung = dataset.beschreibung;
            this._dataset.zustaendig = dataset.zustaendig;
            this._dataset.dringlichkeit = dataset.dringlichkeit;
            this._dataset.datum = dataset.datum;
        }
    }

    /**
     * show page, is called up from the wgplanerapp-class
     */
    show() {
        this._renderForm();
        this._mainElement.classList.remove("hidden");
    }

    /**
     * do not show page anymore, is called up from the wgplanerapp-class
     */

    hide() {
        this._mainElement.classList.add("hidden");
    }

    /**
     * Insert entry form on the site (intern method)
     */
    _renderForm() {
        // Dismiss old content
        this._mainElement.innerHTML = "";

        // Insert input boxes
        let template = document.getElementById("vorlage-aufgabe-bearbeiten").innerHTML;
        this._mainElement.innerHTML = template;
        this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$AUFGABE$", this._dataset.aufgabe);
        this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$BESCHREIBUNG$", this._dataset.beschreibung);
        this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$ZUSTAENDIG$", this._dataset.zustaendig);
        this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$DRINGLICHKEIT$", this._dataset.dringlichkeit);
        this._mainElement.innerHTML = this._mainElement.innerHTML.replace("$DATUM$", this._dataset.datum);
        let saveButton = this._mainElement.querySelector(".action.save");
        saveButton.addEventListener("click", () => this._saveAndExit());
    }

    /**
     * Saves current edited dataset and returns to the task list
     */

    _saveAndExit() {
        // Check entered data
        let aufgabe = document.querySelector("#main-aufgabe-bearbeiten .aufgabe").value.trim();
        let beschreibung = document.querySelector("#main-aufgabe-bearbeiten .beschreibung").value.trim();
        let zustaendig = document.querySelector("#main-aufgabe-bearbeiten .zustaendig").value.trim();
        let dringlichkeit = document.querySelector("#main-aufgabe-bearbeiten .dringlichkeit").value.trim();
        let datum = document.querySelector("#main-aufgabe-bearbeiten .datum").value.trim();

        if (aufgabe === "") {
            alert("Geben Sie erst eine Aufgabe ein.");
            return;
        }

        if (datum === "") {
            alert("Geben Sie erst ein Datum ein.");
            return;
        }

        // Save dataset
        this._dataset.aufgabe = aufgabe;
        this._dataset.beschreibung = beschreibung;
        this._dataset.zustaendig = zustaendig;
        this._dataset.dringlichkeit = dringlichkeit;
        this._dataset.datum = datum;

        if (this._editIndex > -1) {
            this._app.updateTodoByIndex(this._editIndex, this._dataset);
        } else {
            this._app.appendTodo(this._dataset);
        }
        // return to task list
        this._app.showPage("aufgaben-liste");
    }
}
