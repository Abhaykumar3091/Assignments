let form = document.getElementById("feedbackForm");

let name = document.getElementById("name");
let email = document.getElementById("email");
let course = document.getElementById("course");
let feedback = document.getElementById("feedback");

let display = document.getElementById("display");
let sessionUser = document.getElementById("sessionUser");

let LOCAL_KEY = "feedback";
let SESSION_KEY = "user";

function validateName(){

    if(name.value.length < 3){
        document.getElementById("nameError").innerHTML="Enter minimum 3 characters";
        return false;
    }

    document.getElementById("nameError").innerHTML="";
    return true;

}

function validateEmail(){

    if(email.value==""){
        document.getElementById("emailError").innerHTML="Enter Email";
        return false;
    }

    if(email.value.indexOf("@")==-1 || email.value.indexOf(".")==-1){
        document.getElementById("emailError").innerHTML="Invalid Email";
        return false;
    }

    document.getElementById("emailError").innerHTML="";
    return true;

}

function validateCourse(){

    if(course.value==""){
        document.getElementById("courseError").innerHTML="Select Course";
        return false;
    }

    document.getElementById("courseError").innerHTML="";
    return true;

}

function validateFeedback(){

    if(feedback.value==""){
        document.getElementById("feedbackError").innerHTML="Enter Feedback";
        return false;
    }

    document.getElementById("feedbackError").innerHTML="";
    return true;

}

function showData(){

    let list = localStorage.getItem(LOCAL_KEY);

    if(list==null){
        display.innerHTML="No Feedback Stored";
        return;
    }

    list = JSON.parse(list);

    display.innerHTML="";

    for(let i=0;i<list.length;i++){

        let div = document.createElement("div");

        div.className="entry";

        div.innerHTML=
        "<b>Name :</b> "+list[i].name+"<br>"+
        "<b>Email :</b> "+list[i].email+"<br>"+
        "<b>Course :</b> "+list[i].course+"<br>"+
        "<b>Feedback :</b> "+list[i].feedback;

        display.appendChild(div);

    }

}

function showUser(){

    let user = sessionStorage.getItem(SESSION_KEY);

    if(user!=null){
        sessionUser.innerHTML="Current User : "+user;
    }
    else{
        sessionUser.innerHTML="";
    }

}

form.addEventListener("submit",function(e){

    e.preventDefault();

    if(!validateName()){
        return;
    }

    if(!validateEmail()){
        return;
    }

    if(!validateCourse()){
        return;
    }

    if(!validateFeedback()){
        return;
    }

    let student={

        name:name.value,
        email:email.value,
        course:course.value,
        feedback:feedback.value

    };

    let list = localStorage.getItem(LOCAL_KEY);

    if(list==null){

        list=[];

    }
    else{

        list=JSON.parse(list);

    }

    list.push(student);

    localStorage.setItem(LOCAL_KEY,JSON.stringify(list));

    sessionStorage.setItem(SESSION_KEY,name.value);

    form.reset();

    showData();

    showUser();

});

document.getElementById("deleteBtn").addEventListener("click",function(){

    localStorage.removeItem(LOCAL_KEY);

    sessionStorage.removeItem(SESSION_KEY);

    showData();

    showUser();

});

showData();

showUser();