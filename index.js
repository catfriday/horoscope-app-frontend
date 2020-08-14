


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

        
        const form = document.querySelector('.add-user-form')
        form.addEventListener("submit", (e) => {
            main.appendChild(div)
            e.preventDefault()
            createUser(form)
            form.reset()
    })
    }

    function createUser(form){
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
            // 
            user 
        })
    })
    .then(response => response.json())
    .then(horoscope => 
        renderHoroscope(horoscope),
        userHoroscope(user, horoscope))
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
    let h3 = document.createElement('h3')
    h3.innerText = "Leave a Horoscope for Someone Else!"
    let label = document.createElement('label')
    label.innerText = 'Horoscope Title'
    formDiv.appendChild(label)
    let input = document.createElement('input')
    input.innerHTML = `
    type="text"
    name="title"
    value=""
    placeholder="Enter Title"
    class="input-text"`
    
    console.log(newForm)
}



})