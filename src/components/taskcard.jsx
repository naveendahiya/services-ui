import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import '../styles/taskcard.scss';

import calendar from '../images/calendar.svg';
import profile from '../images/user.svg';
import location from '../images/location.svg';

const TaskCard = () => {
    return (
        <>
            <Card className='task-card'>
                <Card.Content>
                    <Card.Description className='task-card-desc'>
                        <div className="title">
                        Need a Vietnamese Person to contact people for me
                        </div>
                        <div className="price">
                        $100
                        </div>
                        <div className="photo">
                          <img src={profile} className='user-profile' />
                        </div>
                        <div className="info">
                            <div className="location">
                                <img src={location} className='location-img' />
                                <div className="text-1">Remote</div>
                            </div>
                            <div className="date">
                                <img src={calendar} className='date-img' />  
                                <div className="text-2">Sat, 5 Sep</div>
                            </div>
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content className='bottom'>
                    <div className="status">OPEN</div>
                    <div className="offer"> -1 offer</div>
                </Card.Content>
            </Card>
        </>
    )
}

export default TaskCard;