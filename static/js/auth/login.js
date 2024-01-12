document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const emailview = document.getElementById('email')
    const passwordview = document.getElementById('password')
    const error = document.getElementById('error')
    const email = emailview.value
    const password = passwordview.value
    error.innerHTML = ''
    const emailreq = new XMLHttpRequest()
    emailreq.onload = () => {
        if (emailreq.responseText == 'true') {
            const passreq = new XMLHttpRequest()
            passreq.onload = () => {
                if (passreq.responseText = 'true') {
                    const req = new XMLHttpRequest()
                    req.onload = () => {
                        if (req.responseText == 'success') 
                            window.location = '/'
                        else 
                            error.innerHTML = 'Something went wrong, sorry. Please try again later'
                    }
                    req.open('GET', '/api/auth/login?email=' + email)
                    req.send()
                } else
                    error.innerHTML = 'Incorrect password'
            }
            passreq.open('GET', `/api/auth/check?email=${email}&password=${password}`)
            passreq.send()    
        } else if (emailreq.responseText == 'false') 
            error.innerHTML = 'Sorry, account with this email doesn\'t exists'
        else 
            error.innerHTML = 'Something went wrong, sorry. Please try again later'
    }
    emailreq.open('GET', '/api/auth/exist?email=' + email)
    emailreq.send()
    
})

function show(el) {
    if (el.checked == true) {
        document.getElementById('password').type = 'text'
    }
    else if (el.checked == false) {
        document.getElementById('password').type = 'password'
    }
}