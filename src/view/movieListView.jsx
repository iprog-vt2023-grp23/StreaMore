const movieListView = (props) => {
    //const content = props.movieList.map(result => <RenderMovie key={result.imdbId} result={result} />);

    const addToListButton = () => {
        props.onAddToList();
    }

    return(
        <div>
            {/*Stylas i SearchList.css*/}
            <NavLink onClick={selectMovie} to="/inspectMovie">
                <h3>{content.title}</h3>
                <div>{content.body}</div>
                <img src={content.posterURLs[154]}></img>
            </NavLink>
            {/* temp borttagna, TODO ska få plats med dom i korten {renderStreamingServices(result)} */}
            {addToListButton()}
        </div>
    )
}