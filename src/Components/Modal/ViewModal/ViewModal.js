import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Modal} from 'react-bootstrap';
import {IoCloseCircleOutline} from "react-icons/io5";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
};

const ViewModal = (props) => {
    const {handleClose, open, modalData, heading} = props;
    console.log(modalData, 'Modal');
    return (
        <>
            {/* <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                variant="soft"
            >
                    <Box sx={style}>
                        <div className='row'>
                            <div className='col-md-4'></div>
                            <div className='col-md-4'>
                                <Typography className='text-center mb-2 fs-4'>{heading}</Typography>
                            </div>
                            <div className='col-md-4 text-end'>
                                <IoCloseCircleOutline style={{cursor: 'pointer'}} onClick={handleClose} size={30}/>
                            </div>
                        </div>
                        <Divider className='mb-2'/>
                        <div className='row'>
                            <div className='col-md-2'>
                                <img src={modalData?.product_image} width={150} height={150}/>
                            </div>
                            <div className='col-md-2'>
                            </div>
                            <div className='col-md-8'>
                                <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">{modalData?.product_description}</Typography>
                                <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">Color : {modalData?.product_color}</Typography>
                                {modalData?.product_category === 'Clothes' && (
                                    <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">Size : {modalData?.product_size}</Typography>
                                )}
                                {modalData?.product_category === 'Electronics' && (
                                        <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">{modalData?.product_ram} RAM {modalData?.product_internal_memory}</Typography>
                                )}
                                <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2"><b>₹{modalData?.product_price}</b></Typography>
                            </div>
                        </div> 
                    </Box>
            </Modal> */}
            <Modal
                show={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                centered
            >
            <Modal.Header>
                <Typography className='text-center fs-4'>{heading}</Typography>
                <IoCloseCircleOutline style={{cursor: 'pointer'}} onClick={handleClose} size={30}/>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-md-2'>
                        <img src={modalData?.product_image} width={150} height={150}/>
                    </div>
                    <div className='col-md-2'>
                    </div>
                    <div className='col-md-8'>
                        <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">{modalData?.product_description}</Typography>
                        <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">Color : {modalData?.product_color}</Typography>
                        {modalData?.product_category === 'Clothes' && (
                            <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">Size : {modalData?.product_size}</Typography>
                        )}
                        {modalData?.product_category === 'Electronics' && (
                                <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2">{modalData?.product_ram} RAM <br/>{modalData?.product_internal_memory} Internal Memory</Typography>
                        )}
                        <Typography id="modal-modal-title" className="pb-2" variant="body1" component="h2"><b>₹{modalData?.product_price}</b></Typography>
                    </div>
                </div> 
            </Modal.Body>
            <Modal.Footer>
                {/* <CustomBtn btnName={`Details`} className={`btn btn-outline-dark`}/>
                <CustomBtn btnName={`Cancel`} className={`btn btn-outline-dark`} onClick={handleClose}/> */}
            </Modal.Footer>
            </Modal>
        </>
    );
}
export default ViewModal;
