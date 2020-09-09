
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
        const path = task_url;
        this.socketRef = new WebSocket(path);
        this.socketRef.onopen = () => {
            console.log('websocket open');
        };
        this.socketRef.onmessage = e => {
            console.log(e.onmessage);
        }
        this.socketRef.onerror = e => {
            console.log(e.messsage);
        }
        this.socketRef.onclose = () => {
            console.log('websockets closed lets reopne');
            this.connect();
        }
    }

    socketNewMessage(data){
        const parsedData = JSON.parse(data);
        const command = parsedData.command;
        if(object.keys(this.callbacks).length === 0){
            return;
        }
        if(command === 'messages'){
            this.callbacks[command](parsedData.messages);
        }
        if(command === 'new_message'){
            this.callbacks[command](parsedData.messages);
        }
    }

    initChatUser(user_id) {
        this.sendMessage({ command: 'init_chat', user_id: user_id });
      }
    
      fetchMessages(user_id) {
        this.sendMessage({ command: 'fetch_messages', user_id: user_id });
      }
    
      newChatMessage(message, user_id) {
        this.sendMessage({ command: 'new_message', text: message.text, user_id: user_id }); 
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