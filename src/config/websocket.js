
class WebSocketService{
    static instance = null;
    callbacks = {};

    static getInstance(){
        if(!WebSocketService.instance){
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    constructor(){
        this.socketRef = null;
    }

    connect(task_url){
        this.socketRef = new WebSocket(task_url);
        this.socketRef.onopen = () => {
            console.log('websocket open');
        };
        this.socketRef.onmessage = e => {
          this.socketNewMessage(e.data);
        }
        this.socketRef.onerror = e => {
            console.log(e.onerror);
        }
        this.socketRef.onclose = () => {
            console.log('websockets closed lets reopne');
            this.connect();
        }
    }

    socketNewMessage(data){
        const parsedData = JSON.parse(data);
        console.log(data);
        console.log(typeof(data));
        console.log(typeof(parsedData));
        console.log(parsedData);
        console.log(parsedData.command);
        const command = parsedData.command;
        if(Object.keys(this.callbacks).length === 0){
            return;
        }
        if(command === 'messages'){
            this.callbacks[command](parsedData.messages);
        }
        if(command === 'new_message'){
            this.callbacks[command](parsedData.message);
        }
    }

    initChatUser() {
        this.sendMessage({ command: 'init_chat', userid: parseInt(sessionStorage.getItem('user_id')) });
      }
    
      fetchMessages() {
        this.sendMessage({ command: 'fetch_messages', userid: parseInt(sessionStorage.getItem('user_id')) });
      }
    
      newChatMessage(message) {
        this.sendMessage({ command: 'new_message', text: message.text, userid: parseInt(sessionStorage.getItem('user_id')) }); 
      }
    
      addCallbacks(messagesCallback, newMessageCallback) {
        this.callbacks['messages'] = messagesCallback;
        this.callbacks['new_message'] = newMessageCallback;
      }
      
      sendMessage(data) {
        try {
          this.socketRef.send(JSON.stringify({ ...data }));
        }
        catch(err) {
          console.log(err.message);
        }  
      }
    
      state() {
        return this.socketRef.readyState;
      }
    
       waitForSocketConnection(callback){
        const socket = this.socketRef;
        const recursion = this.waitForSocketConnection;
        setTimeout(
          function () {
            if (socket.readyState === 1) {
              console.log("Connection is made")
              if(callback != null){
                callback();
              }
              return;
    
            } else {
              console.log("wait for connection...")
              recursion(callback);
            }
          }, 1); // wait 5 milisecond for the connection...
      }
}


const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;