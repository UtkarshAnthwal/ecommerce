import React from "react";

const Footer = () => {
    const date = new Date();
    const year=date.getFullYear();
    // console.log(year, 'Year');
    return(
        <>
         <div className='row bg-dark' style={{height: 50}}>
            <div className='col-md-4 text-start text-light ps-4 pt-3'>Company Policy | FAQs</div>
            <div className='col-md-4 text-center text-light pt-3'>Copyright @ {year} ScoobyZone.All Rights Reserved</div>
            <div className='col-md-4 text-end text-light pt-3'></div>
         </div>
        </>
    );
}
export default Footer;