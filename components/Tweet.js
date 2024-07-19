import styles from '../styles/Tweet.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Tweet(props) {

    const token = useSelector((state) => state.user.value.token);

      //  je récupère la hashtag de l'URL (elle sera pas défaut dans la searchbar)
      let url = new URL( window.location.href);
      let hash = url.hash
      //console.log('le hashtag dans lurl est', hash )
      const [searchValue, setSearchValue] = useState(hash);
      //console.log('token', token)

    const [postContent, setPostContent] = useState('');
    const regex =  /#\w+/gi;
    // const texte = "Voici un exemple de #react et #javascript.";
     const hachhtag = postContent.match(regex)
    // console.log('les hachtag de la phrase sont', hachhtag)

    //quand je clique sur "Tweet" j'enregistre ce tweet dans ma BDD.
    const addTweet = () => {
        // console.log('date créé est', new Date())
        // console.log('nbLike créé est', '0')
        // console.log('hashtag créé est', hachhtag)
        // console.log('tweet créé est', postContent)

        fetch(`http://localhost:3000/tweets/${token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tweet: postContent, hashtag: hachhtag, date: new Date()}),
		}).then(response => response.json())
			.then(data => {
				//console.log('le tweet rajouté dans la BDD est', data)
                props.newTweetAdded();
                setPostContent('')
			})      
        }

        const newSearch = () => {
            window.location = `/hashtag?hash=${searchValue}`;
        }

    return (
        <form onSubmit={newSearch}>
        <div className={styles.tweetContainer}>

                {props.onHashtagPage ? 
                (<h1 className={styles.homeWord} >Hashtag</h1>) : 
                (<h1 className={styles.homeWord} >Home</h1>)}
            <div className={styles.textTweetContainer}>
            
            {props.onHashtagPage ? 
            (<div>
                <input defaultValue={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                style={{backgroundColor: 'rgb(34, 34, 34)', 
                color: "white",
                border: 'none',
                borderRadius : '15px',
                width: '600px',   
                height: '30px',
                }}/>
              </div>) : 
            (<textarea 
                placeholder="What's up?" 
                id="tweet" 
                name="tweet" 
                value={postContent}
                onChange={e => setPostContent(e.target.value)} 
                rows={2}
                cols={60}
                maxLength='280'
                style={{backgroundColor: 'black', color: "white",
                    borderTopColor: 'black',
                    borderRightColor: 'black',
                    borderBottomColor: 'grey',
                    borderLeftColor: 'black'}}
                />) }
            </div>
            
            {props.onHashtagPage ? 
            (<> </>) : 
            (<div className={styles.textTweetCompteurAndButton}>
                <p>{postContent.length}/280</p>
                <button className={styles.postTweetButton} onClick={() => addTweet()}> 
                    Tweet
                </button></div>)}
            
        </div>
        </form>
    );
}

export default Tweet;