import style from './LeaderboardComponent.module.css';

export default function LeaderboardComponent(props) {
    const items = props.items;
    return (
        <div className={style.leaderboardContainer}>
            <div className={style.header}>
                <p><b>Leaderboard</b></p>
            </div>
            <div className={style.leaderboardList}>
                {items.map((item, index) => (
                    <div className={style.leaderboardItem} key={index}>
                        <div style={{ display: 'flex', gap: '45%', width: '80%' }}>
                            <p>{index + 1}.</p>
                            {item.name ? <p>{item.name}</p> : (item.User && <p>{item.User.firstName} {item.User.lastName} ( {item.User.username} ) </p>)}
                        </div>
                        <p style={{ width: '10%' }}>{item.points} points</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

