// 1700028 Passrama (C) Juha Penttinen

var elements = ["home", "work", "fun"];  //list of menu items
var currentCategory = "home";
//var passwords = [{ category: "home", item: "sample", name: "name", pass: "pass" }];
var passwords = new Array;


var app = {



    saveData: function () { //save my data

        console.log("saving");
        var myJSON = JSON.stringify(passwords); 
        localStorage.setItem('myData', myJSON);

      //  console.log(myJSON);

    },
    loadData: function () {  //load my data, before you ask, yes I know OS can wipe localstorage if it needs more space, needs better solution but I'm tired atm.

    

        var myJSON = localStorage.getItem('myData');

        //console.log(myJSON);

          passwords = JSON.parse(myJSON);

    }
   
}

function addNew() //adds the visual part of new entry.
{
    var newService = document.getElementById('nservice').value; //get field names from form.
    var newName = document.getElementById('nname').value;
    var newPass = document.getElementById('npass').value;
    if (newService == "" || newName == "" || newPass == "") { //show error if fields are blank
        showAlert();
    }
    else {
        addEntry(currentCategory, newService, newName, newPass);
        menuToggle(currentCategory);

        document.getElementById('nservice').value = "";
        document.getElementById('nname').value = "";
        document.getElementById('npass').value = "";
        app.saveData();
    }

}
function addEntry(category, item, name, pass) //add new entry
{
    var i;
    var openArray;

    var password = {  //password object
        category: category,
        item: item,
        name: name,
        pass: pass
    };

    passwords.push(password); //push new password

}


function menuToggle(elem) { // hide whatever is not selected, show what is.
    var i;
    for (i = 0; i < elements.length; i++) {  //page toggle.
        if (elements[i] == elem) {
            generateTable(elements[i]);
            showElement(elements[i]);
            currentCategory = elem;
        } else {
            hideElement(elements[i]);
        }
    }
}
function checkNew() { // check if new menu is open
    var x = document.getElementById("new");
    if (x.style.display === "none") {
        return false;
    } else {
        return true;
    }
}
function toggleNew() { // hide whatever is not selected, show what is.
    var x = document.getElementById("new"); 
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    menuToggle(currentCategory);
}

function hideElement(elem) { //hide element
    var x = document.getElementById(elem);
    x.style.display = "none";
}

function showElement(elem) { //show element
    var x = document.getElementById(elem);
    x.style.display = "block";
}

function deleteEntry(passIndex, elem) {  //delete entry

    passwords.splice(passIndex, 1);
    app.saveData();
    menuToggle(elem);
}

function alertDismissed() {
    // do something
}

// Show a custom alertDismissed
//
function showAlert() {
    navigator.notification.alert(
        'You need to fill all the fields before saving',  // message
        alertDismissed,         // callback
        'ERROR',            // title
        'Understood'                  // buttonName
    );
}

function generateTable(elem) { //generate table
    var newElem = elem + "content";
    var body = document.getElementById(newElem);
    var tbl = document.createElement('table');
    body.innerHTML = ""; //clear old table
    var tr = document.createElement("TR");
    var thitem = document.createElement("TH");
    var thname = document.createElement("TH");
    var thpass = document.createElement("TH");
    var thnitem = document.createTextNode("Name");
    var thnname = document.createTextNode("Username");
    var thnpass = document.createTextNode("Pass");

    thitem.appendChild(thnitem);
    thname.appendChild(thnname);
    thpass.appendChild(thnpass);
    tr.appendChild(thitem);
    tr.appendChild(thname);
    tr.appendChild(thpass);
    tbl.appendChild(tr);

    for (var i = 0; i < passwords.length; i++) {  //create table here based on data
        if (passwords[i].category == elem) {

            var tr = document.createElement("TR");
            var tdname = document.createElement("TD");
            var tdpass = document.createElement("TD");
            var tditem = document.createElement("TD");
            var tddelete = document.createElement("TD");
            tddelete.style.width = "80px";

            var tnitem = document.createTextNode(passwords[i].item);
            var tnname = document.createTextNode(passwords[i].name);
            var tnpass = document.createTextNode(passwords[i].pass);
            var tndelete = document.createElement("BUTTON");

            const myIndex = i; // required, without this step it messes up.
            tndelete.addEventListener("click", function () {
                deleteEntry(myIndex, elem);
            });
            var btntn = document.createTextNode("X");
            tndelete.appendChild(btntn);
            tditem.appendChild(tnitem);
            tdname.appendChild(tnname);
            tdpass.appendChild(tnpass);
            tddelete.appendChild(tndelete);

            tr.appendChild(tditem);
            tr.appendChild(tdname);
            tr.appendChild(tdpass);
            //   console.log(checkNew());
            if (checkNew()) tr.appendChild(tddelete);
            tbl.appendChild(tr);
        }
    }
    body.appendChild(tbl);
}





function Passrama() {

app.loadData(); //better not load that data before cordova is done initializing...

menuToggle("home");


}


