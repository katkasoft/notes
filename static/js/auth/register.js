document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const emailview = document.getElementById('email')
    const passwordview = document.getElementById('password')
    const confirmview = document.getElementById('confirm')
    const error = document.getElementById('error')
    const email = emailview.value
    const password = passwordview.value
    const confirm = confirmview.value
    error.innerHTML = ''
    const emailreq = new XMLHttpRequest()
    emailreq.onload = () => {
        if (emailreq.responseText == 'true') {
            error.innerHTML = 'Sorry, user with this email already exists.'
        } else if (emailreq.responseText == 'false') {
            if (password.length < 8) {
                error.innerHTML = 'Password too short. Minimal 8 characters'
                return
            }
            if (password != confirm) {
                error.innerHTML = 'Passwords don\'t match'
                return
            }
            const req = new XMLHttpRequest()
            req.onload = () => {
                if (req.responseText = 'success')
                    window.location = '/'
                else
                    error.innerHTML = 'Something went wrong, sorry. Please try again later'
            }
            req.open('GET', `/api/auth/register?email=${email}&password=${password}`)
            req.send()    
        } else {
            error.innerHTML = 'Something went wrong, sorry. Please try again later'
        }
    }
    emailreq.open('GET', '/api/auth/exist?email=' + email)
    emailreq.send()
    
})

function show(el) {
    if (el.checked == true) {
        document.getElementById('password').type = 'text'
        document.getElementById('confirm').type = 'text'
    }
    else if (el.checked == false) {
        document.getElementById('password').type = 'password'
        document.getElementById('confirm').type = 'password'
    }
}