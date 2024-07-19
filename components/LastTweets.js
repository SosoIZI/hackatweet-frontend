import styles from '../styles/LastTweets.module.css'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function LastTweets(props) {

    const dispatch = useDispatch();
    const username = useSelector((state) => state.user.value.username);
    const firstname = useSelector((state) => state.user.value.firstname);
    const token = useSelector((state) => state.user.value.token);
    //console.log('props.user est ', props.user)

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

        fetch(`http://localhost:3000/addLike/${token}`)
        .then(response => response.json())
        .then(data => {
          //console.log(data)
          props.addLike(props.tweet)
        });
    }

    // je rajoute l'icone "trash" seulement si le tweet appartient à l'utilisateur connecté
    let trashIcon = <span></span>
    if (props.user.username == username /* props.pseudo */) {
     trashIcon = <span><FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTweet()}/></span>
    } 

    const deleteTweet = () => {
        fetch(`http://localhost:3000/tweets/${props._id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
         .then(response => response.json())
         .then(data => {
           //console.log(data);
           props.delete(props.tweet)
         });
        }

        // Je veux savoir depuis combien de temps le tweet a été fait
        let maintenant = new Date();
        let dateTweet = new Date(props.date); // La date et l'heure de publication du tweet doivent être converties en objet Date

        function dateDiffInHours(dateold, datenew) {
            // Calcul de la différence en millisecondes
            let diffInMilliseconds = datenew - dateold;

            // Conversion des millisecondes en heures
            let diffInHours = diffInMilliseconds / (1000 * 60 * 60);
            return diffInHours;
        }

        let hoursDiff = dateDiffInHours(dateTweet, maintenant);
        let delay = Math.trunc(hoursDiff)
    


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
                <p>{props.user.username}  {props.user.firstname}  - {delay} hour(s) </p> 
                </div>
            </div>
            <div className={styles.tweetContent}>
                <p>{props.tweet}</p>
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