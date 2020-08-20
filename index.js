


document.addEventListener("DOMContentLoaded", function(e){
    horoscopeUrl = "http://localhost:3000/horoscopes/"
    usersUrl = "http://localhost:3000/users/"
    userHoroscopeUrl = "http://localhost:3000/user_horoscopes/"
    
    fetch(horoscopeUrl)
    .then(response => response.json())
    .then(horoscopes => renderHoroscopes(horoscopes))

    function renderHoroscopes(horoscopes){
        // horoscopes.forEach(horoscope => renderHoroscope(horoscope))
        horoscope = horoscopes[Math.floor(Math.random()* horoscopes.length)]
        renderHoroscope(horoscope)
    }

    function renderHoroscope(horoscope){
        let main = document.querySelector('main')
       
        let div = document.createElement('div')
        div.className = 'card'
        div.id = 'horo-div'
        let h3 = document.createElement('h3')
        h3.innerText = horoscope.title
        div.appendChild(h3)
        let p = document.createElement('p')
        p.innerText = horoscope.text 
        div.appendChild(p)

        let container = document.querySelector('.container')
        const form = document.querySelector('.add-user-form')
        form.addEventListener("submit", (e) => {
            main.appendChild(div)
            e.preventDefault()
            createUser(form, container)
            form.reset()
            // container.innerHTML = ""
    })
    }

    function createUser(form, container){
        let bday = document.querySelector('#dob-day').value
        let month = document.querySelector('#dob-month').value
        let year = document.querySelector('#dob-year').value
        let birthday = year.concat(month, bday)
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
    .then(user => 
       { console.log(user.birthdate.zodiac_sign)
            // if (user.birthdate.zodiac_sign = "Aquarius"){
            //      console.log("Hello Auarius")}
            // if (user.birthdate.zodiac_sign = "Pisces"){
            //     return console.log("Hello Pisces")}
        renderHoroscope(horoscope),
        userHoroscope(user, horoscope)
         console.log(user),
         container.innerHTML = ""}
    )}

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
    .then(data => console.log(data),
    writeHoroscope(user)
    )
}

function writeHoroscope(user){
    let newForm = document.createElement('form')
    newForm.className = 'add-horo-form'
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
            user_id: user.id,
            title: newForm.title.value,
            text: newForm.text.value
        })
    })
    .then(response => response.json())
    .then(data => console(data))      
}

})