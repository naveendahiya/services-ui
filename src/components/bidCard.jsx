import React from 'react';
import { Card, Button, Divider } from 'semantic-ui-react';
import user from '../images/user.svg';
import '../styles/BidCard.scss';

const BidCard = ()  => {
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
                        Hi, am in braybrook. Can pickup any time of your preference and deliver straight away. Am highly rated rude share driver. Can do this at your convenience.
                    </Card.Description>
                    <Divider />
                    <Button
                        content="Accept"
                        labelPosition='right'
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