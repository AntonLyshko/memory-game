import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Card from './comp/Card'
import $ from 'jquery';



const Game = () => {

    const [state, setState] = useState({
        cards: [],
        imgs: importAll(),
        currentId: '',
        currentCard: '',
        score: 0
    });

    let guess = '';

    function importAll() {
        let r = require.context('../../image/icons', false, /\.(png|jpe?g|svg)$/)
        return r.keys().map(r);
    }

    useEffect(() => {
        if (!state.cards.length) generateCards()
    }, []);

    const shuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const generateCards = async () => {
        console.log('Генерация')
        function Card(id, img) {
            this.id = id;
            this.img = img;
        }
        let cardsContainer = [];
        for (let i = 0; i < 18; i++) {
            let card = new Card(i, state.imgs[i].default);
            cardsContainer.push(card);
        }
        cardsContainer = [...cardsContainer, ...cardsContainer];
        cardsContainer = await shuffle(cardsContainer);
        setState({ ...state, cards: cardsContainer });
    }

    const handleClick = (e, id) => {
        if (guess === '') {
            $('.card-item').removeClass('picked');
            guess = id
        } else {
            if (guess === id) {
                if (!$(e.target).hasClass("picked")) {
                    $(`.card-item[data-id=${id}]`).each(function (i, el) {
                        $(el).addClass('matched')
                    });
                    guess = ''
                    $('.card-item').removeClass('picked');
                    alert('Merry christmas! 🎄')
                }
            } else {
                guess = ''
            }
        }
        $(e.target).addClass('picked');
    }

    const renderCards = () => {
        return state.cards.map(card => {
            return (
                <Col key={Math.random()} xs={2}>
                    <Card id={card.id} img={card.img} handleClick={handleClick} />
                </Col>
            )
        })
    }

    return (
        <div className="game-container">
            <Container>
                <Row>
                    <>
                        {state.cards.length ? (
                            <>
                                {renderCards()}
                            </>
                        ) : (
                                <>Loading...</>
                            )}
                    </>
                </Row>
            </Container>
        </div >
    );
}

export default Game;
