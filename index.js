


document.addEventListener("DOMContentLoaded", function(e){
    horoscopeUrl = "http://localhost:3000/horoscopes/"
    usersUrl = "http://localhost:3000/users/"
    
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
            console.log(e)
            createUser(form)
            form.reset()
    })
    }

    function createUser(form){
        let bday = document.querySelector('#dob-day').value
        let month = document.querySelector('#dob-month').value
        let year = document.querySelector('#dob-year').value
        let birthday = year.concat(month, bday)
        fetch(usersUrl, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: form.name.value,
            birthdate: birthday
        })
    })
    .then(response => response.json())
    .then(horoscope => renderHoroscope(horoscope))
}
})