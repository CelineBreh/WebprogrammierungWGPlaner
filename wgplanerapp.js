"use strict"

class WGPlanerApp {
    constructor(pages, router) {
      this._pages = pages;
      this._currentPageObject = null;
      this.router = router;
  		// firebase
      let config = {
        apiKey: "AIzaSyCa4KCqrAgIY6lsD3OMVFaI1ExE7VsOzHQ",
    		authDomain: "webprogrammierungwgplaner.firebaseapp.com",
    		databaseURL: "https://webprogrammierungwgplaner.firebaseio.com",
    		projectId: "webprogrammierungwgplaner",
    		storageBucket: "webprogrammierungwgplaner.appspot.com",
    		messagingSenderId: "267987225836",
    		appId: "1:267987225836:web:1f4c002e59aa8acc0829c9",
    		measurementId: "G-DV9E5J3ZFS"
      };

      firebase.initializeApp(config);
      this.database = firebase.database();

      let app = this;
      let ref = this.database.ref('aufgaben/');
      ref.on("value", function(snapshot) {
        app.aufgaben = snapshot.val();
        // Jetzt wo die Daten geladen sind, kann geroutet werden
        router.resolve();
      }, function (error) {
         console.log("Error: " + error.code);
      });
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

        if (name === "aufgaben-liste"){
          this.router.navigate('/aufgaben');
        }
        else if (name === "aufgabe-anlegen"){
          this.router.navigate('/aufgabe/' + editIndex);
        }
        else if (name === "aufgabe-bearbeiten"){
          this.router.navigate('/aufgabe/' + editIndex);
        }
        else if (name === "einkaufsliste"){
          this.router.navigate('/einkaufsliste');
        } else{
          alert("error");
        }

        // Aktuelle Seite im Kopfbereich hervorheben
        document.querySelectorAll("#wgplanerapp-header li").forEach(li => li.classList.remove("active"));
        document.querySelectorAll(`#wgplanerapp-header li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));
    }


    /**
     * Gibt die komplette Liste mit allen Daten zurück.
     * @return {Array} Array mit allen Datenobjekten
     */
    getData() {
        return this.aufgaben;
    }

    /**
     * Gibt den Datensatz mit dem übergebenen Index zurück. Kann der Datensatz
     * nicht gefunden werden, wird undefined zurückgegeben.
     *
     * @param  {Integer} index Index des gewünschten Datensatzes
     * @return {Object} Gewünschter Datensatz oder undefined
     */
    getDataByIndex(index) {
        return this.aufgaben[index];
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
        this.aufgaben[index] = dataset;
        this.persistData();
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} index Index des zu löschenden Datensatzes
     */
    deleteDataByIndex(index) {
        this.aufgaben.splice(index, 1);
        this.persistData();
    }

    /**
     * Fügt einen neuen Datensatz am Ende der Liste hinzu.
     *
     * @param  {Object} dataset Neu anzuhängender Datensatz
     * @return {Integer} Index des neuen Datensatzes
     */
    appendData(dataset) {
        this.aufgaben.push(dataset);
        this.persistData();
        return this.aufgaben.length - 1;
    }

    _vergleichGröße(a, b) {
      if(a > b) return -1;
      if(a < b) return 1;
      return 0;
    }

    /**
     * Sortiert die Daten anhand des übergebenen Sortierkriteriums
     *
     * @param  {int} kriterium 0 -> dringlichkeit absteigend
     *                         1 -> dringlichkeit aufsteigend
     *                         2 -> datum absteigend
     *                         3 -> datum aufsteigend
     */
     sortData(kriterium){
       let this2 = this; // this ist nicht bekannt innerhalb von sort, darin muss aber auf this zugegriffen werden
       this.aufgaben.sort( function(a, b) {
        let vergleich;
        if (kriterium == 0 || kriterium == 1) {
          vergleich = this2._vergleichGröße(a.dringlichkeit, b.dringlichkeit);
        }
        else if(kriterium == 2 || kriterium == 3) {
          vergleich = this2._vergleichGröße(a.datum, b.datum);
        }
        if (kriterium % 2 == 0){
          return vergleich;
        } else {
          return -1 * vergleich;
        }
      });
     }

     persistData(){
       this.database.ref('aufgaben').set(this.aufgaben);
     }
}
