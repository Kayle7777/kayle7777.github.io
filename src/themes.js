import { createMuiTheme } from '@material-ui/core/styles';

export default {
    default: createMuiTheme({
        palette: {
            type: 'dark',
        },
        typography: {
            useNextVariants: true,
        },
    }),
    ember: createMuiTheme({
        palette: {
            primary: {
                light: '#faf4f1',
                main: '#e04e39',
                dark: '#9b2918',
                contrastText: '#fff',
            },
            background: {
                default: '#faf4f1',
            },
        },
        typography: {
            useNextVariants: true,
        },
    }),
    react: createMuiTheme({
        palette: {
            primary: {
                light: '#33373f',
                main: '#282c34',
                dark: '#20232a',
            },
            secondary: {
                main: '#61dafb',
            },
        },
        typography: {
            useNextVariants: true,
        },
    }),
};

// React
//   Primary Dark: #20232a
//   Primary: #282c34
//   Primary Light: #33373f
//   Secondary: #61dafb
