import styles from '../styles/Home.module.css';
import LastTweets from '../components/LastTweets';
import Trends from '../components/Trends';
import Tweet from '../components/Tweet';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Home() {

  const [tweets, setTweets] = useState([]);
  const [needAMajOfTweet, setNeedAMajOfTweet] = useState(false);
    
  // au chargement de la page, j'affiche tous les tweets de la base de données
  // je mets à jour cet affichage à chaque fois que needAMajOfTweet change, 
  // c'est à dire quand je clique sur le boutton "tweet" dans le component "Tweet"

  useEffect(() => {
      fetch('http://localhost:3000/tweets')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setTweets(data)
        });
    }, [needAMajOfTweet]);


    // A chaque fois qu'un tweet est rajouté, je lui dis qu'il faut 
    // une MAJ de l'affichage des tweets pour rajouter ce tweet à l'affichage

    const newTweetAdded = () => {
      setNeedAMajOfTweet(!needAMajOfTweet)
    }

    // Chaque Tweet que j'ai récupéré dans mon fetch a été mis dans le tableau tweets
    // je tranforme chaque élément de ce tableau en élément "LastTweets" pour qu'ils apparaissent 
    // dans le component "LastTweets"

    const lastTweets = tweets.map((data, i) => {
      return <LastTweets key={i} {...data} newTweetAdded={newTweetAdded} addLike={newTweetAdded} delete={newTweetAdded}/>}
    );

    // ne garder que des hastag uniques 
    let hashtagTab = []
    
   
    for (const obj of tweets ) {
      let objHash ={}
      if (objHash[obj.hashtag]) {
      objHash[obj.hashtag] = objHash[obj.hashtag] + 1
      } else {objHash[obj.hashtag] = 1 }
      hashtagTab.push(objHash)
    }
    //j'obtiens un tableau avec des objets avec tous les hashtag et le nombre de fois où ils apparaissent
    
    const hashTrend = hashtagTab.map((data, i) => {
      return <Trends key={i} hash={data} />}
    );
    

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeHeader}>
      <Image src="/tweeter_bird.png" alt="Logo" 
      width={50} 
      height={100} 
      style={{transform: 'rotate(180deg)' , objectFit: "contain"}}
      />
      <div className={styles.profilContainer}>
        <div className={styles.profilPic}>
          <Image src="/image_profil.webp" alt="Profil" 
          width={100} 
          height={80} 
          style={{borderRadius: '100px' }}
          />
        </div>
        <div className={styles.profilInfos}>
          <p>John</p>
          <p>@JohnCena</p>
        </div>
      </div>
      </div>
      <div className={styles.newTweetContainer}>
      <Tweet />
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

export default Home;
