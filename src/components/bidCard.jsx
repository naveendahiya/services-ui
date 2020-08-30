import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import user from '../images/user.svg';
import '../styles/BidCard.scss';

const BidCard = ()  => {
    return(
        <>
            <Card className='bid-card'>
                <Card.Content>
                    <Card.Header>
                        <span>Sahith.B</span>
                        <img src={user} className='user-pic-bid' />
                    </Card.Header>
                    <Card.Description>
                        Hi, am in braybrook. Can pickup any time of your preference and deliver straight away. Am highly rated rude share driver. Can do this at your convenience.                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button
                        content="Accept"
                        labelPosition='right'
                        icon='checkmark'
                        positive
                    />
                </Card.Content>
            </Card>
        </>
    )
}

export default  BidCard;