import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import profile from '../images/user.svg';
import location from '../images/location.svg';
import calendar from '../images/calendar.svg';
import '../styles/taskDetail.scss';
import { Divider } from 'semantic-ui-react'


export default function TaskDetail() {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" style={{ backgroundColor: 'white', height: '100%', marginTop: '60px', paddingTop: '10px'  }} >
                   <div className='task-detail' >
                       <div className='outer detail-status-button'>
                           <div className='detail-status'>
                               OPEN
                           </div>
                           <div className='detail-follow'>
                               Follow
                           </div>
                       </div>
                       <div className='outer detail-heading'>
                           Installation of boat accessories
                       </div>
                       <div className='outer detail-user'>
                           <div className='detail-user-image'>
                               <img src={profile} className='detail-user-img' />
                           </div>
                           <div className='detail-user-name'>
                               <spam>POSTED BY</spam><br></br>
                               <span>Tom T.</span>
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
                               <spam>LOCATION</spam>
                               <span>
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
                              <span>DUE DATE</span>
                               <span>Tuesday, 1st Sep 2020</span>
                           </div>
                       </div>
                       <Divider />
                       <div className='outer offer-box'>
                           <span>TASK BUDGET</span>
                           <span>$100</span>
                           <div className='make-offer' >Make an offer</div>
                       </div>
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
                               NO offers yet
                           </div>
                       </div>
                   </div>
                </Typography>
            </Container>
        </React.Fragment>
    );
}