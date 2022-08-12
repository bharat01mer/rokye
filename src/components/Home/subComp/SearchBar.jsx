import Desktop from "./searchComp"

const SearchBar = ({ winWidth }) => {

  const iconSize = winWidth < 1000 ? 20 : 30
  const iconSiz2 = 20

  return (
    <div className="rokye__home-searchbar">
      <Desktop iconSize={iconSize} iconSiz2={iconSiz2} winWidth={winWidth} />
    </div>
  )
}

export default SearchBar