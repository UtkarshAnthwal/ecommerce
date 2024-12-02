import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { CssTransition } from '@mui/base/Transitions';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { useSelector, useDispatch } from 'react-redux';
import { addToCartDataValue, addToCartGetApi } from '../../Redux/Reducer/Slices/addToCartSlice';
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../Router/config';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

const drawerWidth = 240;
const navItems = ['Home', 'About', 'Contact'];

const options = [
    {
        dropdownName: 'Clothes',
        items: [
            { name: 'Clothes', route: Routes.ClothesDashboard },
            { name: 'Mens Wear', route: '#' },
            { name: 'Womens Wear', route: '#' },
        ],
    },
    {
        dropdownName: 'Electronics',
        items: [
            { name: 'Electronics', route: Routes.ElectronicsDashboard },
            { name: 'Mobile', route: '#' },
            { name: 'Laptop', route: '#' },
        ],
    },
    {
        dropdownName: 'Grocery',
        items: [
            { name: 'Vegetables', route: '#' },
            { name: 'Fruits', route: '#' },
        ],
    },
    {
        dropdownName: 'Toys',
        items: [
            { name: 'Infants', route: '#' },
            { name: 'Kids', route: '#' },
        ],
    },
    {
        dropdownName: 'Perfume',
        items: [
            { name: 'Costly', route: '#' },
            { name: 'Affordable', route: '#' },
        ],
    },
];
// console.log(options, 'Navbar');

const Navbar = (props) => {
    const { window } = props;
    const [themeToggler, setThemeToggler] = React.useState(false);
    // console.log(themeToggler, 'Theme');
    const [cartLength, setCartLength] = React.useState();
    console.log(cartLength, 'cartLength');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = JSON.parse(localStorage.getItem('client_name'));
    const cart = useSelector(addToCartDataValue);
    console.log(cart, '#$%^&*(P');

    const themeHandler = () => {
        setThemeToggler(!themeToggler);
    }

    const personalDetailsHandler = () => {
        navigate(Routes.ClientDetails);
    }

    const logoutHandler = () => {
        localStorage.clear();
        navigate(Routes.Login);
    }

    const favouritesHandler = () => {
        navigate(Routes.WishlistDashboard);
    }

    const cartLengthHandler = async () => {
        try {
            await dispatch(addToCartGetApi({user_name: userName})).unwrap();
            setCartLength(cart?.length); 
        } catch (ex) {
            console.error(ex);
        }
    }

    const addToCartHandler = () => {
        navigate(Routes.AddToCartDashboard);
    }

    React.useEffect(() => {
        cartLengthHandler();
    }, [cart?.length > 0])

    const createHandleMenuClick = (menuItem) => {
        return () => {
            navigate(menuItem);
        };
    };

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <p onClick={createHandleMenuClick(Routes.AllProductDashboard)}>ScoobyZone</p>
            </Typography>
            <Divider />
            <List>
                {navItems?.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center', color: 'white'}}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" sx={{ bgcolor: 'rgb(8,8,9,2)', color: 'white' }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        <p onClick={createHandleMenuClick(Routes.AllProductDashboard)} className='mt-3'>ScoobyZone</p>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
                        {navItems?.map((item) => (
                            <Button key={item} sx={{ color: 'white' }}>
                                {item}
                            </Button>
                        ))}
                        {options?.map((option, index) => (
                            <Dropdown key={index}>
                                <MenuButton sx={{border: '2px solid rgb(8,8,9,2)', fontStyle: 'none', bgcolor: 'rgb(8,8,9,2)', color: 'white'}}>{option?.dropdownName}</MenuButton>
                                <Menu slots={{ listbox: AnimatedListbox }}>
                                    {option?.items?.map((item, index) => (
                                        <MenuItem key={index} onClick={createHandleMenuClick(item?.route)}>
                                            {item?.name}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Dropdown>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <IconButton color="inherit" aria-label="add to shopping cart">
                            <DarkModeTwoToneIcon onClick={themeHandler} />
                        </IconButton>
                        <IconButton color="inherit" aria-label="add to shopping cart">
                            <SearchIcon />
                        </IconButton>
                        <IconButton title={`Profile ${userName}`} color='inherit' aria-label='add to shopping cart'>
                            <AccountCircleIcon onClick={personalDetailsHandler}/>
                        </IconButton>
                        <IconButton aria-label='cart' color='inherit' title='Cart'>
                            <StyledBadge badgeContent={cartLength} color="secondary">
                            <ShoppingCartIcon onClick={() => addToCartHandler()} />
                            </StyledBadge>
                        </IconButton>
                        <IconButton aria-label='purchase-history' color='inherit' title='Purchase History'>
                            <ManageHistoryIcon onClick={() => navigate(Routes.ConfirmPurhaseDashboard)} />
                        </IconButton>
                        <IconButton title='Favourites' color='inherit'>
                            <FavoriteIcon onClick={() => favouritesHandler()}/>
                        </IconButton>
                        <IconButton title='Log Out' color='inherit'>
                            <LogoutIcon onClick={() => logoutHandler()}/>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 0 }}>
                <Toolbar />
            </Box>
        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
  z-index: 1;

  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `,
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
    const { ownerState, ...other } = props;
    const popupContext = React.useContext(PopupContext);

    if (popupContext == null) {
        throw new Error(
            'The `AnimatedListbox` component cannot be rendered outside a `Popup` component',
        );
    }

    const verticalPlacement = popupContext.placement.split('-')[0];

    return (
        <CssTransition
            className={`placement-${verticalPlacement}`}
            enterClassName="open"
            exitClassName="closed"
        >
            <Listbox {...other} ref={ref} />
        </CssTransition>
    );
});

AnimatedListbox.propTypes = {
    ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    border-bottom: none;
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  }

  &.${menuItemClasses.disabled} {
    color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }
  `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  padding: 8px 16px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

//   &:hover {
//     background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
//     border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
//   }

//   &:active {
//     background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
//   }

//   &:focus-visible {
//     box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
//     outline: none;
//   }
  `,
);