import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    conatiner: {
        padding: '0 5%',
        width: '100%',
        margin: 0,
    },
    card: {
        width: '100%',
        height: '45vh',
        borderRadius: 10,
        padding: '10%',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
    infoCard: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    }
});