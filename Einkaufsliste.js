"use strict";
/**
 * Klasse Einkaufsliste: Stellt eine bearbeitbare Einkaufsliste dar
 */
class Einkaufsliste {
  constructor(app, pageName, editIndex) {
    this._app = app;
    this._editIndex = editIndex;
    this._mainElement = document.getElementById("vorlage-einkaufsliste");
  }

  onClick() {
    var nameL = document.getElementById("nameL");
    console.log(nameL.value);
    add(nameL.value);
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
  }

  add(name) {
    counter++;
    var list = document.getElementById("list");
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox");
    checkbox.setAttribute("id", "cb" + counter);
    list.appendChild(checkbox);

    var label = document.createElement("label");
    label.innerHTML = nameL.value;
    label.setAttribute("class", "label");
    label.setAttribute("for", "cb" + counter);
    list.appendChild(label);
    list.appendChild(document.createElement("br"));

    var time = document.createElement("time");
    var now = new Date();
    time.textContent = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

    list.appendChild(time);

    addRemoveBtn(label, checkbox, time);

    addCrossStyle(label, checkbox);

    list.appendChild(document.createElement("br"));
  }

  addRemoveBtn(li, ch, ti) {
    //creating a remove button
    var removeTask = document.createElement("input");
    removeTask.setAttribute("type", "button");
    removeTask.setAttribute("value", "Remove");
    removeTask.setAttribute("class", "remove");

    //remove task function
    removeTask.addEventListener("click", function () {
      li.parentNode.removeChild(li);
      ch.parentNode.removeChild(ch);
      ti.parentNode.removeChild(ti);

    }, false);
    li.appendChild(removeTask);
  }

  addCrossStyle(li, ch) {
    var check = false;
    ch.addEventListener("click", function () {
      if (check == false) {
        li.display = "";
      }
      else {
        li.display = "none";
        che = false;
      }
    }, false);
  }

  counter = 0;
}
