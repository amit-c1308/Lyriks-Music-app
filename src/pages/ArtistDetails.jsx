import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from "../redux/services/shazam";

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);
  const { data: artistTopSongs } = useGetArtistTopSongsQuery(artistId);

  if (isFetchingArtistDetails)
    return <Loader title="Loading artist details..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData?.data[0]} />
      <RelatedSongs
        artistId={artistId}
        data={artistTopSongs?.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
