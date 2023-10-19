let { ipAddress } = require('./variableServer.js');
const express = require("express")
const mqtt = require("mqtt");
const http = require("http")
const socketIO = require("socket.io");
const { disconnect } = require("process");
const cors = require("cors");
const corsOptions = { origin:"*"};
let saveTopic;


class Server{
  
    constructor(linkServerMqtt = "mqtt://test.mosquitto.org"){
      this.app = express();
      this.server = http.createServer(this.app);
      this.ioSocket = socketIO(this.server);
      this.app.use(express.static(__dirname));
      this.app.use(cors(corsOptions));
      this.client = mqtt.connect(linkServerMqtt);
    }


    listenEventServer = () =>{
      this.ioSocket.on("connection", (socket)=>{
        console.log("a user is connected");
        
        socket.on("chat-message", (message)=>{
          const messageToSend = JSON.stringify({topic: message.topic, userName: message.userName, message: message.message})
          console.log(message.topic)
          this.client.subscribe(message.topic)
          this.client.publish(message.topic,messageToSend);
        })

        socket.on("disconnect",()=>{
          console.log("A user is disconnected")
        })

      })

      this.client.on("message",(topic,message)=>{
        console.log(message)
        const messageJsonToObject = JSON.parse(message);
        console.log(messageJsonToObject)
        this.ioSocket.emit("chat-message", messageJsonToObject )
      })
    }


    installServer = (port, ipAddress="localhost") =>{
      this.port = port;
      this.ipAddress = ipAddress;
      this.server.listen(this.port, this.ipAddress,()=>{
        console.log(`server is running on http://${this.ipAddress}:${this.port}/chat_room_mqtt.html`);
        console.log(`server is running on http://${this.ipAddress}:${this.port}/chat_room_mqtt_2.html`);
        console.log(`server is running on http://${this.ipAddress}:${this.port}/main.html`);


      })
    }


}


/*SCRIPT*/
const chatServer = new Server();
chatServer.listenEventServer();
chatServer.installServer(3000, ipAddress = "172.20.10.4");

