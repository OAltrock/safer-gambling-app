import { createSlice } from "@reduxjs/toolkit";

const initialState =
{
    English:
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
            "",
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
            [`Treasures are scattered at different depths, with more valuable treasures found deeper. The frequency of appearance
                         is inversely correlated to depth, with more treasures appearing the deeper the diver goes.`],
            [
                ["Static Obstacles:", "Rocks, coral reefs, etc., which the diver must navigate around."],
                ["Moving Threats:", "Sea creatures (e.g., jellyfish, sharks) that the diver must dodge to not get penalties."],
                ["Depth Hazards:", "As the diver goes deeper, they encounter more aggressive sea creatures and environmental hazards."]
            ],
            ["Points are awarded based on the treasures collected.",
                "Penalties for hitting obstacles or getting caught by threats (lose points or oxygen).",
                "Bonuses for lasting longer than expected."],
            ["Session End:", "Overall Score:", "Oxygen Level Impact:"],
            ["A session ends when the diver's oxygen runs out.",
                "A score is given based on the treasures collected and penalties incurred."],
            ["After 5 sessions, an overall score is calculated as the sum (or average) of scores from each session.",
                "Players receive feedback on their overall performance."
            ],
            [`There are penalties for consuming the oxygen too fast i.e.the diver lasts less than an expected amount of time 
                     (eg. For - 10 points for every second below 2 minutes).`,
                "Conversely, there are bonuses for lasting longer than expected."
            ],
            ["Risk Proneness Indicators:", "Overall Risk Profile:"],
            ["Frequent deep dives with low oxygen levels.",
                "High number of interactions with threats.",
                "Time spent in high-risk zones where time survived is less than average."],
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
            "You scored:",
            "overall.",
            ["You're a Non-problem gambler", "You're experiencing a low level of gambling problems with a few or no negative consequences identified.", "You're experiencing a moderate level of gambling problems leading to some negative consequences.", "You're gambling with negative consequences and a possible lack of control."],
            ["'Non-problem gamblers' (PGSI = 0)",
                "'Low risk' (PGSI = 1-2) experiencing a low level of gambling problems with a few or no negative consequences identified.",
                "'Moderate Risk' (PGSI = 3-7) experiencing a moderate level of gambling problems leading to some negative consequences.",
                "'Problem gamblers' (PGSI = 8+) gambling with negative consequences and a possible lack of control."],
            "Behaviour",
            //array of options based on questionnaire
            ["You reported engaging in gambling activities multiple times per week."],

            "Personal Consequences",
            //same
            ["You admitted to frequently attempting to win back money after a loss."],
            
            "Social Consequence",
            //same
            ["You often feel anxious or stressed when thinking about gambling."]
        ]
    },
    Deutsch:
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
                    "Haben Sie mehr gesetzt, als Sie sich wirklich leisten können zu verlieren?",
                    "Mussten Sie schon mit größeren Geldbeträgen spielen, um die gleiche Befriedigung zu erzielen?",
                    "Wenn Sie gespielt haben, versuchten Sie später, das verlorene Geld zurückzugewinnen?",
                    "Haben Sie sich Geld geliehen oder etwas verkauft, um Geld zum Spielen zu bekommen?",
                    "Haben Sie das Gefühl, dass Sie ein Problem mit dem Glücksspiel haben könnten?",
                    "Hat das Glücksspiel bei Ihnen psychische Probleme verursacht, einschließlich Stress oder Angstzustände?",
                    "Haben Menschen Ihr Wetten kritisiert oder Ihnen gesagt, dass Sie ein Glücksspielproblem haben, unabhängig davon, ob Sie das für wahr hielten oder nicht?",
                    "Hat Ihr Glücksspiel finanzielle Probleme für Sie oder Ihren Haushalt verursacht?",
                    "Hatten Sie schon einmal ein schlechtes Gewissen, weil Sie gespielt haben oder wegen den Konsequenzen Ihres Spielens?"
                ],
            options: ["Niemals", "Manchmal", "Meistens", "Fast immer"]
        },
        gamePage: [
            ["Spielübersicht: Schatztauchen", "Spielregeln:", "Spielende und Wertung:", "Spielerbewertung:"],
            "",
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
            "Sie haben folgende Punktzahl erreicht:",
            "insgesamt.",
            ["Ihr Spielen verursacht keine Probleme",
                "Sie haben ein geringes Glücksspielproblem mit wenigen oder gar keinen negativen Folgen.",
                "Sie haben mäßige Probleme mit dem Glücksspiel, die zu einigen negativen Konsequenzen führen.",
                "Sie spielen mit negativen Folgen und einem möglichen Mangel an Kontrolle."],
            ["'Unproblematischer Spieler' (PGSI = 0)",
                "'Niedriges Risiko' (PGSI = 1-2) ein geringes Maß an Glücksspielproblemen mit wenigen oder keinen negativen Folgen.",
                "'Mäßiges Risiko' (PGSI = 3-7) mit einem mäßigen Ausmaß an Spielproblemen, die zu einigen negativen Folgen führen.",
                "'Problematische Glücksspieler' (PGSI = 8+), die mit negativen Folgen und einem möglichen Mangel an Kontrolle spielen."],
            "Verhalten:",
            
            ["Sie gaben an, mehrmals pro Woche an Glücksspielen teilzunehmen."],

            "Persönliche Konsequenzen:",
            
            ["Sie haben zugegeben, dass Sie häufig versucht haben, nach einem Verlust Geld zurückzugewinnen."],

            "Soziale Konsequenzen:",
            
            ["Sie fühlen sich oft ängstlich oder gestresst, wenn Sie ans Glücksspiel denken."]
        ]
    },
    Francais:
    {
        navBar:
            [
                "Conseils et orientation",
                "Aider",
                "Paramètres"
            ]
        ,
        homePage:
            [
                "Comment fonctionne l'application Safer Gambling: ",
                "Étape 1",
                "Questionnaire perspicace: ",
                `Commencez votre voyage vers un jeu plus sûr grâce à notre questionnaire perspicace. 
                Cette étape rapide et facile vous aide à comprendre votre comportement de jeu en vous posant une série de questions soigneusement élaborées.`,
                `Étape 2`,
                `Jeu d'évaluation interactif: `,
                `Plongez dans notre jeu d'évaluation interactif, où l'amusement côtoie la compréhension. Ce jeu dynamique
                    et engageant est conçu pour évaluer vos tendances au jeu d'une manière ludique mais précise.`,
                "Étape 3",
                "Évaluation personnalisée: ",
                `Après le questionnaire et le jeu interactif, vous recevrez une analyse complète de votre comportement de jeu. Nos commentaires détaillés sont 
                    sur mesure, en vous fournissant des informations claires et des conseils pratiques pour vous aider à rester maître de la situation.`,
                "Commençons"
            ]
        ,
        questionnaire: {
            text: ["Questionnaire", "Question", "de", "Soumettre"],
            questions:
                [
                    "Avez-vous parié plus que vous ne pouviez vous permettre de perdre ?",
                    "Avez-vous eu besoin de jouer avec des sommes d'argent plus importantes pour ressentir la même excitation?",
                    "Lorsque vous avez joué, êtes-vous revenu un autre jour pour essayer de regagner l'argent que vous aviez perdu?",
                    "Avez-vous emprunté de l'argent ou vendu quelque chose pour obtenir de l'argent pour jouer?",
                    "Avez-vous déjà eu l'impression d'avoir un problème de jeu?",
                    "Le jeu vous a-t-il causé des problèmes de santé mentale, y compris du stress ou de l'anxiété?",
                    "Des personnes ont-elles critiqué vos paris ou vous ont-elles dit que vous aviez un problème de jeu, que vous pensiez ou non que c'était vrai?",
                    "Le jeu a-t-il causé des problèmes financiers à vous ou à votre ménage?",
                    "Vous êtes-vous déjà senti coupable de votre façon de jouer ou de ce qui se passe lorsque vous jouez?"
                ],
            options: ["Jamais", "Parfois", "La plupart du temps", "Presque toujours"]
        },
        gamePage: [
            ["Aperçu du jeu: Plongeon au trésor", "Règles du jeu:", "Fin du match et score:", "Évaluation des joueurs: "],
            "",
            `Les joueurs contrôlent un plongeur qui plonge sous la mer pour collecter le plus de trésors possible dans un délai de 
                    1 à 2 minutes. Le but est d'accumuler le score le plus élevé possible en collectant des trésors, 
                    tout en gérant les niveaux d'oxygène et en évitant les obstacles et les menaces.`,
            ["Durée du jeu :", "Contrôles: ", "Mécanisme de l'oxygène: ", "Collection de trésors: ", "Obstacles, menaces et éléments: ", "Système de notation: "],
            ["Chaque session de jeu dure aussi longtemps que l'oxygène. (environ 1 à 2 minutes en moyenne).",
                "Les joueurs peuvent jouer jusqu'à 5 sessions.",
                "Les notes de chaque session sont enregistrées et combinées pour former une note globale après la 5e session."],
            [
                ["Touches fléchées / WASD: ", "Déplacez le plongeur vers le haut, le bas, la gauche et la droite."]
            ],
            ["Le plongeur commence avec une bouteille d'oxygène pleine.", "L'oxygène s'épuise progressivement au fil du temps et plus rapidement à mesure que le plongeur s'enfonce dans l'eau."],
            [`Les trésors sont dispersés à différentes profondeurs, les plus précieux se trouvant plus profondément.
                         La fréquence d'apparition des trésors est inversement corrélée à la profondeur, plus le plongeur s'enfonce dans l'eau, plus les trésors apparaissent.`],
            [
                ["Obstacles statiques: ", "Rochers, récifs coralliens, etc., que le plongeur doit contourner."],
                ["Menaces mobiles: ", "Créatures marines (méduses, requins, etc.) que le plongeur doit éviter pour ne pas être pénalisé."],
                ["Risques liés à la profondeur: ", "Au fur et à mesure que le plongeur descend en profondeur, il rencontre des créatures marines plus agressives et des dangers environnementaux."]
            ],
            ["Des points sont attribués en fonction des trésors collectés.",
                "Pénalités pour les obstacles ou les menaces (perte de points ou d'oxygène).",
                "Des primes pour durer plus longtemps que prévu."],
            ["Fin de la session: ", "Score global: ", "Impact du niveau d'oxygène: "],
            ["Une session se termine lorsque le plongeur n'a plus d'oxygène.",
                "Un score est attribué en fonction des trésors collectés et des pénalités encourues."],
            ["Après 5 sessions, une note globale est calculée comme la somme (ou la moyenne) des notes de chaque session.",
                "Les joueurs reçoivent un retour d'information sur leurs performances globales."
            ],
            [`Il y a des pénalités pour une consommation trop rapide d'oxygène, c'est-à-dire que le plongeur dure moins longtemps que prévu. 
                     (par exemple, pour - 10 points pour chaque seconde en dessous de 2 minutes).`,
                "À l'inverse, il existe des primes pour une durée plus longue que prévu."
            ],
            ["Indicateurs de propension au risque: ", "Profil de risque global: "],
            ["Plongées profondes fréquentes avec de faibles niveaux d'oxygène.",
                "Nombre élevé d'interactions avec des menaces.",
                "Temps passé dans des zones à haut risque où la durée de survie est inférieure à la moyenne."],
            [
                ["Joueur prudent :", "Des scores élevés avec des pénalités minimales."],
                ["Joueur équilibré :", "Résultats modérés avec quelques pénalités mais utilisation équilibrée de l'oxygène."],
                ["Preneur de risque :", "Des scores élevés pour les plongées profondes, mais une faible conservation de l'oxygène."],
                ["Joueur téméraire :", "Faibles scores dus à des pénalités élevées et à une prise de risque fréquente sans gestion adéquate."]
            ],
            "Retour",
            ["Jouer", "Rejouer"],
            "Jouer le jeu"
        ]
        ,
        evaluationPage: [
            "Vos résultats d'évaluation personnalisés",
            `Nous vous remercions d'avoir pris le temps de répondre à notre questionnaire et de participer à la simulation d'un jeu basé sur des pièces de monnaie.
             L'objectif de cette évaluation est de déterminer votre comportement en matière de jeu et d'identifier les risques potentiels liés à un problème de jeu.             
             Sur la base de vos réponses et de vos performances au jeu, nous avons rédigé le rapport suivant.`,
            "Analyse du questionnaire: ",
            `Le questionnaire comprenait plusieurs questions destinées à évaluer vos habitudes de jeu, vos réactions émotionnelles et vos niveaux d'autocontrôle.
             Vos réponses indiquent ce qui suit: `,
            "Vous avez marqué: ",
            "dans l'ensemble.",
            ["Vous êtes un joueur sans problème", "Vous avez peu de problèmes de jeu et peu ou pas de conséquences négatives.", "Vous avez des problèmes de jeu de niveau modéré qui entraînent des conséquences négatives.", "Vous jouez avec des conséquences négatives et un possible manque de contrôle."],
            ["Joueurs sans problème (PGSI = 0)",
                "'Risque faible' (PGSI = 1-2) : faible niveau de problèmes de jeu avec peu ou pas de conséquences négatives identifiées.",
                "'Risque modéré' (PGSI = 3-7) : niveau modéré de problèmes de jeu entraînant certaines conséquences négatives.",
                "Joueurs problématiques (PGSI = 8+) jouant avec des conséquences négatives et un possible manque de contrôle."],
            "Comportement",
            ["Vous avez déclaré vous livrer à des activités de jeu plusieurs fois par semaine."],
            "Conséquences personnelles",
            ["Vous avez admis avoir fréquemment tenté de récupérer de l'argent après une perte."],
            "Conséquence sociale",
            ["Vous vous sentez souvent anxieux ou stressé lorsque vous pensez au jeu."]
        ]
    },
    current: "English"
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