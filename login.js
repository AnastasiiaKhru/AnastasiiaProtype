document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
     const users=[{
        username: 'main',
        password: '1234'
    },
{
    username: 'eng',
    password: '1234'
},{
    username: 'prod',
    password: '1234'
},{
    username: 'log',
    password: '1234'
},{
    username: 'qc',
    password: '1234'
}]

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
const user =users.find(user => user.username === username && user.password === password);
        // Here you would typically send a request to your backend API to authenticate the user
        // For this example, we'll use a simple check
        if (user) {
            //alert('Login successful!');
            // Redirect to the dashboard or home page
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });
});
// After successful login
localStorage.setItem('username', username);