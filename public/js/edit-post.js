async function editPost(event){
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('input[name="post-text"]').value;
    const id = window.location.toString().split('/')[window.location.toString().split('/').length-1];

    const response = await fetch(`/api/posts/${id}`,{
        method: 'PUT',
        body: JSON.stringify({ title, post_text}),
        headers: {'Content-Type': 'application/json'}
    });
    if(response.ok){
        document.location.replace('/dash');
    } else {
        alert('Error');
    }
};

document.querySelector('.edit-post').addEventListener('submit', editPost);