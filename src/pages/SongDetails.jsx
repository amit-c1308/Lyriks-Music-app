import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
} from "../redux/services/shazam";
import { tempRelatedSongs } from "../constants";

const relatedSongs = tempRelatedSongs;

const SongDetails = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery(songid);

  // const {
  //   data: relatedSongs,
  //   isFetching: isFetchingRelatedSongs,
  //   error,
  // } = useGetRelatedSongsQuery(songid);

  if (isFetchingSongDetails) return <Loader title="Searching song details" />;

  console.log(songData);

  if (error) return <Error />;

  const songLyrics = songData?.sections[1];
  const songArtists = songData?.resources?.artists;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data: relatedSongs.tracks, index }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader songData={songData} songArtists={songArtists} />
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songLyrics?.text ? (
            songLyrics?.text?.map((line, index) =>
              line ? (
                <p
                  className="text-gray-400 text-base my-1"
                  key={`lyrics-line-${index}`}
                >
                  {line}
                </p>
              ) : (
                <br />
              )
            )
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry, no lyrics found!
            </p>
          )}
        </div>
      </div>
      {relatedSongs?.tracks?.length && (
        <RelatedSongs
          data={relatedSongs?.tracks}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePlayClick={handlePlayClick}
          handlePauseClick={handlePauseClick}
        />
      )}
    </div>
  );
};

export default SongDetails;
