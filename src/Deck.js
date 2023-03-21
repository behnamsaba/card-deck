import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from './Card'
import './Deck.css';


const Deck = () => {
    const [clicked, setClicked] = useState(false);
    const [cards,setCards] = useState([]);
    const deckId = useRef();

    useEffect(() => {
        const getId = async () => {
            const id = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            deckId.current = id.data.deck_id;
        }
        getId();
    },[]);



    // async function getCard() {
    //     try{
    //         const dataSa = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
    //         if(dataSa.data.success === true){
    //             setCards(() => [...cards,dataSa.data.cards[0].image]);
    //         }else{
    //             alert("Error: no cards remaining!")
    //         }

    //     }catch(err){
    //         console.log(err);
    //     }
    // }

    useEffect(() => {
        let intervalId;
        async function getCard() {
            try{
                const dataSa = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId.current}/draw/?count=1`);
                if(dataSa.data.success === true){
                    setCards(() => [...cards,dataSa.data.cards[0].image]);
                }else{
                    alert("Error: no cards remaining!")
                }
    
            }catch(err){
                console.log(err);
            }
        }

        if(clicked){
            intervalId = setInterval(() => {
                getCard()
            },1000);
        }
        return () => clearInterval(intervalId)

    },[clicked,cards]);




    const handleClick = (e) => {
        e.preventDefault();
        setClicked((clicked) => !clicked);

    }



    return(
        <div className="Deck">
            <button className="Deck-btn" onClick={handleClick}>{clicked ? "Stop" : "Start"}</button>
            {cards.map((card,id) => < Card key={id} img={card}/>)}
        </div>
    )
    
}

export default Deck;
