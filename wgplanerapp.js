"use strict"

class WGPlanerApp {
    constructor(pages, router) {
      this._pages = pages;
      this._currentPageObject = null;
      this.router = router;

  		// firebase configuration file
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
      // get firebase database instance
      firebase.initializeApp(config);
      this.database = firebase.database();

      let app = this; // "this" needs to be accessed inside ref.on
      let ref = this.database.ref('aufgaben/');
      ref.on("value", function(snapshot) {
        app.todos = snapshot.val();
        // As the todos are now loaded, resolving the route is now possible
        router.resolve();
      }, function (error) {
         // Firebase data could not be loaded
         app.todos = [];
         console.log("Error: " + error.code);
         router.resolve();
      });
      this.renderMenu();
    }

    // Render the menu / navigation panel
    renderMenu() {
      let ul = document.querySelector("#wgplanerapp-header > ul");
      let template = document.getElementById("vorlage-wgplanerapp-menu-li").innerHTML;

      this._pages.forEach(page => {
          // Skip hidden pages
          if (page.hidden) return;

          let dummy = document.createElement("ul");
          dummy.innerHTML = template;
          dummy.innerHTML = dummy.innerHTML.replace("$NAME$", page.name);
          dummy.innerHTML = dummy.innerHTML.replace("$LABEL$", page.label);

          let li = dummy.firstElementChild;
          li.addEventListener("click", () => this.showPage(page.name));

          dummy.removeChild(li);
          ul.appendChild(li);
      });
    }

    /**
     * Switch the visible page
     *
     * @param  {String} name name of the visible pages according to this.pages
     * @param  {Integer} editIndex index of the element to edit
     */
    showPage(name, editIndex) {
        // Find matching page
        let newPage = this._pages.find(p => p.name === name);

        if (newPage === undefined) {
            console.error(`No page with „${name}” exists`);
            return;
        }

        // Hide current page
        if (this._currentPageObject != null) {
            this._currentPageObject.hide();
        }

        // Show new page
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
        }

        // Highlight the current shown page inside the menu/ navigation panel
        document.querySelectorAll("#wgplanerapp-header li").forEach(li => li.classList.remove("active"));
        document.querySelectorAll(`#wgplanerapp-header li[data-page-name="${name}"]`).forEach(li => li.classList.add("active"));
    }


    /**
     * Returns an array of all todos.
     * @return {Array} array of all todos
     */
    getTodos() {
        return this.todos;
    }

    /**
     * Returns the todo with the matching index
     *
     * @param  {Integer} index index of the requested todo
     * @return {Object} the requested todo or undefined if index in not valid (e.g. negative)
     */
    getTodoByIndex(index) {
        return this.todos[index];
    }

    /**
     * Updates
     *
     * @param {Integer} index Index des zu aktualisierenden Datensatzes
     * @param {Object} dataset Neue Daten des Datensatzes
     */
    updateDataByIndex(index, dataset) {
        this.todos[index] = dataset;
        this.persistData();
    }

    /**
     * Löscht den Datensatz mit dem übergebenen Index. Alle anderen Datensätze
     * rücken dadurch eins vor.
     *
     * @param {[type]} index Index des zu löschenden Datensatzes
     */
    deleteDataByIndex(index) {
        this.todos.splice(index, 1);
        this.persistData();
    }

    /**
     * Fügt einen neuen Datensatz am Ende der Liste hinzu.
     *
     * @param  {Object} dataset Neu anzuhängender Datensatz
     * @return {Integer} Index des neuen Datensatzes
     */
    appendData(dataset) {
        this.todos.push(dataset);
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
       this.todos.sort( function(a, b) {
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
       this.database.ref('todos').set(this.aufgaben);
              this.database.ref('aufgaben').set(this.aufgaben);
     }
}
