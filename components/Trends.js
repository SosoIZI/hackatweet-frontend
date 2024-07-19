import styles from '../styles/Trends.module.css'

function Trends(props) {

   // console.log('props.hash est ', props.hash )
    let hashtag = Object.keys(props.hash)
   // console.log('hashtag est ', hashtag )
    let NbTweet = props.hash[hashtag]

    return (
        <div className={styles.oneTrend}>
            <p className={styles.hashtagTrend}>{hashtag}</p>
            <p className={styles.hashtagTrendCounter}>{NbTweet} Tweet</p>
        </div>
    );
}

export default Trends;