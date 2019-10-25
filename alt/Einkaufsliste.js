

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
  checkbox.setAttribute("id", "cb"+ counter);

 var label= document.createElement("label");
 label.innerHTML =nameL.value;
 label.setAttribute("for", "cb"+ counter);



  list.appendChild(checkbox);
  list.appendChild(label);
  list.appendChild(document.createElement("br"));



}
