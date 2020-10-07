import React, { Component } from "react";
import WebSocketInstance from "../config/websocket";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Button, Card, Divider, Label, Form, TextArea } from "semantic-ui-react";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      hide: false, 
    };

    this.waitForSocketConnection(() => {
      WebSocketInstance.initChatUser();
      WebSocketInstance.addCallbacks(
        this.setMessages.bind(this),
        this.addMessage.bind(this)
      );
      WebSocketInstance.fetchMessages();
    });

    this.showMessages = this.showMessages.bind(this);
  }

  waitForSocketConnection(callback) {
    const component = this;
    setTimeout(function () {
      // Check if websocket state is OPEN
      if (WebSocketInstance.state() === 1) {
        console.log("Connection is made");
        callback();
        return;
      } else {
        console.log("wait for connection...");
        component.waitForSocketConnection(callback);
      }
    }, 100); // wait 100 milisecond for the connection...
  }

  addMessage(message) {
    this.setState({ messages: [ message , ...this.state.messages ] });
  }

  setMessages(messages) {
    this.setState({ messages: messages.reverse() });
  }

  messageChangeHandler = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  sendMessageHandler = (e, message) => {
    const messageObject = {
      text: message,
    };
    WebSocketInstance.newChatMessage(messageObject);
    this.setState({
      message: "",
    });
    e.preventDefault();
  };

  showMessages(){
    let messages = this.state.messages.map((message) => 
        <div className={message.creater == parseInt(sessionStorage.getItem('user_id')) ? 'message-2' : 'message'}>
          <div className="creater"></div>
          <div className="text">{message.message}</div>
        </div>
    )
    return(
      messages
    )
  }

  toggleMessages(string){
    let bool = false;
    switch(string){
      case 'hide':
        bool = true;
        break;
      case 'show':
        bool = false;
        break;
      default:
        bool = false;
        break;
    }
    this.setState({
      hide: bool,
    })
  }

  render() {
    return (
      <div className="chat">
        <div className="outer chat-heading">
          <span>PRIVATE MESSAGES</span>
        </div>
        <div className="container message-form">
          <form
            onSubmit={(e) => this.sendMessageHandler(e, this.state.message)}
            className="form"
          >
            <Card className="input-card">
              <Card.Content>
                <div className="input-label">Type your Message</div>
                <Card.Description>
                <Form.Field
                            control={TextArea}
                            name='message'
                            value={this.state.message}
                            onChange={this.messageChangeHandler}
                            placeholder='eg- hello'
                            required
                        />
                </Card.Description>
                <div className="errors"></div>
                <div className="extra">
                  <div className="totalwords">1500</div>
                  <button className="submit" type="submit" value="Submit">
                    Send
                  </button>
                </div>
              </Card.Content>
            </Card>
          </form>
        </div>
        <div className="hide-button-box">
          {this.state.hide ? <div onClick={() => this.toggleMessages('show')} className='hide-button'><ArrowDropDownIcon className='up-hide-icon' /></div> : <div onClick={() => this.toggleMessages('hide')} className='hide-button'><ArrowDropUpIcon className='up-hide-icon'  /></div>}
        </div>
        <Divider />
        <div style={{display: this.state.hide ? 'none': 'block'}} className="messages">
           {this.showMessages()}
        </div>
      </div>
    );
  }
}
