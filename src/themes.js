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
};
