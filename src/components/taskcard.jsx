import React from 'react';
import { Card, Icon } from 'semantic-ui-react'
import '../styles/taskcard.scss';


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

                        </div>
                        <div className="info">
                            
                        </div>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                </Card.Content>
            </Card>
        </>
    )
}

export default TaskCard;