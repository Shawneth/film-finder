import React, {ReactElement, useEffect, useState} from 'react'
import FilmCard from './FilmCard';

export default function App(): ReactElement {
    const [resultSet, setResultSet] = useState<any>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [maxPageCount, setMaxPageCount] = useState<number>(1);
    const [inputBoxText, setInputBoxText] = useState('');
    const [currentTask, setCurrentTask] = useState();
    const [bigSearch, setBigSearch] = useState('big-search');

    useEffect(() => {
        if(inputBoxText.length > 0){
            clearTimeout(currentTask);
            const newTimeout = setTimeout(() => {
                    queryServer(inputBoxText);
                    setBigSearch('');
            }, 250);
            setCurrentTask(newTimeout);
        }
        else if(currentTask)
            clearTimeout(currentTask);
        
        setResultSet([]);
        setMaxPageCount(1);
        setPageNumber(1);
    }, [inputBoxText]);

    function queryServer(input: string, page: number = 1) {
        fetch('/converter', 
        {
            method: 'POST',
            body: JSON.stringify({input, pageNumber: page}),
            headers: {'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(jsonResponse => {
            const results = jsonResponse.results;
            setResultSet(results);
            setMaxPageCount(parseInt(jsonResponse.total_pages));
        });
    }

    function handleTextChange(event) {
        const text: string = event.target.value;
        setInputBoxText(text);
    }

    function handlePageChange(pageChangeNumber: number) {
        if(pageChangeNumber < 1 || pageChangeNumber > 1000 || pageChangeNumber > maxPageCount){
            return;
        }
        else {
            setPageNumber(pageChangeNumber);
            queryServer(inputBoxText, pageChangeNumber);
        }
    }

    return (
        <div>
            <div className="search-app">
                <div className={`search ${bigSearch}`}>
                    <h1>Film Search</h1>
                    <input onInput={handleTextChange}></input>
                </div>
                <ul>
                    {resultSet.map((filmData) => (
                        <FilmCard {...filmData} key={filmData.id}/>
                    ))}
                </ul>
            </div>
            {maxPageCount > 1 && <div className="nav-buttons">
                <a href="#" onClick={() => handlePageChange(pageNumber - 1)}>Back</a>
                <h4>{pageNumber}</h4>
                <a href="#" onClick={() => handlePageChange(pageNumber + 1)}>Next</a>
            </div>}
        </div>
    )
}