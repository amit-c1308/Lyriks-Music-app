import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsByCountryQuery } from "../redux/services/shazam";

const AroundYou = () => {
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://geo.ipify.org/api/v2/country?apiKey=at_VWSxldZA7lJvLcyFvlK5hAF0dHn8Y"
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [country]);

  const { data, isFetching, error } = useGetTopChartsByCountryQuery(country);

  if (isFetching) return <Loader title="Loading song around you..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You - <span className="font-black">{country}</span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.tracks?.map((song, index) => (
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

export default AroundYou;
