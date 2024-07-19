import styles from '../styles/Tweet.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function Tweet(props) {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.value.token);
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

    const HandleLike = () => {
        fetch(`http://localhost:3000/tweets/${token}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({}),
        }).then(response => response.json())
            .then(data => {
                
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