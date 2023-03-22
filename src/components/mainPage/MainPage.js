import { useState, useEffect } from 'react';

import CharList from '../../components/charList/CharList';


import mainImg from '../../assets/main-page-img.png';
import search from '../../assets/search.svg';

import './mainPage.scss';

const MainPage = () => {
    const [inputValue, setInputValue] = useState('');
    window.localStorage.setItem('inputValue', inputValue);
    useEffect(() => {
        setInputValue(window.localStorage.getItem('inputValue'));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('inputValue', inputValue);
    }, [inputValue]);
    

    return (
        <>
            <img className="main-img" src={mainImg} alt="Main img"/>
            <div className="search-char">
                <img src={search} width={17} height={17} alt="Search character" />
                <input type="search" 
                    placeholder="Filter by name..." 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)}
                    />
            </div>
            <CharList inputValue={inputValue}/>
        </>
    )
}

export default MainPage;