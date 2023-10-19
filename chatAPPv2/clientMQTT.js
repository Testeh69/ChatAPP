
var currentUrl = window.location.href;
const userName  = generateRandomUsername();
const  ipAddress = "172.20.10.4";
const socket = io(`http://${ipAddress}:3000`);
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');//selctionne l'element id 
const messagesContainer = document.getElementById('messages');



function generateRandomUsername() {
    const adjectives = ['happy', 'sunny', 'funny', 'lucky', 'clever', 'cool', 'friendly'];
    const nouns = ['cat', 'dog', 'rabbit', 'penguin', 'dolphin', 'unicorn', 'dragon'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomSuffix = Math.floor(Math.random() * 1000); // Ajoutez un suffixe numérique aléatoire pour plus d'unicité
    return `${randomAdjective}-${randomNoun}-${randomSuffix}`;
  }


sendMessage = ()=>{
    const text = messageInput.value.trim();
    var topic = "rubis"
    currentUrl = window.location.href;
    console.log(currentUrl);
    if (currentUrl === `http://${ipAddress}:3000/chat_room_mqtt.html`)
      {
        var topic = "rubis";
    }
    else if(currentUrl === `http://${ipAddress}:3000/chat_room_mqtt_2.html`)
    {
      var topic = "sonium"
    }
    if (text){
    const message = {
        topic: topic,
        userName:userName,
        message: text
        };
     // Create a container for the sent message
     const sentMessageContainer = document.createElement('div');
     sentMessageContainer.classList.add('message-sent');
 
     // Create elements for username and message text
     const userNameElement = document.createElement('span');
     userNameElement.textContent = "Me: " + message.userName;
 
     const textElement = document.createElement('p');
     textElement.textContent = message.message;
 
     // Append elements to the container
     sentMessageContainer.appendChild(userNameElement);
     sentMessageContainer.appendChild(textElement);
     
 
     // Append the container to the messages container
     messagesContainer.appendChild(sentMessageContainer);
    socket.emit('chat-message',message);
    messageInput.value="";
}}



messageInput.addEventListener("click", ()=>{
    messageInput.value = "";
})

displayReceiveMessage = (userName) => {
    socket.on("chat-message", (message) => {
      if (userName !== message.userName && currentUrl === `http://${ipAddress}:3000/chat_room_mqtt.html` && message.topic ==="rubis") {
        // Creation of an element div where we add the class message-received
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-received");
        
        // Creation of an element span to display the username
        const userNameElement = document.createElement("span");
        userNameElement.textContent = message.userName;
  
        // Check if the message contains image data
        if (message.fileData) {
          // Create an image element to display the image
          const imageElement = document.createElement("img");
          imageElement.src = message.fileData; // Set the image source
          imageElement.width = 100;
          imageElement.height = 100;
          // Append the image element to the message container
          messageContainer.appendChild(userNameElement);
          messageContainer.appendChild(imageElement);
        } else {
          // Creation of an element p to display the text message
          const textElement = document.createElement("p");
          textElement.textContent = message.message;
  
          // Append the elements to the message container
          messageContainer.appendChild(userNameElement);
          messageContainer.appendChild(textElement);
        }
  
        // Append the message container to the messages container
        messagesContainer.appendChild(messageContainer);
      }
      if (userName !== message.userName && currentUrl === `http://${ipAddress}:3000/chat_room_mqtt_2.html` && message.topic ==="sonium") {
        // Creation of an element div where we add the class message-received
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-received");
        
        // Creation of an element span to display the username
        const userNameElement = document.createElement("span");
        userNameElement.textContent = message.userName;
  
        // Check if the message contains image data
        if (message.fileData) {
          // Create an image element to display the image
          const imageElement = document.createElement("img");
          imageElement.src = message.fileData; // Set the image source
          imageElement.width = 100;
          imageElement.height = 100;
          // Append the image element to the message container
          messageContainer.appendChild(userNameElement);
          messageContainer.appendChild(imageElement);
        } else {
          // Creation of an element p to display the text message
          const textElement = document.createElement("p");
          textElement.textContent = message.message;
  
          // Append the elements to the message container
          messageContainer.appendChild(userNameElement);
          messageContainer.appendChild(textElement);
        }
  
        // Append the message container to the messages container
        messagesContainer.appendChild(messageContainer);
      }
    });
  }



  displayReceiveMessage(userName);
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener("keydown",function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        sendMessage();
    }
})
