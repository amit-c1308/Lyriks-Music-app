import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/shazam";
import { useParams } from "react-router-dom";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(
    decodeURIComponent(searchTerm)
  );
  if (isFetching) return <Loader title="Loading top charts..." />;
  if (error) return <Error />;

  const songs = data?.tracks?.hits?.map((song) => song.track);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Showing results for - {decodeURIComponent(searchTerm)}
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, index) => (
          <SongCard
            key={song?.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            index={index}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
