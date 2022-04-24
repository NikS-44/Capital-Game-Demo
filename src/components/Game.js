import React, {useState} from 'react';
import {COUNTRIES} from "./Countries";
import {Button, Form} from "react-bootstrap";
import './Game.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Game(props) {
    const [countriesList, setCountriesList] = useState([...COUNTRIES])
    const [enteredCapital, setEnteredCapital] = useState('');
    const [currentCapitalIndex, setCurrentCapitalIndex] =useState(getRandomInt(countriesList.length));
    const [placeHolderText, setPlaceHolderText] = useState('');
    const [guessCounter, setGuessCounter] = useState(3)
    const enteredCapitalChangeHandler = (event)=> {
        setEnteredCapital(event.target.value);
    };

    const submitHandler = (event)=> {
        event.preventDefault();
        if(enteredCapital.toLowerCase()===countriesList[currentCapitalIndex].capital.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
            setPlaceHolderText('Nice Work!')
            setEnteredCapital('');
            nextCountry();
        } else {
            if(guessCounter>1){
                console.log(countriesList[currentCapitalIndex].capital.toLowerCase())
                setEnteredCapital('');
                const guessesLeft = guessCounter-1
                setGuessCounter(guessesLeft);
                setPlaceHolderText(`Try Again :(, you have ${guessesLeft} guess(es) left`)
            } else {
                setEnteredCapital('');
                setPlaceHolderText('Sorry, no more guesses left, the capital of '+ countriesList[currentCapitalIndex].name+ ' is ' + countriesList[currentCapitalIndex].capital)
                setGuessCounter(3);
                nextCountry();
            }

        }
    };

    const removeCountryFromList = ()=>{
        setCountriesList(oldList=>oldList.filter(country=>country.name!==countriesList[currentCapitalIndex].name))
    }

    const nextCountry = ()=>{
        removeCountryFromList();
        setCurrentCapitalIndex(getRandomInt(countriesList.length));
    }

    const nextCountrySkip = ()=>{
        removeCountryFromList();
        setCurrentCapitalIndex(getRandomInt(countriesList.length));
        setPlaceHolderText('The capital of '+ countriesList[currentCapitalIndex].name+ ' is ' + countriesList[currentCapitalIndex].capital)
    }

    return (
        <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 input-field" controlId="formBasicText">
                <Form.Label>What is the capital of {countriesList[currentCapitalIndex].name} </Form.Label>
                <Form.Control type="text" placeholder='Enter guess' value={enteredCapital} onChange={enteredCapitalChangeHandler}/>
                <Form.Text className="text-muted">{placeHolderText}</Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className="me-2">
                Submit
            </Button>
            {' '}
            <Button variant="danger" onClick={nextCountrySkip}>
                &nbsp;&nbsp;Skip&nbsp;&nbsp;
            </Button>
        </Form>
    );
}

export default Game;