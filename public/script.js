document.getElementById('send-button').addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();

    const messagesDiv = document.getElementById('messages');
    const userMessageDiv = document.createElement('div');
    userMessageDiv.textContent = `You: ${userInput}`;
    const botMessageDiv = document.createElement('div');
    botMessageDiv.textContent = `Bot: ${data.response}`;

    messagesDiv.appendChild(userMessageDiv);
    messagesDiv.appendChild(botMessageDiv);
    document.getElementById('user-input').value = '';
});
