import { useState, useEffect, useRef } from "react";
import SearchForm from "./components/SearchForm";
import RepoList from "./components/RepoList";
import { searchRepositories, fetchTrendingRepositories } from "./services/githubApi";


const App = () => {

  /*
    * States * 
    - query
    - repos
    - isLoding 
    - error
    - lastQuery
    - isTrending 
  */
 const [query, setQuery] = useState("");
 const [repos, setRepos] = useState(null);
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState(null);
 const [lastQuery, setLastQuery] = useState("");
 const [isTrending, setIsTrending] = useState(true);

  /*
    * useRef() *
    - for AbortController()
    - Prevents race-fondition when we give .abort() before
      every new request.
  */

  const abortRef = useRef(null);

  /*
    * useEffect() *
    run once when component mounts.
    - [] no dependecy in dependency array means run only once on mount.
  */
 useEffect(() => {
    // Create a controller for this specific request
    const abortController = new AbortController();
    abortRef.current = abortController;

    // Load trending repos on mount 
    const loadTrending = async () => {
      setIsLoading(true);
      setError(null);

      try{
        
        const response = await fetchTrendingRepositories(abortController.signal);
        // set this response to setRepo, and setIsTrending to true
        setRepos(response);
        setIsTrending(true);

      } catch (error) {
        if(error.name === "AbortError" || error.code === "ERR_CANCELED") return;
        setError("Failed to load trendy repos. Check your connection.");
        setRepos([]);
      } finally{
        setIsLoading(false);
      }
    };

    // Invoke the loadTrending() function
    loadTrending(); 


    // Cleanup function
    // calls it when component unmounts
    // cancels fetch so we don't update state on component that doesn't exists
    return () => abortController.abort();
 }, [])


// HandleSearch with the trimmedQuery we get by SerchForm on submit
const handleSearch = async(trimmedQuery) => {
    // cancel race-condition: prev request still in flight
    if(abortRef.current){
      abortRef.current.abort();
    }

    // creting a new controller for new request
    const abortController = new AbortController();
    abortRef.current = abortController;

    // update all states before API calling
    setIsLoading(true);
    setError(null);
    setIsTrending(false);
    setLastQuery(trimmedQuery);

    // Try...Catch for  response
    try{
      const response = await searchRepositories(trimmedQuery, 10, abortController.signal);
      // set the repos with response
      setRepos(response);
    } catch(error){

       if(error.name === "AbortError" || error.code === "ERR_CANCELED") return;

       // HTTP Status Code for friendly error messages
      
        if (error.response?.status === 403) {
          setError("Rate limit hit. Wait a minute then try again.");
        } else if (error.response?.status === 422) {
          setError("Invalid search query. Try different keywords.");
        } else if (!navigator.onLine) {
          setError("You're offline. Check your internet connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }

        // setRepos to empty list
        setRepos([]);
    } finally{
        setIsLoading(false);
    }
};



  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-800">
            GitHub Repo Search
          </h1>
          <p className="text-sm text-gray-500">Search public GitHub repositories</p>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* 
          SearchForm component receives:
            - query input
            - onQueryChange (Setter to update it)
            - onSearch, handle search function
            - isLoading for disabling the button of search
        */}
        <SearchForm
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          isLoading={isLoading}
        />

        {/* RepoList 
          - repos
          - isLoading state
          - error
          - lastQuery
          - isTrending
        */}
        <div className="mt-8">
          <RepoList 
            repos={repos}
            isLoading={isLoading}
            error={error}
            lastQuery={lastQuery}
            isTrending={isTrending}
          />
        </div>
      </main>
    </div>
  )
};

export default App;