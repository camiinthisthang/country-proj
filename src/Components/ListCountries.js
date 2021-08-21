import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const BASE_URL = 'https://restcountries.eu/rest/v2/all';

export default function ListCountries(){
    const classes = useStyles();
    const [countries, setCountries] = useState(null);
    const [loading, setLoading] = useState(true)

    const getCountires = async () => {
        console.log("function is getting callsed");
        const respCountries = await axios.get(`${BASE_URL}`)
        console.log("response", respCountries);
        setLoading(false);
    }

      useEffect(() => {
        console.log("inside useffect");
          setLoading(true);
          getCountires();

      }, []);

    //   if (countries === null){
    //       return null;
    //   }
    return (
        <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          Blha blha blha
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    );

}