import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
    english:
    {
        navBar:
            [
                "Advice & Guidance",
                "Help",
                "Settings"
            ]
        ,
        homePage:
            [
                "How the Safer Gambling App works:",
                "Step 1",
                "Insightful Questionnaire:",
                `Begin your journey to safer gambling with our insightful questionnaire. 
                This quick and easy step helps you understand your gambling behaviour by asking a series of carefully crafted questions.`,
                `Step 2`,
                `Interactive Assessment Game:`,
                `Dive into our interactive Assessment Game, where fun meets insight. This engaging
                    and dynamic game is designed to estimate your gambling tendencies in a playful yet accurate way.`,
                "Step 3",
                "Personalised Evaluation:",
                `After the questionnaire and interactive game, receive a comprehensive analysis of your gambling behaviour. Our detailed feedback is 
                    tailored to you, providing clear insights and actionable advice to help you stay in control.`,
                "Let's get started"
            ]
        ,
        questionnaire: {
            text: ["Questionnaire", "Question", "of", "Submit"],
            questions:
                [
                    "Have you bet more than you could really afford to lose?",
                    "Have you needed to gamble with larger amounts of money to get the same excitement?",
                    "When you gambled, did you go back another day to try and win back the money you lost?",
                    "Have you borrowed money or sold anything to get money to gamble?",
                    "Have you felt that you might have a problem with gambling?",
                    "Has gambling caused you any mental health problems, including stress or anxiety?",
                    "Have people criticised your betting or told you that you had a gambling problem, regardless of whether or not you thought it was true?",
                    "Has your gambling caused any financial problems for you or your household?",
                    "Have you felt guilty about the way you gamble or what happens when you gamble?"
                ],
            options: ["Never", "Sometimes", "Most of the time", "Almost always"]
        },
        gamePage: [
            ["Game Overview: Treasure Dive", "Game Rules:", "End of Game and Scoring:", "Player Assessment:"],
            "Objective:",
            `Players control a diver who dives under the sea to collect as much treasure as possible within a time frame of 
                    1 to 2 minutes. The goal is to accumulate the highest score possible by collecting treasures, 
                    while managing oxygen levels and avoiding obstacles and threats.`,
            ["Game Duration:", "Controls:", "Oxygen Mechanism:", "Treasure Collection:", "Obstacles, Threats and Items:", "Scoring System:"],
            ["Each game session lasts as long as the oxygen lasts. (around 1 to 2 minutes average).",
                "Players can play up to 5 sessions.",
                "Scores from each session are recorded and combined to form an overall score after the 5th session."],
            [
                ["Arrow Keys / WASD:", "Move the diver up, down, left, and right."]
            ],
            ["The diver starts with a full tank of oxygen.", "Oxygen depletes gradually over time and faster as the diver goes deeper."],
            [`Treasures are scattered at different depths, with more valuable treasures found deeper.The frequency of appearance
                         is inversely correlated to depth, with more treasures appearing the deeper the diver goes.`],
            [
                ["Static Obstacles:", "Rocks, coral reefs, etc., which the diver must navigate around."],
                ["Moving Threats:", "Sea creatures(e.g., jellyfish, sharks) that the diver must dodge to not get penalties."],
                ["Depth Hazards:", "As the diver goes deeper, they encounter more aggressive sea creatures and environmental hazards."]
            ],
            ["Points are awarded based on the treasures collected.",
                "Penalties for hitting obstacles or getting caught by threats(lose points or oxygen).",
                "Bonuses for lasting longer than expected."],
            ["Session End:", "Overall Score:", "Oxygen Level Impact:"],
            ["A session ends when the diver's oxygen runs out.",
                "A score is given based on the treasures collected and penalties incurred."],
            ["After 5 sessions, an overall score is calculated as the sum(or averga) of scores from each session.",
                "Players receive feedback on their overall performance."
            ],
            [`There are penalties for consuming the oxygen too fast i.e.the diver lasts less than an expected amount of time. 
                     (eg.For - 10 points for every second below 2 minutes)`,
                "Conversely, there are bonuses for lasting longer than expected."
            ],
            ["Risk Proneness Indicators:", "Overall Risk Profile:"],
            ["Frequent deep dives with low oxygen levels.",
                "High number of interactions with threats.",
                "Time spent in high- risk zones where time survived is less than average."],
            [
                ["Cautious Player:", "High scores with minimal penalties."],
                ["Balanced Player:", "Moderate scores with some penalties but balanced oxygen use."],
                ["Risk- Taker:", "High scores from deep dives but low oxygen conservation."],
                ["Reckless Player:", "Low scores due to high penalties and frequent risk-taking without adequate management."]
            ],
            "Go Back",
            ["Play", "Play again"],
            "Playing the game"
        ]
        ,
        evaluationPage: [
            "Your Personalised Evaluation Results",
            `Thank you for taking the time to complete our questionnaire and participate in the simulated
             coin - based game.The purpose of this evaluation is to assess your gambling behavior and identify
             any potential risks associated with problem gambling.Based on your responses and game performance,
             we have compiled the following report.`,
            "Questionnaire Analysis:",
            `The questionnaire consisted of several questions designed to gauge your gambling habits, emotional
             responses, and self - control levels.Your responses indicate the following: `,
            "Behaviour",
            ["You reported engaging in gambling activities multiple times per week."],
            "Personal Consequences",
            ["You admitted to frequently attempting to win back money after a loss."],
            "Social Consequence",
            ["You often feel anxious or stressed when thinking about gambling."]
        ]
    },
    german:
    {
        navBar: [
            "Hilfe & Beratung",
            "Hilfe",
            "Einstellungen"
        ]
        ,
        homePage:
            [
                "So funktioniert die Safer Gambling App:",
                "Schritt 1",
                "Aufschlussreicher Fragebogen:",
                `Beginnen Sie Ihre Reise zu sicherem Glücksspiel mit unserem aufschlussreichen Fragebogen. 
                 Dieser schnelle und einfache Schritt hilft Ihnen, Ihr Glücksspielverhalten zu verstehen, indem er eine Reihe sorgfältig ausgearbeiteter Fragen stellt.`,
                `Schritt 2`,
                `Interaktives Bewertungsspiel: `,
                `Tauchen Sie ein in unser interaktives Bewertungsspiel, bei dem Spaß auf Erkenntnis trifft.Dieses fesselnde
                 und dynamische Spiel wurde entwickelt, um Ihre Risikotendenzen auf spielerische und dennoch genaue Weise einzuschätzen.`,
                "Schritt 3",
                "Persönliche Auswertung:",
                `Nach dem Fragebogen und dem interaktiven Spiel erhalten Sie eine umfassende Analyse Ihres Spielverhaltens.Unser detailliertes Feedback ist 
                 ist auf Sie zugeschnitten und bietet klare Erkenntnisse und umsetzbare Ratschläge, damit Sie die Kontrolle behalten.`,
                "Start"
            ]
        ,
        questionnaire: {
            text: ["Fragebogen", "Frage", "von", "Abschicken"],
            questions:
                [
                    "Have you bet more than you could really afford to lose?",
                    "Have you needed to gamble with larger amounts of money to get the same exitement?",
                    "When you gambled, did you go back another day to try and win back the money you lost?",
                    "Have you borrowed money or sld anything to get money to gamble?",
                    "Have you felt that you might have a problem with gambling?",
                    "Has gambling caused you any mental health problems, including stress or anxiety?",
                    "Have people criticised your betting or told you that you had a gambling problem, regardless of whether or not you thought it was true?",
                    "Has your gambling caused any financial problems for you or your household?",
                    "Have you felt guilty about the way you gamble or what happens when you gamble?"
                ],
            options: ["Niemals", "Manchmal", "Meistens", "Fast immer"]
        },
        gamePage: [
            ["Spielübersicht: Schatztauchen", "Spielregeln:", "Spielende und Wertung:", "Spielerbewertung:"],
            "Ziel:",
            `Die Spieler steuern einen Taucher, der unter das Meer taucht, um so viele Schätze wie möglich innerhalb eines Zeitrahmens von 
                    1 bis 2 Minuten. Das Ziel ist es, durch das Sammeln von Schätzen die höchstmögliche Punktzahl zu erreichen, 
                    und dabei den Sauerstoffgehalt zu kontrollieren und Hindernissen und Gefahren auszuweichen.`,
            ["Spieldauer:", "Steuerung:", "Sauerstoff-Mechanismus:", "Schatzsammlung:", "Hindernisse, Bedrohungen und Gegenstände:", "Punktesystem:"],
            ["Jede Spielsitzung dauert so lange, wie der Sauerstoff reicht. (durchschnittlich etwa 1 bis 2 Minuten).",
                "Die Spieler können bis zu 5 Sitzungen spielen.",
                "Die Ergebnisse jeder Sitzung werden aufgezeichnet und nach der 5. Sitzung zu einem Gesamtergebnis zusammengefasst."],
            [
                ["Pfeiltasten / WASD:", "Bewegen Sie den Taucher nach oben, unten, links und rechts."]
            ],
            ["Der Taucher beginnt mit einer vollen Sauerstoffflasche", "Der Sauerstoff geht mit der Zeit allmählich zur Neige und wird schneller verbraucht, je tiefer der Taucher taucht."],
            [`Die Schätze sind in verschiedenen Tiefen verstreut, wobei die wertvolleren Schätze in der Tiefe gefunden werden.
                Die Häufigkeit des Auftauchens ist umgekehrt proportional zur Tiefe, d. h. je tiefer der Taucher geht, desto mehr Schätze tauchen auf.`],
            [
                ["Statische Hindernisse:", "Felsen, Korallenriffe usw., die der Taucher umfahren muss."],
                ["Bewegliche Bedrohungen:", "Meeresbewohner (z. B. Quallen, Haie), denen der Taucher ausweichen muss, um keine Strafe zu bekommen."],
                ["Gefahren in der Tiefe:", "Je tiefer der Taucher taucht, desto aggressivere Meeresbewohner und Umweltgefahren trifft er an."]
            ],
            ["Punkte werden auf der Grundlage der gesammelten Schätze vergeben",
                "Strafen für das Auftreffen auf Hindernisse oder das Fangen von Bedrohungen (Verlust von Punkten oder Sauerstoff).",
                "Boni für längeres Durchhalten als erwartet."],
            ["Sitzungsende:", "Gesamtergebnis:", "Auswirkungen auf den Sauerstoffgehalt:"],
            ["Eine Sitzung endet, wenn der Sauerstoff des Tauchers zur Neige geht.",
                "Eine Punktzahl wird auf der Grundlage der gesammelten Schätze und der erlittenen Strafen vergeben."],
            ["Nach 5 Sitzungen wird eine Gesamtpunktzahl berechnet, die sich aus der Summe (oder dem Durchschnitt) der Punktzahlen der einzelnen Sitzungen ergibt.",
                "Die Spieler erhalten eine Rückmeldung über ihre Gesamtleistung."],
            [`Es gibt Strafen, wenn der Sauerstoff zu schnell verbraucht wird, d.h. wenn der Taucher weniger als die erwartete Zeitspanne überlebt. 
                (z.B. für - 10 Punkte für jede Sekunde unter 2 Minuten)`,
                "Umgekehrt gibt es Boni, wenn man länger als erwartet durchhält."],
            ["Indikatoren für Risikobereitschaft:", "Gesamtrisikoprofil:"],
            ["Häufige Tieftauchgänge mit niedrigem Sauerstoffgehalt",
                "Hohe Anzahl von Interaktionen mit Bedrohungen.",
                "Zeit, die in Hochrisikozonen verbracht wird, in denen die überlebte Zeit unter dem Durchschnitt liegt."],
            [
                ["Vorsichtiger Spieler:", "Hohe Punktzahl mit minimalen Strafen."],
                ["Ausgeglichener Spieler:", "Mäßige Punktzahl mit einigen Strafen, aber ausgeglichener Sauerstoffverbrauch."],
                ["Risikofreudig:", "Hohe Punktzahl bei Tieftauchgängen, aber geringer Sauerstoffverbrauch."],
                ["Rücksichtsloser Spieler:", "Niedrige Punktzahl aufgrund hoher Strafen und häufiger Risikobereitschaft ohne angemessenes Management."]
            ],
            "Zurück",
            ["Spielen", "Nochmal spielen"],
            "Spiel läuft"
        ]
        ,
        evaluationPage: [
            "Ihre personalisierten Bewertungsergebnisse",
            `Vielen Dank, dass Sie sich die Zeit genommen haben, unseren Fragebogen auszufüllen und an dem simulierten
            Münzspiel teilgenommen haben.Der Zweck dieser Auswertung ist es, Ihr Spielverhalten zu beurteilen und
             mögliche Risiken im Zusammenhang mit problematischem Glücksspiel zu erkennen.Auf der Grundlage Ihrer Antworten und Ihres Spielverhaltens,
    haben wir den folgenden Bericht erstellt.`,
            "Analyse des Fragebogens:",
            `Der Fragebogen bestand aus mehreren Fragen, mit denen Ihre Spielgewohnheiten, Ihre emotionalen
            Reaktionen und Selbstkontrolle zu messen.Ihre Antworten geben Aufschluss über die folgenden Punkte: `,
            "HäufigKeit des Spielens:",
            ["Sie gaben an, mehrmals pro Woche an Glücksspielen teilzunehmen."],
            "Die Jagd nach Verlusten:",
            ["Sie haben zugegeben, dass Sie häufig versucht haben, nach einem Verlust Geld zurückzugewinnen."],
            "Emotionale Reaktionen:",
            ["Sie fühlen sich oft ängstlich oder gestresst, wenn Sie ans Glücksspiel denken."]
        ]
    },
    current: "english"
}

const languages = createSlice({
    name: "languages",
    initialState,
    reducers: {
        setLanguage: (state, payload) => {
            console.log(payload.payload)
            state.current = payload.payload
        }
    }
})

export const { setLanguage } = languages.actions
export default languages.reducer