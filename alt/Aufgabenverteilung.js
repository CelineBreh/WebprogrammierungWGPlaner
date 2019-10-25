
class Aufgabenverteilung{
  constructor(pages) {
      this._pages = pages;
      this._currentPageObject = null;
        this._renderMenu();
    }
    _renderMenu() {
        let ul = document.querySelector("#Navigationsbar > ul");
        let template = document.getElementById("template-app-menu-li").innerHTML;

        this._pages.forEach(page => {
            // Versteckte Seiten überspringen
            if (page.hidden) return;
const a = '[{"titel": "Gassi gehen","beschreibung": "Hund ausführen","person": "Selina","datum": "20.10.2019","uhrzeit": "8:00","prio": "wichtig"},{"titel": "Geschirr machen","beschreibung": "Ein- und ausräumen","person": "Marcel","datum": "20.10.2019","prio": "unwichtig"}]'

function ladeAufgaben() {
  	var aufgabenArray = JSON.parse(a);

    aufgabenArray.forEach(function(element) {
      var divTodoBox = document.createElement("DIV");
      divTodoBox.className = "todobox";
        var ulTodoHeader = document.createElement("UL");
        ulTodoHeader.className = "todoheader";
          var liPerson = document.createElement("LI");
          var liPersonText = document.createTextNode(element.person+ ":");
          liPerson.appendChild(liPersonText);
        ulTodoHeader.appendChild(liPerson);
          var liTitle = document.createElement("LI");
          var liTitleText = document.createTextNode(element.titel);
          liTitle.appendChild(liTitleText);
        ulTodoHeader.appendChild(liTitle);
        var ulTodoFooter = document.createElement("UL");
        ulTodoFooter.className = "todofooter";
          var liZeit = document.createElement("LI");
          var liZeitText = document.createTextNode(element.datum + ", " + element.uhrzeit);
          liZeit.appendChild(liZeitText);
        ulTodoFooter.appendChild(liZeit);
          var liBeschreibung = document.createElement("LI");
          var liBeschreibungText = document.createTextNode(element.beschreibung);
          liBeschreibung.appendChild(liBeschreibungText);
        ulTodoFooter.appendChild(liBeschreibung);
      divTodoBox.appendChild(ulTodoHeader);
      divTodoBox.appendChild(ulTodoFooter);
      document.getElementById("aufgabenliste").appendChild(divTodoBox);
    });

    var headerElements = document.getElementsByClassName("todoheader");
    for (var i = 0; i < headerElements.length; i++) {
      var span = document.createElement("SPAN");
      var txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      headerElements[i].appendChild(span);
    }
}

}

/*<div class="todobox">
  <ul class="todoheader">
      <li>Selina:</li>
      <li>Gassi gehen</li>
  </ul>
  <ul class="todofooter">
    <li>20.10.2019, 8:00</li>
    <li>Hund ausführen</li>
  </ul>
</div>*/
