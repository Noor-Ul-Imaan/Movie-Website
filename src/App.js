import { useEffect, useState } from 'react';

import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg'; //searchIcon is my own variable i created here and would reference it later in an img tag

const API_URL = 'http://www.omdbapi.com?apikey=6ad05337'



 
const App = () => {
const [movies, setMovies] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`); //The await keyword is used to pause the function execution until the network request completes.It prevents the rest of the function from running until the response is received.
        const data = await response.json(); //After the response is received from the API, this line uses the await keyword again to pause the function while the response data is being parsed as JSON. The .json() method is an asynchronous operation, and await ensures that the code waits for it to complete before proceeding.

        setMovies(data.Search); // console.log(data.Search);Once the JSON parsing is complete, this line logs the Search property of the data object to the console. In the context of the OMDB API, the Search property typically holds an array of movie search results.
    }
    useEffect(
        () => { searchMovies('Spiderman');},
        []
    );

    return (
        <div className="app">
            <h1>MoviesHub</h1>

            <div className="search">
                <input 
                    placeholder="'Superman'" 
                    value={searchTerm}     //When you set the value attribute of an input field to a state variable like searchTerm, you're connecting the input field to that state. Whatever value you type into the input field will automatically update the searchTerm state variable, and vice versa. It's a two-way binding between the input field's value and the state.
                    onChange={ (e) => {setSearchTerm(e.target.value)} }   //e.target.value represents the current value of the input field.
                    //e or event represents the event object that is automatically generated by the browser whenever an event occurs, such as a change in an input field. 
                    //In this setup, whenever the user types or deletes something in the input field, the onChange event is triggered, and the searchTerm state is updated to hold the current value of the input.                
                /> 
                <img 
                    src={SearchIcon} 
                    alt="search" 
                    onClick={ () => {searchMovies(searchTerm)} }  
                />
            </div>


            {
                movies?.length>0 ? 
                    (
                        <div className="container">
                            {
                                movies.map((movie) => (
                                    <MovieCard movie={movie}/>
                                    )
                                )
                            }
                        </div>                        
                    ) : (
                        <div className="empty">
                            <h2>No movies found</h2> 
                        </div>                  
                    )
            }

        </div>

    );
}

export default App;








