const SearchData = ({data}) => {
    console.log(data)
    return (
        <div>
            <ul>
                <li> music name: {data.name} </li>
                <li> artist: {data.artist} </li>
            </ul>
        </div>
    )
}

export default SearchData ; 