// Toggle Open And Close

let btn = document.querySelector(".toggle")
let stg = document.querySelector(".settings")
btn.onclick = function() {
    stg.classList.toggle("open");
}

// Color Options

let lis = document.querySelectorAll(".settings .color li")

if(localStorage.getItem("color")) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color"))
    lis.forEach(li => {
        li.classList.remove("active")
        if(li.dataset.color == localStorage.getItem("color")) {
            li.classList.add("active")
        }
    })
}

lis.forEach(li => {
    li.addEventListener("click", (e) => {
        lis.forEach((li) => li.classList.remove("active"))
        li.classList.add("active")
        localStorage.setItem("color", e.target.dataset.color);
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color)
    })
})

// Random BackGround

let landing = document.querySelector(".landing")
let arr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]
let randomBack = document.querySelectorAll(".settings .backgrounds li")
let backgroundOption = true;
let interval;

if(localStorage.getItem("random-background")) {
    if(localStorage.getItem("random-background") === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    randomBack.forEach(li => {
        li.classList.remove("active")
        if(localStorage.getItem("random-background") === "true") {
            document.querySelector("[data-background='yes']").classList.add("active")
        } else {
            document.querySelector("[data-background='no']").classList.add("active")
        }
    })
}

randomBack.forEach(li => {
    li.addEventListener("click", (e) => {
        randomBack.forEach(li => {li.classList.remove("active")})
        e.target.classList.add("active")
        if(e.target.dataset.background === "yes") {
            backgroundOption = true;
            randomize();
            localStorage.setItem("random-background", true)
        } else {
            backgroundOption = false;
            clearInterval(interval);
            localStorage.setItem("random-background", false)
        }
    })
})

function randomize() {
    if(backgroundOption === true) {
        interval = setInterval(function() {
            let random = Math.floor(Math.random()*arr.length)
            landing.style.backgroundImage = 'url(/Templates/Elzero_Template_05/Imgs/'+arr[random]+')';
        }, 10000)
    }
}
randomize();

// Show Bullets

let bullets = document.querySelectorAll(".settings .bullets li")
let nav = document.querySelector(".nav")
let navBullet = document.querySelectorAll(".nav .bullet")

navBullet.forEach(bullet => {
    bullet.addEventListener("click", (e) => {
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: "smooth"
        })
    })
})

if(localStorage.getItem("show")) {
    nav.style.visibility = localStorage.getItem("show")
    bullets.forEach(li => {
        li.classList.remove("active")
        if(li.dataset.show === localStorage.getItem("show")) {
            li.classList.add("active")
        }
    })
}

bullets.forEach(li => {
    li.addEventListener("click", (e) => {
        bullets.forEach(li => {li.classList.remove("active")})
        e.target.classList.add("active")
        if(e.target.dataset.show === "visible") {
            nav.style.visibility = "visible"
            localStorage.setItem("show", e.target.dataset.show)
        } else {
            nav.style.visibility = "hidden"
            localStorage.setItem("show", e.target.dataset.show)
        }
    })
})

// Reset Options

let reset = document.querySelector(".reset")

reset.onclick = function() {
    localStorage.clear()
    window.location.reload()
}

// Progress Skill Bar

let prog = document.querySelectorAll(".skill-progress span")

window.onscroll = function() {
    if(window.scrollY > 700) {
        prog.forEach(span => {
            span.style.width = span.dataset.progress;
        }) 
    }
}

// Pop Up Img

let imgs = document.querySelectorAll(".gallery img")

imgs.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement("div")
        let div = document.createElement("div")
        let head = document.createElement("h4")
        let del = document.createElement("span")
        let mg = document.createElement("img")

        overlay.className = "popup-overlay"
        div.style.cssText = "background-color:white; padding:20px; position:fixed; left:50%; top:50%; transform:translate(-50%,-50%); z-index:11;"
        head.style.cssText = "color:var(--main-color); text-align:center; margin-bottom: 20px; font-size: 20px"
        del.style.cssText = "position:absolute; width:40px; height:40px; background-color:var(--main-color); color:white; top:-20px; right:-20px; border-radius:50%; text-align:center; line-height:2.5; font-weight:bold; cursor:pointer"
        mg.style.cssText = "width:100%"
        mg.src = e.target.src 

        head.append(e.target.alt)
        del.append("X")

        document.body.appendChild(overlay)
        document.body.appendChild(div)
        div.appendChild(head)
        div.appendChild(del)
        div.appendChild(mg)

        del.onclick = function() {
            div.remove()
            overlay.remove()
        }
    })
})

// Show MegaMenu

let button = document.querySelector(".head .links .button")
let ul = document.querySelector(".head .links ul")

button.onclick = function() {
    ul.classList.toggle("open")
    button.classList.toggle("active")
}  