import "./global.css"
import s from "./style.module.css"
import {useEffect, useState} from "react";
import TvShowsAPI from "./api/tv-shows.js";
import {BACKDROP_BASE_URL} from "./config.js";
import TVShowDetail from "./components/TVShowDetail/TVShowDetail.jsx";
import Logo from "./components/Logo/Logo.jsx";
import logo from "./assets/images/logo.png"
import TVShowListItem from "./components/TVShowListItem/TVShowListItem.jsx";
import TVShowList from "./components/TVShowList/TVShowList.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";

export default function App() {
    
    const [currentTVShow, setCurrentTVShow] = useState([]);
    const [recommendationList, setRecommendationList] = useState([]);
    
    async function fetchPopulars() {
        const rep = await TvShowsAPI.fetchPopulars();
        if (rep.length > 0) {
            setCurrentTVShow(rep[0]);
        }
    }

    async function fetchRecommendations(tvShowId) {
        const rep = await TvShowsAPI.fetchRecommendations(tvShowId);
        if (rep.length > 0) {
            setRecommendationList(rep.slice(0, 10));
        }
    }
    
    useEffect(() => {
            fetchPopulars();
    }, [])
    
    useEffect(() => {
        if (currentTVShow.id) {
            fetchRecommendations(currentTVShow.id);
        }
        }, [currentTVShow])
    
    async function searchTVShow(name) {
        const rep = await TvShowsAPI.fetchByTitle(name);
        if (rep.length > 0) {
            setCurrentTVShow(rep[0]);   
        }
    }
    
  return (
    <div className={s.main_container} 
         style={{background: currentTVShow 
                 ?`linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
                 : "black"
    }}
    >
      <div className={s.header}>
          <div className="row">
              <div className="col-4">
                  <Logo image={logo} title={"Watowatch"} subtitle={"Find a show you may like"} />
              </div>
              <div className="col-md-12 col-lg-4">
                  <SearchBar onSubmit={searchTVShow} />
              </div>
          </div>
      </div>
      <div className={s.tv_show_detail}>
          {currentTVShow && <TVShowDetail tvShow={currentTVShow}/>}
      </div>
      <div className={s.recommendations}>
          {recommendationList && <TVShowList onClickItem={setCurrentTVShow} tvShowList={recommendationList}/>}
      </div>
    </div>
  )
}
