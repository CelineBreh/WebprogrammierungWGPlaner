"use strict";
/**
 * Klasse Einkaufsliste: Stellt eine bearbeitbare Einkaufsliste dar
 */

let counter = 0;

class Einkaufsliste {
  constructor(app, pageName, editIndex) {
    this._app = app;
    this._editIndex = editIndex;
    this._mainElement = document.getElementById("vorlage-einkaufsliste");
  }

  show() {
    this._renderList();
    this._mainElement.classList.remove("hidden");
  }

  hide() {
      this._mainElement.classList.add("hidden");
  }

  _renderList() {
    // todo wie in anderen js dateien html erzeugen und einfügen
    document.getElementById("addBtn").addEventListener('click', () => {
      add();
    });
    window.addEventListener("keypress", (event) => {
      console.log(event.key + " pressed");
      if(event.key == 'Enter')
      {
        event.preventDefault();
        add();
      }
    });
  }
}

let add = () => {
  counter++;
  var list = document.getElementById("list");
  var checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("id", "cb" + counter);


  var label = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  label.appendChild(t);
  label.setAttribute("class", "label");
  label.setAttribute("for", "cb" + counter);

  if (inputValue === '') {
   alert("Du musst ein Lebensmitel hinzufügen!");
 } else {
   label.appendChild(checkbox);
   document.getElementById("list").appendChild(label);

     var br= document.createElement("br");
     document.getElementById("list").appendChild(br);
     addRemoveBtn(label, checkbox,br);
       addCrossStyle(label, checkbox);
     myInput.value="";
 }

}

let addRemoveBtn=(li, ch, br)=>  {

  var removeTask = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  removeTask.className = "remove";
  removeTask.appendChild(txt);

  //remove task function
  removeTask.addEventListener("click", function () {
    li.parentNode.removeChild(li);
    ch.parentNode.removeChild(ch);
    br.parentNode.removeChild(br);

  }, false);
  li.appendChild(removeTask);

}
let addCrossStyle =(li, ch)=>  {
  var check = false;

  ch.addEventListener("click", function () {
    if (check == false) {
      li.style.textDecoration = "line-through  #fff";
      li.style.color="#fff";
      li.style.background=" #888";
      check = true;
    }
    else {
      li.style.textDecoration = "none";
      li.style.color="none";
      li.style.background="none";
      ch = false;
    }
  },
  false);
}
