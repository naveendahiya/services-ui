import React from 'react'
import {Button, Card, Modal, Form ,TextArea} from 'semantic-ui-react';
import '../styles/bidForm.scss';
import user from "../images/user.svg";
const { forwardRef,  useImperativeHandle } = React;

const BidForm = forwardRef((props, ref) =>  {
    const [open, setOpen] = React.useState(false)

    useImperativeHandle(ref, () => ({
        onOpen(){
            setOpen(true);
        }
    }));

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
        >
            <Modal.Header className='bid-form-heading' >Make a offer</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form>
                        <Card className='input-price' >
                            <Card.Content>
                                <div className='price-label' >Price</div>
                                <Card.Description>
                                    <Form.Field  placeholder='500' control='input' type='number'  />
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <Card className='input-desc' >
                            <Card.Content>
                                <div className='description-label' >Description</div>
                                <Card.Description>
                                    <Form.Field
                                        control={TextArea}
                                        placeholder='Write brief summary on how you will perform the task.'
                                    />
                                </Card.Description>
                            </Card.Content>
                        </Card>
                        <div className='form-controls'>
                            <Button
                                content="Nope"
                                positive
                                className='nope-button'
                                onClick={() => setOpen(false)}
                            />
                            <Button
                                content="Submit"
                                labelPosition='right'
                                icon='checkmark'
                                positive
                                className='submit-button'
                            />
                        </div>
                    </Form>

                </Modal.Description>
            </Modal.Content>
        </Modal>
    )
})

export default BidForm;