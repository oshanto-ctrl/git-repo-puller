/* 
    RepoList.jsx

    isLoading => show a loading message
    error => show the error message
    repos === null show nothing (Initial state, before trending 4 repo loads)
    repos.length===0 shows no result found
    repos has items => show the cards

    PROPS received from App:
    -   repos (array=> result from API)
    -   isLoading (boolean => true while fetching)
    -   error (string => error messge or null)
    -   lastQuery (string => last search term used)
    -   isTrending (boolean => true = showing initial trending repositories)
*/

// Import RepoCard component
import RepoCard from "./RepoCard";


const RepoList = ({ repos, isLoading, error, lastQuery, isTrending }) => {
    // Handle Loading State
    if(isLoading){
        return (
            <div>
                <p>Loading....</p>
            </div>
        );
    }

    // Handle Error State
    if(error){
        return (
            <div
            className="border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3 rounded"
            >
                { error }
            </div>
        );
    }

    // Null check and Empty array check for repository query
    if(repos === null){
        return null; // render noting
    }
    
    if(repos.length === 0){
        return(
            <p className="text-sm text-gray-500">
                No results for "{lastQuery}". Try a different keyword.
            </p>
        );
    }


    // Finally: Render the list when we have data and dealed with loading, error, safetynet and checks.
    return (
        <div>
            <p className="text-xs text-gray-400 mb-3">
                {isTrending ? "Trending repositories on github" : `${repos.length} results for "${lastQuery}"`}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {repos.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );

};

export default RepoList;



