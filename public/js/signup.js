async function signUp(){
    event.preventDefault();

    const username = document.querySelector('#new-username').value.trim();
    const password = document.querySelector('#new-password').value.trim();

    if (username && password){
        const response = await fetch ('/api/user/new', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok){
            document.location.replace('/dash');
        } else {
            alert('Error');
        }
    }
};

document.querySelector('.new-signup').addEventListener('click', signUp);