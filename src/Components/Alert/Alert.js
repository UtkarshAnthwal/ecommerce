import React from "react";
import { Modal } from "react-bootstrap";
import CustomBtn from "../CustomButton/CustomBtn";

const Alert = (props) => {
    const {alertBodyMessage, alertHeaderMessage, alertHanlder, openAlert, setOpenAlert} = props;
    return(
        <>
            <Modal
                show={openAlert}
                centered
            >
                <Modal.Header>
                    <h4>{alertHeaderMessage}</h4>
                </Modal.Header>
                <Modal.Body>
                    {alertBodyMessage}
                </Modal.Body>
                <Modal.Footer>
                    <CustomBtn btnName={`Yes`} className={`btn btn-outline-primary`} onClick={alertHanlder}/>
                    <CustomBtn btnName={`No`} className={`btn btn-outline-primary`} onClick={() => setOpenAlert(false)}/>
                </Modal.Footer>
            </Modal>  
        </>
    );
}
export default Alert;