import styles from '../styles/Trends.module.css'

function Trends(props) {

    let hashtag = Object.keys(props.hash)
    let NbTweet = props.hash.hashtag

    return (
        <div className={styles.oneTrend}>
            <p className={styles.hashtagTrend}>{hashtag}</p>
            <p className={styles.hashtagTrendCounter}>{NbTweet} Tweet</p>
        </div>
    );
}

export default Trends;