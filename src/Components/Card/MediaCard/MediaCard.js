import * as React from 'react';
import './MediaCard.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {Divider} from '@mui/material';
import {ToastContainer} from 'react-toastify';
import ViewModal from '../../Modal/ViewModal/ViewModal';
import {useNavigate} from 'react-router-dom';

const MediaCard = (props) => {
    const {cardData, cartDataKeys} = props;
    console.log(cardData, 'Card Data');
    const [open, setOpen] = React.useState(false);
    const [viewData, setViewData] = React.useState([]);
    const [details, setDetails] = React.useState();
    const navigate = useNavigate();
    const [themeToggler, setThemeToggler] = React.useState(false);
    const labels = ['Name', 'Description', 'Size'];
    const viewvValues = [{label:'', name:'product_name'}, {label:'', name:'product_description'}, {label:'Size', name:'product_size'}, {label:'', name:'product_price'},];
    
    const handleClose = () => setOpen(false);

    const handleOpen = (data) => { // view button
        setViewData(data);
        setDetails(data?.product_brand);
        setOpen(true);
    };

    const detailHandler = async (productDetails) => {
        navigate(`/client/dashboard/details/${productDetails?.product_id}`);
    }

    // const themeHandler = () => {
    //     setThemeToggler(!themeToggler);
    // }

    // const addToCart = async(data) => {
    //     try {
    //         await dispatch(addToCartPostApi(data)).unwrap();
    //         toast.success(cartMsg);
    //     } catch(ex) {
    //         console.log(ex, 'Error');
    //     }
    // }

    const shareHandler = (id, name) => {
        const url = `${window?.location?.origin}/client/dashboard/details/${id}`;
        const title = `Check out this product: ${name}`;
        // Check if Web Share API is supported
        // if (navigator.share) {
        //     navigator.share({
        //         title: title,
        //         url: url
        //     }).then(() => {
        //         console.log('Thanks for sharing!');
        //     }).catch((err) => {
        //         console.error('Error sharing:', err);
        //     });
        // }
        if (navigator.share) {
            navigator.share({
                url: url
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch((err) => {
                console.error('Error sharing:', err);
            });
        }
        //  else {
        //     // Fallback to clipboard method
        //     if (navigator.clipboard) {
        //         navigator.clipboard.writeText(url).then(() => {
        //             alert('Link copied to clipboard');
        //         }).catch((err) => {
        //             console.error('Could not copy text: ', err);
        //         });
        //     } else {
        //         // Fallback for browsers that do not support navigator.clipboard
        //         const textArea = document.createElement('textarea');
        //         textArea.value = url;
        //         document.body.appendChild(textArea);
        //         textArea.focus();
        //         textArea.select();
        //         try {
        //             document.execCommand('copy');
        //             alert('Link copied to clipboard');
        //         } catch (err) {
        //             console.error('Could not copy text: ', err);
        //         }
        //         document.body.removeChild(textArea);
        //     }
        // }
    }
    return (
        <>
            <ViewModal labels={labels} viewvValuesKeys={viewvValues} handleClose={handleClose} open={open} modalData={viewData} heading={details}/>
            <ToastContainer theme='dark'/>
            {/* <button onClick={() => themeHandler()}>Theme</button> */}
            <div className={`row ${themeToggler === true ? 'dark-theme' : ''}`}>
                {cardData?.map((data, index) => (
                    <div className='col-md-3' key={index} >
                        <Card sx={{ maxWidth: 345, bgcolor: `${themeToggler === true ? 'grey' : ''}` }}>
                            {cartDataKeys?.map((keys, index) => (
                                <>
                                    {keys==='product_image' ? <>
                                    <img className='global-image mb-2'
                                    src={data[keys]}
                                    alt='...Image'
                                    />
                                    </>: 
                                    <div key={index}>
                                        <Typography variant="body2">
                                        {keys==='product_price' ? (
                                        <p className='text-start text-styles'><b>₹{data[keys]}</b></p>):(
                                            <p className='text-start text-styles text-ellipsis'>{data[keys]}</p>
                                        )}
                                        </Typography>
                                    </div>
                                }
                                </>
                            ))}
                            <Divider/>
                            <CardActions>
                                <IconButton title='Detail' aria-label="cart" sx={{color: 'black'}} size="small" onClick={() => detailHandler(data)}><InfoIcon/></IconButton>
                                <IconButton title='Quick View' aria-label="view" sx={{color: 'black'}} size="small" onClick={() => handleOpen(data)}><VisibilityIcon/></IconButton>
                                <IconButton title='Share' sx={{color: 'black'}} aria-label="share" size="small" onClick={() => shareHandler(data.product_id, data.product_name)}>
                                    <ShareIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                        <br />
                    </div>
                ))}
            </div>
        </>
    );
}

export default MediaCard;
