async function login(event){
    event.preventDafault();

    const username = document.querySelector('#username-login').value;
    const password = document.querySelector('#password=login').value;

    if(username && password){
        const response = await fetch ('api/user/login',{
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok){
            document.location.replace('/dash');
        } else {
            alert('Error');
        }
    }
};

document.querySelector('.login').addEventListener('click', login);