import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useRequestService from '../../services/RequestService';

import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = ({inputValue}) => {
    const [charList, setCharList] = useState([]);

    const { getAllCharacters, loading } = useRequestService();

    useEffect(() => {
        getAllCharacters()
            .then(onCharListLoaded);  
    }, []);

    const onCharListLoaded = (charList) => {
        setCharList(charList);
    }

    const renderItems = (arr) => {
        const items = arr.sort(function(charFirst, charSecond) { //Сортує список по імені
            if (charFirst.name > charSecond.name) {
                return 1;
            }
        }).filter(char => { // Реалізує та фільтрує пошук персонажа
            if (char.name.toLowerCase().includes(inputValue.toLowerCase())) {
                return char;
            }
        }).map(char => {    //Відмальовує персонажів
            return (
                <li className="char_list-item" key={char.id}>
                    <Link to={`/character/${char.id}`}>
                        <img src={char.image} alt={char.name} />
                        <div className="char_list-info">
                            <b className='char-name'>{char.name}</b>
                            <p className='char-specie'>{char.specie}</p>
                        </div>
                    </Link>
                </li>
            )
        }).slice(0, 8); //Відмальовує лише перші 8 персонажів

        return (
            <ul className="char_list">
                {items.length ? items : <h2>No such character exists</h2>}
            </ul>
        )
    }

    const items = renderItems(charList);
    const spinner = loading ? <Spinner/> : null
    return (
        <div className="char_list-wrapper">
            {spinner}
            {items}
        </div>
    )
}

export default CharList;