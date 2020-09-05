import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import '../styles/taskcard.scss';

import calendar from '../images/calendar.svg';
import profile from '../images/user.svg';
import location from '../images/location.svg';
import { Link } from "react-router-dom";


const TaskCard = (props) => {
    return (
        <>
            <Link to={{
                pathname: `/app/tasks/${props.task.title}`,
                task: props.task
            }}>
            <Card className='task-card'>
                <Card.Content>
                    <Card.Description className='task-card-desc'>
                        <div className="title">
                            {props.task.title}
                        </div>
                        <div className="price">
                        ${props.task.price}
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
                                <div className="text-2">{props.task.due_date}</div>
                            </div>
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content className='bottom'>
                    <div className="status">OPEN</div>
                    <div className="offer"> -1 offer</div>
                </Card.Content>
            </Card>
            </Link>
        </>
    )
}

export default TaskCard;