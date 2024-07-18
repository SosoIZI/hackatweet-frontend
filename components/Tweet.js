import styles from '../styles/Tweet.module.css';
import { useState } from 'react';

function Tweet() {

    const [postContent, setPostContent] = useState('');
    const regex =  /#\w+/gi;
    // const texte = "Voici un exemple de #react et #javascript.";
    // const hachhtag = texte.match(regex)
    // console.log('les hachtag de la phrase sont', hachhtag)


    //quand je clique sur "Tweet" j'enregistre ce tweet dans ma BDD.
    const addTweet = () => {
        fetch('http://localhost:3000/tweets', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tweet: postContent, hashtag: postContent.match(regex), nbLike: 0, date: new Date()}),
		}).then(response => response.json())
			.then(data => {
				console.log(data)
                props.newTweetAdded();
                setPostContent('')
			})
            
    }

    return (
        <div className={styles.tweetContainer}>
            <h1 className={styles.homeWord} >Home</h1>
            <div className={styles.textTweetContainer}>
                <textarea 
                placeholder="What's up?" 
                id="tweet" 
                name="tweet" 
                onChange={e => setPostContent(e.target.value)} 
                rows={2}
                cols={60}
                maxlength='280'
                style={{backgroundColor: 'black', color: "white",
                    borderTopColor: 'black',
                    borderRightColor: 'black',
                    borderBottomColor: 'grey',
                    borderLeftColor: 'black'}}
                />
            </div>
            <div className={styles.textTweetCompteurAndButton}>
                <p>{postContent.length}/280</p>
                <button className={styles.postTweetButton} onClick={() => addTweet()}> 
                    Tweet
                </button>
            </div>
        </div>
    );
}

export default Tweet;