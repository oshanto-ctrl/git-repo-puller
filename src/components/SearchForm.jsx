/*
SearchForm is Search input + Button

Porperties (PROPS):
    - query (string: input value)
    - onQueryChange (function: when input changes)
    - onSearch (function: when form submitted)
    - isLoading (boolean: disables button while fetching data)
*/

import { useRef, useEffect } from "react";

const SearchForm = ({ query, onQueryChange, onSearch, isLoading }) => {
    // useRef() 
    const inputRef = useRef(null);

    // useRef() autofocus of input when mounts.
    // .focus() moves the cursor into input field
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // handleSubmit - function when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault(); // stops reloading whole page (HTML default behavior)
        const trimmedQuery = query.trim(); // remove trailing/leading spaces
        if(!trimmedQuery) return; // No activity of search query if it's empty
        // pass the trimmedQuery to onSearch function -> to App
        onSearch(trimmedQuery);
    };


    /* UI COMPONENT
        Form, Input, Submit Button
    
    */
    return (
        <form 
            onSubmit={handleSubmit}
            className="flex gap-2"
        > 

        <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search repositories..."
            disabled={isLoading}
            className="flex-1 border border-gray-400 rounded px-3 py-2
            text-sm focus:outline-none focus:border-blue-500"

        />

        <button
            type="submit"
            disabled = {isLoading || !query.trim()} // disbaled when query empty/whitespaces or when loading is active
            className="bg-slate-600 text-white text-sm px-4 px-2 rounded
            hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
        >
            {isLoading ? "Searching..." : "Search"}
        </button>



        </form>
    );

};

export default SearchForm;