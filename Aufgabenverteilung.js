
const a = '{"todos": [{"titel": "a","beschreibung": "d","person": "f","datum": "","prio": ""},{"titel": "b","beschreibung": "d","person": "f","datum": "","prio": ""}],"boolean": true}'

function ladeAufgaben() {
  	var gespeicherteDaten = JSON.parse(a);
    var aufgabenArray = gespeicherteDaten.todos;

    aufgabenArray.forEach(function(element) {
      var li = document.createElement("li");
      var t = document.createTextNode(element.titel);
      li.appendChild(t);
      document.getElementById("aufgabenliste").appendChild(li);
    });
}
