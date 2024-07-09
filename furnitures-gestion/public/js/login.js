document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    window.location.href = "/dashboard";

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        alert(errorData.msg);
      }
    } catch (error) {
      console.error('Erreur lors de la tentative de connexion:', error);
    }
  });
  