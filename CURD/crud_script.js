var selectedRow = null

function onFormSubmit()
{
    if(validate())
    {
  var formData = readFormData();
  if(selectedRow == null)
  {
  insertNewRecord(formData);
  }
  else {
  updateRecord(formData);
  resetForm();
  }
 }
}

function readFormData()
{
    var formData = {};
    formData["fullname"] = document.getElementById("fullname").value;
    formData["age"] = document.getElementById("age").value;
    formData["gender"] = document.querySelector('input[name="gender"]:checked').value;
    formData["drop_list"] = document.getElementById("drop_list").value;
    return formData;
}

function insertNewRecord(data)
{
    var table = document.getElementById("studentlist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.age;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.drop_list;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button id="btn1" onClick="onEdit(this)">Edit</button>
                       <button id="btn2" onClick="onDelete(this)">Delete</button>`;
}

function resetForm()
{
    document.getElementById("fullname").value="";
    document.getElementById("age").value="";
    var element=document.getElementsByClassName("gender");
    for(var i=0;i<element.length;i++)
    {
        element[i].checked=false;
    }
    document.getElementById("drop_list").value="";
    selectedRow=null;
}

function onEdit(td)
{
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullname").value= selectedRow.cells[0].innerHTML;
    document.getElementById("age").value= selectedRow.cells[1].innerHTML;
    var gender=selectedRow.cells[2].innerHTML;
    if(gender=="Male"){
        document.getElementById("male").checked=true;
    }
    else {
        document.getElementById("female").checked=true;
    }

    document.getElementById("drop_list").value= selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) 
{
    selectedRow.cells[0].innerHTML=formData.fullname;
    selectedRow.cells[1].innerHTML=formData.age;
    selectedRow.cells[2].innerHTML=formData.gender;
    selectedRow.cells[3].innerHTML=formData.drop_list;
}

function onDelete(td)
{
    row = td.parentElement.parentElement;
    document.getElementById("studentlist").deleteRow(row.rowIndex);
    resetForm();
}

function validate()
{
   if(document.getElementById("fullname").value=="")
   {
       alert("please enter your name");
       return false;
   }
   var age = document.getElementById("age").value;
   if(age < 12 || age >30 || age==null)
   {
       alert("please enter valid age");
       return false;
   }

   var select_gender= document.querySelector('input[name="gender"]:checked');
   if(select_gender==null)
   {
       alert("please select gender");
       return false;
   }
   
   var select_hobby = document.getElementById("drop_list");
   var e = select_hobby.options[select_hobby.selectedIndex].value;
   if(e =="select")
   {
       alert("please select hobby");
       return false;
   }
   return true;

}
