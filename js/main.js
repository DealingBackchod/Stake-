let balance=0,uid;
firebase.auth().onAuthStateChanged(u=>{
  if(u){uid=u.uid;
    firebase.firestore().collection("users").doc(uid).get()
    .then(d=>{if(!d.exists)firebase.firestore().collection("users").doc(uid).set({balance:1000}),balance=1000;
       else balance=d.data().balance;
    update();});
  } else location="login.html";
});
function update(){document.getElementById("balance")?.innerText=balance;document.getElementById("wallet-balance")?.innerText=balance;}
function logout(){firebase.auth().signOut().then(_=>location="login.html");}
const grid=document.getElementById("grid");
if(grid)for(let i=0;i<25;i++){const t=document.createElement("div");t.className="tile";t.onclick=()=>{
    if(t.classList.contains("clicked"))return;
    if(Math.random()<0.2){t.classList.add("mine");alert("Boom")}
    else{t.classList.add("clicked");balance+=10;firebase.firestore().collection("users").doc(uid).update({balance});update();}
  };grid.appendChild(t);}
