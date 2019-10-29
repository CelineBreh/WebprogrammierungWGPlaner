class Einkaufsliste {
  constructor(app) {
      this._app = app;
      this._mainElement = document.getElementById("vorlage-einkaufsliste");
  }
var counter=0;
function onClick(){
  var nameL= document.getElementById("nameL");
console.log(nameL.value);
add(nameL.value);
}

function add(name){
  counter++;
  var list=document.getElementById("list");
  var checkbox= document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("class", "checkbox");
  checkbox.setAttribute("id", "cb"+ counter);
list.appendChild(checkbox);

 var label= document.createElement("label");
 label.innerHTML =nameL.value;
 label.setAttribute("class", "label");
 label.setAttribute("for", "cb"+ counter);
  list.appendChild(label);
  list.appendChild(document.createElement("br"));

  var time = document.createElement("time");
  var now = new Date();
  time.textContent =  now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();

  list.appendChild(time);

  addRemoveBtn(label,checkbox,time);

  addCrossStyle(label,checkbox);

  list.appendChild(document.createElement("br"));
}

function addRemoveBtn(li, ch, ti)
{
//creating a remove button
var removeTask = document.createElement("input");
removeTask.setAttribute("type", "button");
removeTask.setAttribute("value", "Remove");
removeTask.setAttribute("class", "remove");

//remove task function
removeTask.addEventListener("click", function (){
li.parentNode.removeChild(li);
    ch.parentNode.removeChild(ch);
    ti.parentNode.removeChild(ti);

}, false);
li.appendChild(removeTask);
}

function addCrossStyle(li,ch)
{
var check = false;


    ch.addEventListener("click", function (){
      if (check==false)
      {
          li.style.textDecoration = "line-through";
          li.style.textDecorationColor = "black";
          check = true;
      }
      else
{
li.style.textDecoration = "none";
che = false;
}

    }, false);
}
}
