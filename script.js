function validateForm() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;

    if (name == "") {
        alert("Name is required")
        return false;
    }
    if (age == "") {
        alert("Age is required")
        return false;
    } else if (age <= 0) {
        alert("Age must not be zero or less than zero ")
        return false;
    }
    if (address == "") {
        alert("Address is required")
        return false;
    }
    if (email == "") {
        alert("Email is required")
        return false;
    } else if (!email.includes("@")) {
        alert("Invalid email address")
        return false;
    }
    return true;
}

// fonction pour afficher les données du localstorage
function showData() {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        // Si la condition est vraie (cela signifie que la clé "peopleList" n'existe pas dans le localStorage ou est vide)
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    let html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + "<p>" + element.email + "</p>" + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger btn-sm m-1">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning btn-sm m-1">Edit</button> </td>';
        html += "</tr>";
    });
    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Chargement de toutes les données du localstorage quand le document ou la page se recharge.
document.onload = showData();

// fonction pour ajouter les données au  localstorage
function AddData() {
    // si le formulaire est validé
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let address = document.getElementById("address").value;
        let email = document.getElementById("email").value;

        let peopleList;
        if (localStorage.getItem("peopleList") == null) {
            // Si la condition est vraie (cela signifie que la clé "peopleList" n'existe pas dans le localStorage ou est vide)
            peopleList = [];
        }
        else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }
        peopleList.push({
            name: name,
            age: age,
            address: address,
            email: email
        });
        // je mets à jour le LS avec les new data ajoutées
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
    }
}

// fonction pour supprimer une donnée du localstorage
function deleteData(index) {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        // Si la condition est vraie (cela signifie que la clé "peopleList" n'existe pas dans le localStorage ou est vide)
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// fonction pour modifier une donnée du localstorage
function updateData(index) {
    // lors du click sur le bouton edit des actions , le bouton add Data
    //  sera cacher et le bouton update sera afficher à sa place
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
        // Si la condition est vraie (cela signifie que la clé "peopleList" n'existe pas dans le localStorage ou est vide)
        peopleList = [];
    }
    else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("address").value = peopleList[index].address;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].address = document.getElementById("address").value;
            peopleList[index].email = document.getElementById("email").value;
        }
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
        // j'affiche à nouveau  le bouton add Data après la modification terminée
        //  et je cache le bouton update.
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
    }
}