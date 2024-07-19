import styles from '../styles/LastTweets.module.css'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function LastTweets(props) {

    const [isLiked, setIsLiked] = useState(false);

    // le tyle de base de l'icone coeur
    let heartIconStyle = { 'cursor': 'pointer' } 
    // le style change en cas de clic
    if (isLiked == false) {
        heartIconStyle = { 'cursor': 'pointer' } 
    } else {
        heartIconStyle = { 'color': '#e74c3c', 'cursor': 'pointer' };
    }

    //grâce au reducer persitant :
    const letokendugars= ''

    // Quand je clique sur le boutton coeur, je dois rajouter un like à ce tweet dans ma BDD
    const addNewLike = () => {
        setIsLiked(!isLiked)
        // Cette route ajoute un like si letokendugars n'est pas présent 
        // dans le tableau nbLike dans la BDD
        // si letokendugars est présent dans le tableau nbLike dans la BDD
        // cette route retire 1 like

        fetch(`http://localhost:3000/addLike/${letokendugars}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          props.addLike(props.tweet)
        });
    }

    // je rajoute l'icone "trash" seulement si le tweet appartient à l'utilisateur connecté
    let trashIcon = <span></span>
    if (letokendugars == 'John' /* props.pseudo */) {
     trashIcon = <span><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTweet()}/></span>
    } 

    const deleteTweet = () => {
        fetch(`http://localhost:3000/tweets/deleteTweet/${props.id}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          props.delete(props.tweet)
        });
    }

    return (
        <div className={styles.oneTweetContainer}>
            <div className={styles.tweetAuthorContainer}>
                <div className={styles.profilLogo}>
                <Image src="/image_profil.webp" alt="Profil" 
                    width={50} 
                    height={40} 
                    style={{borderRadius: '100px', objectFit : 'contain'}}
                />
                </div>
                <div className={styles.pseudoAuthorContainer}>
                <p>John   @JohnCena    - {props.date} </p> 
                </div>
            </div>
            <div className={styles.tweetContent}>
                <p>{props.tweet}</p>
                <p>{props.hashtag}</p>
            </div>
            <div className={styles.tweetActions}>
                <span><FontAwesomeIcon icon={faHeart} style={heartIconStyle} className="like" onClick={() => addNewLike()} /></span>
                <p>{props.nbLike.length}</p>
                {trashIcon}
            </div>
        </div>
    );
}

export default LastTweets;