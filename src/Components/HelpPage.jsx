function HelpPage() {
    const styles = {
        container: {            
            margin: '10vh',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f0f0f0',            
            textAlign: 'center',
            padding: '2vh',
            border: '1px solid #000',
            borderRadius: '10px',
        },
        header: {
            color: '#333',
            textAlign: 'center',
        },
        list: {
            listStyleType: 'none',
            padding: 0,            
            marginTop: '10vh',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: '30vh',
        },
        listItem: {
            fontSize: '1.5em',
            margin: '10px 0',
        },
        link: {
            textDecoration: 'none',
            color: '#1a73e8',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Help Page</h1>
            <p>If you are experiencing gambling addiction, there are many resources available to help you.</p>
            <p>Please note that gambling addiction is a serious condition that can lead to financial ruin and other negative consequences. It is important to seek help from a qualified professional.</p>
            <p>Here are some resources to help you:</p>
            <ul style={styles.list}>
                <li style={styles.listItem}>
                    <a style={styles.link} href="https://www.gamblersanonymous.org/ga/">Gamblers Anonymous</a>
                </li>
                <li style={styles.listItem}>
                    <a style={styles.link} href="https://www.ncpgambling.org/">National Council on Problem Gambling</a>
                </li>
                <li style={styles.listItem}>
                    <a style={styles.link} href="https://www.addictioncenter.com/">Addiction Center</a>
                </li>
                <li style={styles.listItem}>
                    <a style={styles.link} href="https://www.samhsa.gov/find-help/national-helpline">SAMHSA National Helpline</a>
                </li>
            </ul>
        </div>
    )
}

export default HelpPage;
