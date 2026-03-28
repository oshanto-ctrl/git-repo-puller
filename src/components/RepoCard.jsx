/* 
    RepoCard.jsx - Single Repository Information Card
    It receives a prop called 'repo' and checks and return the UI component card.
    
    - repo (object) -> one repository object form GitHub's API
        Shape: {
            id, full_name, description,
            html_url, stargazers_count, forks_count,
            language, updated_at
        }
*/

// Utility function converts 12345 to 12.3k for cleaner display
const formatCount = (num) => {
    if(num >= 1000 ) return (num / 1000).toFixed(1) + "k";
    return String(num);
}

// REPO CARD component
const RepoCard = ({ repo }) => {
    return(
        <a 
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-slate-200 rounded p-4
            hover:border-blue-400 hover:bg-gray-50"
        >

            {/* Repo name: owner/reponame */}
            <p className="text-blue-500 font-medium text-sm">{repo.full_name}</p>

            {/* Description */}
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">
                {repo.description || "No description."}
            </p>

            {/* Stats [stars, forks, language] */}
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <span>⭐{formatCount(repo.stargazers_count)}</span>

                <span>🍴 {formatCount(repo.forks_count)}</span>

                {/* Only render language if the API returned one */}
                {repo.language && <span>💻 {repo.language}</span>}
                    
            </div>

        </a>
    );
};

export default RepoCard;