import styles from '../styles/Home.module.css';
import LastTweets from '../components/LastTweets';
import Trends from '../components/Trends';
import Tweet from '../components/Tweet';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Hashtag(props) {

  const dispatch = useDispatch();
  const [tweets, setTweets] = useState([]);
  const username = useSelector((state) => state.user.value.username);
  const firstname = useSelector((state) => state.user.value.firstname);
  
    
  // Si je suis passée de la page tweet à la page hashtag alors je mets à jour l'état onHashtagPage
  // Si je clique sur le bird, je mets à jour l'état onHashtagPage
 

  // au chargement de la page, j'affiche les data filtrées en fonction du hashtag cliqué

  useEffect(() => {
      fetch('http://localhost:3000/tweets')
        .then(response => response.json())
        .then(data => {
          //console.log('data' ,data)
          setTweets(data.tweet.reverse()) // rajouter un filter
        });
    }, []);

    // console.log('le tableau tweets est ', tweets)


    // sur la page hashtag, je commence par filtrer mes tweets en fonction du hashtag
    // 1- je récupère la hashtag de l'URL
      let url = new URL( window.location.href);
      let hash = url.hash
   
      console.log('le hashtag dans lurl est', hash )

    // 2- je filtre mon tableau de tweets 
    const tweetFilterOnHashtag = tweets.filter((obj) => obj.hashtag == hash);

    // 3- j'affiche seulement les tweets qui contiennent le hashtag
    const lastTweets = tweetFilterOnHashtag.map((data, i) => {
      return <LastTweets key={i} {...data} />}
    );

    // ne garder que des hastag uniques 
    let hashtagTab = []
    for (const obj of tweets) {
      if (obj.hashtag && obj.hashtag.length>0)
      hashtagTab.push(obj.hashtag)
    }
    console.log( 'le hashtagTab est  ', hashtagTab) // c'est un tableau avec tous mes #
    let hashObj = {}
    let finalTab= []
    for (const hash of hashtagTab) {
      if (hashObj[hash]) {
        hashObj[hash] += 1;
      } else {
        hashObj[hash] = 1;
      }
    }
    
    // Convertir hashObj en un tableau d'objets
    for (const key in hashObj) {
      let obj = {};
      obj[key] = hashObj[key];
      finalTab.push(obj);
    }

    console.log('finalTab est ',finalTab)
    //j'obtiens un tableau avec des objets avec tous les hashtag et le nombre de fois où ils apparaissent
    
   
    
    const hashTrend = finalTab.map((data, i) => {
      console.log('data', data)
      return <Trends key={i} hash={data} />}
    );

    const logoutClick = () => {
      dispatch(logout());
    }
    

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHeader}>
        <div className={styles.birdContainer}>
        <Link href="/tweet" onClick={() => changePage()}>
          <Image src="/tweeter_bird.png"  
          alt="Logo" 
          width={50} 
          height={70} 
          style={{transform: 'rotate(180deg)'}}
          />
          </Link>
        </div>
        <div className={styles.profilContainer}>
          <div className={styles.profilPic}>
            <Image src="/image_profil.webp" alt="Profil" 
            width={50} 
            height={40} 
            style={{borderRadius: '100px'}}
            />
          </div>
          <div className={styles.profilInfos}>
            <p>{firstname} <br></br>{username}</p>
            <br></br>
            <button className={styles.logoutButton} onClick={() => logoutClick()}>LOGOUT</button>
          </div>  
        </div>
      </div>
      <div className={styles.newTweetContainer}>
      <Tweet onHashtagPage={props.onHashtagPage}/>
      </div>
      <div className={styles.lastTweetContainer}>
      {lastTweets}
      </div>
      <div className={styles.trendsPageContainer}>
        <p>Trends</p>
        <div className={styles.trendsContainer}>
        {hashTrend}
        </div>
      </div>
    </div>
  );
}

export default Hashtag;