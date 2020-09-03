import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import profile from '../images/user.svg';
import location from '../images/location.svg';
import calendar from '../images/calendar.svg';
import '../styles/taskDetail.scss';
import {Button, Card, Divider, Label} from 'semantic-ui-react'
import BidCard from "./bidCard";
import user from "../images/user.svg";
import BidForm from "./bidForm";
const { forwardRef, useRef } = React;



export default function TaskDetail(props) {
    const childRef = useRef();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: '100%', marginTop: '56px', paddingTop: '10px', position: 'relative'  }} >
                    <BidForm ref={childRef} />
                    <div className='status-bar'></div>
                    <div className='task-detail' >
                       <div className='outer detail-heading'>
                           Installation of boat accessories
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
                                   <span className='offer-price' >$100</span>
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
                               I currently have a domain name with Gandi, I'm looking to change it and would like advice of who to change to or whether to just remain with Gandi.  I need at least 3 emails to be associated with the domain name.  I also want someone to do a simple but professional looking website for me, I'll provide text and some images.  The website will only be for people to find out more information from so no need to be easily found in searches other than by searching for the business name or website address.  I want the website to be easy for me to edit once set up and not wanting to pay for a subscription service like wix.  I have heard bootstrap may be good??  I would also want someone who could give me a bit of support initially on how to edit the website once it's set up.  Thanks. Also require receipt with ABN. Not sure if it matters but I have the pre 2012 free version of gsuite.
                           </div>
                       </div>
                       <Divider />
                       <div className='outer detail-offer'>
                           <span>Offers</span>
                           <div className='detail-offer-list'>
                             <BidCard />
                           </div>
                       </div>
                   </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}