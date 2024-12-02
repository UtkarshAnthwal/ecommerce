import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Modal } from "react-bootstrap";
import CustomBtn from "../../CustomButton/CustomBtn";

const PaymentModal = (props) => {
    const {openPaymentModal, setOpenPaymentModal, purchaseHanlder, paymentMode, setPaymentMode} = props;
    return(
        <Modal
            show={openPaymentModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            centered
        >
            <Modal.Header>
                <h3>Payment Method</h3>
                <RxCross2 size={30} onClick={() => setOpenPaymentModal(false)}/>
            </Modal.Header>
            <Modal.Body>
                <select onChange={(e) => {setPaymentMode(e.target.value)}} className="form-select" placeholder="Select Payment Mopde">
                    <option value='online'>Online</option>
                    <option value='cash'>Cash on Dilevery</option>
                </select>
                {paymentMode === 'online' &&
                    <>
                        <label>Name on card</label>
                        <input type="text" className="form-control"/>
                        <label>Card Number</label>
                        <input type="text" className="form-control"/>
                        <label>Expiration month</label>
                        <select className="form-select">
                            <option></option>
                        </select>
                        <label>Expiration year</label>
                        <select className="form-select">
                            <option></option>
                        </select>
                        <label>CVC code</label>
                        <input type="text" className="form-control"/>
                    </>
                }
            </Modal.Body>
            <Modal.Footer>
                <CustomBtn btnName={`Continue`} className={`btn btn-outline-success`} onClick={purchaseHanlder}/>
            </Modal.Footer>
        </Modal>
    );
}
export default PaymentModal;