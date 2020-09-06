import React, {useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import profile from '../images/user.svg';
import location from '../images/location.svg';
import calendar from '../images/calendar.svg';
import '../styles/taskDetail.scss';
import {Button, Card, Divider, Label} from 'semantic-ui-react'
import BidCard from "./bidCard";
import BidForm from "./bidForm";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import {
    useParams,
    useHistory
} from "react-router-dom";
import apiClient from "../config/apiclient";
const { forwardRef, useRef } = React;



function TaskDetail(props) {

    const [taskdata, setTaskdata] = useState([]);
    const [offers, setOffers] = useState([]);
    let { id } = useParams();
    let history = useHistory();


    useEffect(() => {
        if(props.task){
            setTaskdata(props.location.task);
        }

        if(props.location.state){
            setTaskdata(props.location.state.task);
        }
        if(taskdata.length === 0){
            apiClient.get(`/tasks/${id}`)
                .then(res => {
                    console.log(res.data);
                    setTaskdata(res.data);
                })
        }
        apiClient.get(`/bids/?task=${id}`)
            .then(res => {
                setOffers(res.data);
            })

    }, []);


    const OfferList = () => {
        let products = [];
        if(offers.length > 0){
            products = offers.map((offer) =>
                <BidCard offer={offer} />
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
                               <span className='detail-user-value' >Tom T.</span>
                           </div>
                           <div className='detail-user-time'>
                               2 hours ago
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
                       <div className='outer detail-offer'>
                           <span>Offers</span>
                           <div className='detail-offer-list'>
                               {OfferList()}
                           </div>
                       </div>
                   </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}

export default TaskDetail;