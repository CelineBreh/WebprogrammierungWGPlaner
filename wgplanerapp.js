class WGPlanerApp {
    /**
     * Konstruktor.
     * @param {Liste} pages Seiten, zwischen denen umgeschaltet werden kann
     */
    constructor(pages) {
        this._pages = pages;
        this._currentPageObject = null;

        let browserCache = localStorage['wgplaner-daten'];
        this._data = JSON.parse(browserCache);

        if (this._data && this._data.length) {
          // Erfolgreiches Laden der Daten des Browsers
        }
        else {
          // Laden nicht erfolgreich, deshalb wird eine Beispielsaufgabe erstellt
          this._data = [
             {
                 aufgabe: "Küche putzen",
                 beschreibung: "Bitte Geschirrspülmaschine einräumen und Kühlschrank ausräumen",
                 zustaendig: "Selina",
                 dringlichkeit: "1",
                 datum: "24.12.2019"
             }
           ];
        }

        // Interne Methode zum Rendern des Menüs aufrufen
        this._renderMenu();
    }

    /**
     * Tablaschen zum Umschalten der aktuellen Seite anzeigen. (Interne Methode)
     */
    _renderMenu() {
      let ul = document.querySelector("#wgplanerapp-header > ul");
      let template = document.getElementById("vorlage-wgplanerapp-menu-li").innerHTML;

      this._pages.forEach(page => {
          // Versteckte Seiten überspringen
          if (page.hidden) return;

          // Neues Element auf Basis des Templates erzeugen
          let dummy = document.createElement("ul");
          dummy.innerHTML = template;
          dummy.innerHTML = dummy.innerHTML.replace("$NAME$", page.name);
          dummy.innerHTML = dummy.innerHTML.replace("$LABEL$", page.label);

          // Event Listener auf das <li>-Element registrieren
          let li = dummy.firstElementChild;
          li.addEventListener("click", () => this.showPage(page.name));

          // Element nun in das Menü umhängen
          dummy.removeChild(li);
          ul.appendChild(li);
      });
    }

    /**
     * Umschalten der sichtbaren Seite.
     *
     * @param  {String} name Name der anzuzeigenden Seite, gemäß this.pages
     * @param  {Integer} editIndex Nummer des bearbeiteten Datensatzes (optional)
     */
    showPage(name, editIndex) {
        // Gewünschte Seite suchen
        let newPage = this._pages.find(p => p.name === name);

        if (newPage === undefined) {
            console.error(`Klasse App, Methode showPage(): Ungültige Seite „${name}”`);
            return;
        }

        // Aktuelle Seite ausblenden
        if (this._currentPageObject != null) {
            this._currentPageObject.hide();
        }

        // Neue Seite anzeigen und merken
        this._currentPageObject = new newPage.klass(this, name, editIndex);
        this._currentPageObject.show();

        // Aktuelle Seite im Kopfbereich hervorheben
        document.querySelectorAll("#wgplanerapp-header li").forEach(li => li.classList.remove("active"));
        document.querySelectorAll(`#wgplanerapp-header li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));
    }


    /**
     * Gibt die komplette Liste mit allen Daten zurück.
     * @return {Array} Array mit allen Datenobjekten
     */
    getData() {
        return this._data;
    }

    /**
     * Gibt den Datensatz mit dem übergebenen Index zurück. Kann der Datensatz
     * nicht gefunden werden, wird undefined zurückgegeben.
     *
     * @param  {Integer} index Index des gewünschten Datensatzes
     * @return {Object} Gewünschter Datensatz oder undefined
     */
    getDataByIndex(index) {
        return this._data[index];
    }

    /**
     * Aktualisiert den Datensatz mit dem übergebenen Index und überschreibt
     * ihn mit dem ebenfalls übergebenen Objekt. Der Datensatz muss hierfür
     * bereits vorhanden sein.
     *
     * @param {Integer} index Index des zu aktualisierenden Datensatzes
     * @param {Object} dataset Neue Daten des Datensatzes
     */
    updateDataByIndex(index, dataset) {
        this._data[index] = dataset;
        localStorage['wgplaner-daten'] = JSON.stringify(this._data);
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} index Index des zu löschenden Datensatzes
     */
    deleteDataByIndex(index) {
        this._data.splice(index, 1);
        localStorage['wgplaner-daten'] = JSON.stringify(this._data);
    }

    /**
     * Fügt einen neuen Datensatz am Ende der Liste hinzu.
     *
     * @param  {Object} dataset Neu anzuhängender Datensatz
     * @return {Integer} Index des neuen Datensatzes
     */
    appendData(dataset) {
        this._data.push(dataset);
        localStorage['wgplaner-daten'] = JSON.stringify(this._data);
        return this._data.length - 1;
    }
}
