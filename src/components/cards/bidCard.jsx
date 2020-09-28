import React from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import user from '../../images/user.svg';
import '../../styles/BidCard.scss';

const BidCard = (props)  => {
    return(
        <>
            <Card className='bid-card'>
                <Card.Content>
                    <Card.Header>
                        <div className='bid-user-infp'>
                            <span className='bid-user-name'>Sahith.B</span><br></br>
                            <span className='bid-user-date'>2 min ago</span>
                        </div>
                        <div className='bid-user-profile'>
                            <img src={user} className='user-pic-bid' />
                        </div>
                    </Card.Header>
                    <Card.Description>
                      {props.offer.comment}
                    </Card.Description>
                    <Divider />
                    <Button
                        style={{display: props.taskuser == parseInt(sessionStorage.getItem('user_id')) ? 'block' : 'none'}}
                        content="Accept"
                        labelPosition='right'
                        onClick = {() => props.accept()}
                        icon='checkmark'
                        positive
                        className='accept-button'
                    />
                </Card.Content>
            </Card>
        </>
    )
}

export default  BidCard;