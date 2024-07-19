import styles from "../styles/Trends.module.css";
import Link from "next/link";
function Trends(props) {
  let hashtag = Object.keys(props.hash);
  let NbTweet = props.hash[hashtag];

  return (
    <div className={styles.oneTrend}>
      <Link href={`/hashtag?hash=${hashtag}`} className={styles.link}>
        <div>
          <p className={styles.hashtagTrendCounter}>{NbTweet} Tweet</p>

          <p className={styles.hashtagTrend}>{hashtag}</p>
        </div>
      </Link>
    </div>
  );
}

export default Trends;
