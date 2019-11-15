"use strict";

/**
 * Klasse AufgabeAnlegen: Stellt die Seite mit dem Eingabeformular zur Verfügung.
 *
 * Diese Klasse wird von der App-Klasse zu bestimmten Zeitpunkten instantiiert
 * und aufgerufen, um die Liste mit den Adressen darzustellen.
 */
class AufgabeAnlegen {
    /**
     * Konstruktor.
     *
     * @param {App} app Instanz der App-Klasse
     * @param {String} pageName Name der aufgerufenen Seite
     * @param  {Integer} editIndex Nummer des bearbeiteten Datensatzes
     */
     let _db = "";
    constructor(app, pageName, editIndex) {
        // Parameter merken
        this._app = app;
        _db = this._app._db;
        this._editIndex = editIndex;

        // Hauptelement mit dem Inhalt der Seite ermitteln
        this._mainElement = document.getElementById("main-aufgabe-bearbeiten");

        // Bearbeiteten Datensetz einlesen
        this._dataset = {
            aufgabe: "",
            beschreibung: "",
            zustaendig: "",
            dringlichkeit: "",
            datum: ""
        };

        if (this._editIndex > -1) {
            let dataset = this._app.getDataByIndex(this._editIndex);

            this._dataset.aufgabe = dataset.aufgabe;
            this._dataset.beschreibung = dataset.beschreibung;
            this._dataset.zustaendig = dataset.zustaendig;
            this._dataset.dringlichkeit = dataset.dringlichkeit;
            this._dataset.datum = dataset.datum;
        }
    }

    /**
     * Seite anzeigen. Wird von der App-Klasse aufgerufen.
     */
    show() {
        this._renderForm();
        this._mainElement.classList.remove("hidden");
    }

    /**
     * Seite nicht mehr anzeigen. Wird von der App-Klasse aufgerufen.
     */
    hide() {
        this._mainElement.classList.add("hidden");
    }

    /**
     * Formularfelder in die Seite einfügen. (Interne Methode)
     */
    _renderForm() {
        // Alten Inhalt verwerfen
        this._mainElement.innerHTML = "";

        // Formularfelder einfügen
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
     * Speichert den aktuell bearbeiteten Datensatz und kehr dann wieder
     * in die Listenübersicht zurück.
     */
    _saveAndExit() {
        // Eingegebene Werte überprüfen
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

        // Datensatz speichern
        this._dataset.aufgabe = aufgabe;
        this._dataset.beschreibung = beschreibung;
        this._dataset.zustaendig = zustaendig;
        this._dataset.dringlichkeit = dringlichkeit;
        this._dataset.datum = datum;

        if (this._editIndex > -1) {
            this._app.updateDataByIndex(this._editIndex, this._dataset);
        } else {
            this._app.appendData(this._dataset);
        }
        
        console.log(dataset);
        _db.addAufgabe(dataset).then(() => window.location.href = '/aufgaben-liste');
        // Zurück zur Übersicht
        this._app.showPage("aufgaben-liste");
    }
}
