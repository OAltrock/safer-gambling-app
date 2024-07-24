import nhsLogo from '../Assets/nhs-logo.png';
import addictionSupport from '../Assets/addictionSupportIcon.jpeg';
import gamAAIcon from '../Assets/gamAAIcon.png';
import '../Styles/HelpPage.css';


function HelpPage() {

    return (
        <div id='helpContainer'>
            <h1>Advice & Guidance</h1>
            <p>If you are experiencing gambling addiction, there are many resources available to help you.</p>
            <p>Please note that gambling addiction is a serious condition that can lead to financial ruin and other negative consequences. It is important to seek help from a qualified professional.</p>
            <p>Here are some resources to help you:</p>
            <div className='linkContainerContainer'>
                <div className='linkContainer'>
                    <img src={nhsLogo} alt="nhs logo" />
                    <a href="https://www.nhs.uk/live-well/addiction-support/gambling-addiction/">Gambling Awareness</a>
                </div>
                <div className='linkContainer'>
                    <img src={addictionSupport} alt='addiction logo' style={{scale: "65%", alignSelf: "center"}}/>
                    <a href="https://www.gamcare.org.uk/">Addiction Support</a>
                </div>
                <div className='linkContainer'>
                <img src={gamAAIcon} alt='addiction logo' style={{scale: "71%", alignSelf: "center"}}/>
                    <a href="https://gamblersanonymous.org.uk/">Gamblers Anonymous</a>
                </div>                
            </div>

        </div>
    )
}

export default HelpPage;
