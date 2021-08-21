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
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: "22px",
    borderColor: "white",
    color: 'white',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  top: {
    background: 'white',
    border: "5px",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button:{
    margin: 15,
    marginTop: 40
  },
  pos: {
    marginBottom: 12,
  },
});

const BASE_URL = 'https://restcountries.eu/rest/v2/all?fields=name;capital;region;population';

export default function ListCountries(){
    const classes = useStyles();
    const [countries, setCountries] = useState(null);
    const [allCountries, setAllCountries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    const getCountires = async () => {
        const respCountries = await axios.get(`${BASE_URL}`)
        let countryList = respCountries.data
        setCountries(countryList);
        setAllCountries(countryList);
        setLoading(false);
    }

      useEffect(() => {
        console.log("inside useffect");
          setLoading(true);
          getCountires();
      }, []);

      const filterBy = (region) => {
        if(region === ""){
          setCountries(allCountries);
        } else {
          let filterTerm = region;
          console.log("whats filterTerm", filterTerm)
          setCountries(allCountries.filter(country => country.region === filterTerm));
        }
      }


      if (countries === null){
        console.log("countries is null so im not rendering")
          return null;
      } 
      console.log(countries)
    return (
        <div>
            <div className = {classes.top}>
            <Button className = {classes.button} variant="contained" value="Asia" onClick={(e)=> filterBy("Asia")}>Asia</Button>
            <Button className = {classes.button} variant="contained" value="Africa" onClick={(e)=> filterBy("Africa")}>Africa</Button>
            <Button className = {classes.button} variant="contained" value="Europe" onClick={(e)=> filterBy("Europe")}>Europe</Button>
            <Button className = {classes.button} variant="contained" value="Oceania" onClick={(e)=> filterBy("Oceania")}>Oceania</Button>
            <Button className = {classes.button} variant="contained" value="Americas" onClick={(e)=> filterBy("Americas")}>Americas</Button>
            <Button className = {classes.button} variant="contained" onClick={(e)=> filterBy("Polar")}>Polar</Button>
            <Button className = {classes.button} variant="contained" onClick={(e)=> filterBy("")}>Reset</Button>
            </div>
            <div className = {classes.root}>
            {countries.map((item, index) => (
                <Card className={classes.root}>
                <CardContent>
                  <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {item.region}
                  </Typography>
                  <Typography variant="h5" component="h2">
                  {item.name}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {item.capital}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Population: {item.population}
                    <br />
                  </Typography>
                </CardContent>
              </Card>
            ))}

            </div>
                
        </div>
    );

}