import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useGetTopChartsQuery } from "../redux/services/shazam";
import "swiper/css";
import "swiper/css/free-mode";
import Loader from "./Loader";
import Error from "./Error";

const TopChartCard = ({
  song,
  index,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-1 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-white text-base mr-3">{index + 1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        src={song?.images.coverart}
        alt={song?.title}
        className="w-12 h-12 rounded-lg"
      />
      <div className="flex flex-1 flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white text-sm">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-sm text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
      />
    </div>
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  if (isFetching) return <Loader title={"Loading top 5 from charts..."} />;
  if (error) return <Error />;

  const topPlays = data?.tracks?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  const handlePlayClick = (song, index) => {
    dispatch(setActiveSong({ song, data, index }));
    dispatch(playPause(true));
  };

  return (
    <div
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
      ref={divRef}
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, index) => (
            <TopChartCard
              song={song}
              index={index}
              key={song?.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, index)}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, index) => (
            <SwiperSlide
              song={song}
              index={index}
              key={song?.key}
              style={{ width: "18%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images.background}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
