
document.addEventListener("DOMContentLoaded", function(e){
    horoscopeUrl = "http://localhost:3000/horoscopes/"
    usersUrl = "http://localhost:3000/users/"
    userHoroscopeUrl = "http://localhost:3000/user_horoscopes/"
    loginUrl = "http://localhost:3000/users/login/"

    let userName = document.querySelector('#user-name')
    
    fetch(horoscopeUrl)
    .then(response => response.json())
    .then(horoscopes => renderHoroscopes(horoscopes))

    function renderHoroscopes(horoscopes){
        horoscope = horoscopes[Math.floor(Math.random()* horoscopes.length)]
        renderHoroscope(horoscope)
    }

    function renderHoroscope(horoscope){
        let main = document.querySelector('main')
        
        let container = document.querySelector('.container')
        let div = document.createElement('div')
        div.className = 'card'
        div.id = 'horo-div'
        let h3 = document.createElement('h3')
        h3.innerText = horoscope.title
        div.appendChild(h3)
        let p = document.createElement('p')
        p.innerText = horoscope.text 
        div.appendChild(p)
        
        const form = document.querySelector('.add-user-form')
        form.addEventListener("submit", (e) => {
            main.appendChild(div)
            e.preventDefault()
            createUser(form, container)
            form.reset()
    })


    let loginForm = document.querySelector('#user-login')
    loginForm.addEventListener('submit', (e)=> {
        main.appendChild(div)
        e.preventDefault()
        userLogin(loginForm)
    })
 }

    let loginDiv = document.querySelector('.login-form')
    let login = document.querySelector('#login')
    login.style.cursor = "pointer"
    let signUpLogin = document.querySelector('.signup-login')
    login.addEventListener('click', (e)=> {
        loginDiv.style = "visibility: visible;"
        signUpLogin.innerHTML = ""
    })


    let signUp = document.querySelector('#sign-up')
    signUp.style.cursor = "pointer"
    signUp.addEventListener('click', (e) => {
        let container = document.querySelector('.container')
        let login = document.querySelector('.signup-login')
        container.style = "visibility: visible;"
        login.innerHTML = ""
    })


function userLogin(loginForm){
    fetch(loginUrl + loginForm.name.value)
    .then(response => response.json())
    .then(user =>{
        [year, month, bday] = user.birthdate.split('-')
        let day = parseInt(bday, 10) 
        renderSign(month,day),
        renderHoroscope(horoscope),
        userHoroscope(user, horoscope),
        userName.innerHTML = `
       <h3><b> Hello ${user.name}! 
        <br/> 
        Here's today's horoscope</b></h3>`
        loginForm.innerHTML = ""
    })
}

    function createUser(form, container){
        let bday = document.querySelector('#dob-day').value
        let month = document.querySelector('#dob-month').value
        let year = document.querySelector('#dob-year').value
        let birthday = year.concat(month, bday)
        let day = parseInt(bday, 10)
        user = {
            name: form.name.value,
            birthdate: birthday
        }
        fetch(usersUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user
        })
    })
    .then(response => response.json())
    .then(user => { 
        userName.innerHTML = `
       <h3><b> Hello ${user.name}!
        <br/> 
        Here's today's horoscope</b></h3>`
        renderHoroscope(horoscope),
        userHoroscope(user, horoscope),
        renderSign(month, day),
         console.log(user)
         container.innerHTML = ""
       }
    )}

function renderSign(month, day){
    let div = document.querySelector('#horo-div')
    let image = document.createElement('img')
    let h4 = document.createElement('h4')
    image.width = '260'
    image.height = '260'
    image.alt = '"centered image"'
    div.appendChild(image)
    div.appendChild(h4)
    if ((month.includes('02')) && (day >= 19 && day <= 29) || (month.includes('03')) && (day >= 01 && day <= 20)){
        console.log('hello pisces')
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/pisces.jpg"
        h4.innerText = 'Pisces'
    }
    if  ((month.includes('03')) && (day >= 21 && day <= 31) || (month.includes('04')) && (day >= 01 && day <= 19)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/aries.jpg"
        h4.innerText = 'Aries'
    }

    if  ((month.includes('04')) && (day >= 20 && day <= 30) || (month.includes('05')) && (day >= 01 && day <= 20)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/taurus.jpg"
        h4.innerText = 'Taurus'
    }

    if  ((month.includes('05')) && (day >= 21 && day <= 31) || (month.includes('06')) && (day >= 01 && day <= 20)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/gemini.jpg"
        h4.innerText = 'Gemini'
    }

    if  ((month.includes('06')) && (day >= 21 && day <= 30) || (month.includes('07')) && (day >= 01 && day <= 22)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/cancer.jpg"
        h4.innerText = 'Cancer'
    }

    if  ((month.includes('07')) && (day >= 23 && day <= 31) || (month.includes('08')) && (day >= 01 && day <= 22)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/leo.jpg"
        h4.innerText = 'Leo'
    }

    if  ((month.includes('08')) && (day >= 23 && day <= 31) || (month.includes('09')) && (day >= 01 && day <= 22)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/virgo.jpg"
        h4.innerText = 'Virgo'
    }

    if  ((month.includes('09')) && (day >= 23 && day <= 30) || (month.includes('10')) && (day >= 01 && day <= 22)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/libra.jpg"
        h4.innerText = 'Libra'
    }

    if  ((month.includes('10')) && (day >= 23 && day <= 31) || (month.includes('11')) && (day >= 01 && day <= 21)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/scorpio.jpg"
        h4.innerText = 'Scorpio'
    }

    if  ((month.includes('11')) && (day >= 22 && day <= 30) || (month.includes('12')) && (day >= 01 && day <= 21)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/sagittarius.jpg"
        h4.innerText = 'Sagittarius'
    }

    if  ((month.includes('12')) && (day >= 22 && day <= 31) || (month.includes('01')) && (day >= 01 && day <= 19)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/capricorn.jpg"
        h4.innerText = 'Capricorn'
    }

    if  ((month.includes('01')) && (day >= 20 && day <= 31) || (month.includes('02')) && (day >= 01 && day <= 18)){
        image.src = "/Users/catrinafriday/Development/code/horoscopes project/horoscope-app-frontend/signs_pics/aquarius.jpg"
        h4.innerText = 'Aquarius'
    }

}

function userHoroscope(user, horoscope){ 
    fetch(userHoroscopeUrl, {
        method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            user_id: user.id,
            horoscope_id: horoscope.id
        })
    })
    .then(response => response.json())
    .then(data => 
    writeHoroscope(user)
    )
}

function writeHoroscope(user){
    let newForm = document.createElement('form')
    newForm.className = 'add-horo-form'
    newForm.style = "text-align:center; vertical-align: center;"
    let formDiv = document.createElement('div')
    formDiv.id = 'new-horo'
    newForm.appendChild(formDiv)
    newForm.innerHTML = `
    <br/>

        <legend>Write A Horoscope for Someone Else!</legend>
       
          <label>Title:</label>
          <input type = "text"
                 name = "title"
                 value = "" 
                 placeholder= "title"
                 class="input-text"
                 />
        
        <br/>
          <label>Horoscope:</label>
            <textarea 
                  id = "myTextArea"
                  name = "text"
                  value = ""
                  placeholder= "Write New Horoscope Here"
                  >
            </textarea>
            <br/>
            <input
                    type="submit"
                    name="submit"
                    value="Make Someone's Day Bright!"
                    class="submit"
                  />`

    let main = document.querySelector('main')
    main.appendChild(newForm)
    
    newForm.addEventListener('submit', (e) => {
        e.preventDefault()
       submitNewHoro(user, newForm)
       newForm.reset()
    })
}

function submitNewHoro(user, newForm){
    fetch(horoscopeUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            author_id: user.id,
            title: newForm.title.value,
            text: newForm.text.value
        })
    })
    .then(response => response.json())
    .then(data => 
        fetchWrittenHoroscopes(user)
    )}

function fetchWrittenHoroscopes(user){
    fetch(usersUrl + user.id)
    .then(response => response.json())
    .then(data => writtenHoroscopes(data.written_horoscopes))   
}

function writtenHoroscopes(horoscopes){
    horoscopes.forEach(horoscope => {
        console.log(horoscope)
    })
}

})