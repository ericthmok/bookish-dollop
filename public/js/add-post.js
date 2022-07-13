async function addPost(event){
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('input[name="post-text"]').value;

    const response = await fetch(`/api/post`,{
        method: 'POST',
        body: JSON.stringify({
            title,
            post_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok){
        document.location.replace('/dash');
    } else {
        console.log('Error');
    }
}

document.querySelector('.newPostForm').addEventListener('submit', addPost);