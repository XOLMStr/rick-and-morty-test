import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useRequestService from '../../services/RequestService';

import arrowBack from '../../assets/arrow_back.svg';

import './singleCharPage.scss';

const SingleCharPage = () => {
    const {id} = useParams();
    const [data, setData] = useState([]);
    const {getCharacter} = useRequestService();

    useEffect(() => {
        getCharacter(id)
            .then(onDataLoaded);
    }, [id])

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <div className='single-page'>
            <Link to='/' className='single-page_back'>
                <img src={arrowBack} alt='Back button'/>
                <span>Go back</span>
            </Link>

            <div className="single-page_wrapper">
                <div className='single-page_title'>
                    <img src={data.image} alt={data.name} />
                    <h2 className="single-page_char-name">{data.name}</h2>
                </div>
                <div className='single-page_info'>
                    <h5>Information</h5>
                    <ul className="single-page_list">
                        <li className="single-page_list-item">
                            <b>Gender</b>
                            <span>{data.gender}</span>
                        </li>
                        <li className="single-page_list-item">
                            <b>Status</b>
                            <span>{data.status}</span>
                        </li>
                        <li className="single-page_list-item">
                            <b>Specie</b>
                            <span>{data.specie}</span>
                        </li>
                        <li className="single-page_list-item">
                            <b>Origin</b>
                            <span>{data.origin}</span>
                        </li>
                        <li className="single-page_list-item">
                            <b>Type</b>
                            <span>{data.type}</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default SingleCharPage;