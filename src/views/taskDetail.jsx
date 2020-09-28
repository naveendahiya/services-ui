import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import profile from '../images/user.svg';
import location from '../images/location.svg';
import calendar from '../images/calendar.svg';
import '../styles/taskDetail.scss';
import {Button, Card, Divider, Label} from 'semantic-ui-react'
import BidCard from "../components/cards/bidCard";
import BidForm from "../components/forms/bidForm";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {
    useParams,
    useHistory
} from "react-router-dom";
import apiClient from "../config/apiclient";
import WebSocketInstance from '../config/websocket';
import Chat from '../components/chat'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {getTask} from '../actions/taskAction';
import {getTaskBid} from '../actions/bidAction';
const { forwardRef, useRef } = React;



function TaskDetail(props) {
    const taskdata = useSelector(state => state.taskReducer.selectedTask);
    const offers =  useSelector(state => state.bidReducer.bids);
    let user_id = useSelector(state => state.userReducer.user.pk)
    let { id } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();

    if(user_id == undefined){
        user_id = localStorage.getItem('user_id');
    }

    useEffect(() => {
        WebSocketInstance.connect(`ws://localhost:8000/ws/chat/${id}/${user_id}`);
        dispatch(
            getTask(id)
        )
        dispatch(
            getTaskBid(id)
        )
    }, []);


    const offerSelect = (id) => {
       let data = {
          selected: id 
       }
       apiClient.patch(`tasks/${id}/`, data)
           .then(res => {
              console.log(res);
        }) 
    }


    const OfferList = () => {
        let products = [];
        if(offers.length > 0){
            products = offers.map((offer) =>
                <BidCard offer={offer} taskuser={taskdata.creater} accept={() => offerSelect(offer.id)} />
            )
        }else{
           products = <h3>No Offers Yet For This Task.</h3>
        }
        return (
            products
        )
    }


    const childRef = useRef();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: '100%', marginTop: '56px', paddingTop: '10px', position: 'relative'  }} >
                    <BidForm ref={childRef}  id={taskdata.id} />
                    <div className='status-bar'></div>
                    <KeyboardArrowLeftIcon className='back-button'  onClick={() => history.goBack()} />
                    <div className='task-detail' >
                       <div className='outer detail-heading'>
                           {taskdata.title}
                       </div>
                       <div className='outer detail-user'>
                           <div className='detail-user-image'>
                               <img src={profile} className='detail-user-img' />
                           </div>
                           <div className='detail-user-name'>
                               <spam className='detail-user-heading' >POSTED BY</spam><br></br>
    <span className='detail-user-value' >{taskdata.creatername}</span>
                           </div>
                           <div className='detail-user-time'>
                           {moment(taskdata.due_date).fromNow()}
                           </div>
                       </div>
                       <Divider />
                       <div className='outer detail-location'>
                           <div className='detail-location-img'>
                               <img src={location} className='location-img' />
                           </div>
                           <div className='detail-location-data'>
                               <spam className='detail-location-heading' >LOCATION</spam>
                               <span className='detail-location-value' >
                                   Geelong VIC, Australia
                               </span>
                           </div>
                       </div>
                       <Divider />
                       <div className='outer detail-date'>
                           <div className='detail-date-img'>
                               <img src={calendar} className='date-img' />
                           </div>
                           <div className='detail-date-data'>
                              <span className='detail-date-heading'>DUE DATE</span>
                               <span className='detail-date-value' >Tuesday, 1st Sep 2020</span>
                           </div>
                       </div>
                       <Divider />

                       <Card className='outer offer-card'>
                           <Card.Content>
                               <Card.Header className='offer-card-header'>
                                   <span className='offer-info' >Task Budget</span>
                                   <span className='offer-price' >${taskdata.price}</span>
                               </Card.Header>
                               <Divider />
                               <div className='offer-button-box'>
                                   <Button
                                       content="Make an offer"
                                       labelPosition='right'
                                       icon='checkmark'
                                       positive
                                       className='offer-button'
                                       onClick={() => childRef.current.onOpen()}
                                   />
                               </div>
                           </Card.Content>
                       </Card>
                       <Divider />
                       <div className='outer detail-info'>
                           <span>Details</span>
                           <div className='detail-text'>
                               {taskdata.description}
                           </div>
                       </div>
                       <Divider />
                       <div style={{display: taskdata.selected == -1 ? 'block' : 'none'}} className='outer detail-offer'>
                           <span>Offers</span>
                           <div className='detail-offer-list'>
                               {OfferList()}
                           </div>
                       </div>
                       <Divider />
                       <div className="outer">
                             {taskdata.selected == -1 ? "" : <Chat />}
                       </div>
                   </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}

export default TaskDetail;