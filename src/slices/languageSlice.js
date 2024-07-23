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
                This quick and easy step helps you understand your gambling behaviour by asking a series of carefully crafted questions`,
                `Step 2`,
                `Interactive Assessment Game:`,
                `Dive into our interactive Assesment Game, where fun meets insight. This engaging
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
                    "You feel very strong negative emotions when you lose a bet.",
                    "You often gamble with more money than you originally planned.",
                    "You have tried to cut back on gambling but have been unsuccessful.",
                    "You lie to family members or friends about how much you gamble.",
                    "You gamble to escape problems or relieve feelings of anxiety or depression.",
                    "You feel restless or irritable when you try to cut down on gambling.",
                    "You have had financial problems due to gambling (e.g. needing to borrow money, unpaid bills.",
                    "You often think about gambling (e.g. reliving past gambling and/ or planning future gambling.",
                    "You have gambled to try to win back money you have lost (chasing losses.)",
                    "You have neglected work, school, or family responsibilities because of gambling."
                ],
            options: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"]
        },
        gamePage: [
            "Go Back",
            "Play again",
            "Playing the game"
        ]
        ,
        evaluationPage: [
            "Your Personalised Evaluation Results",
            `Thank you for taking the time to complete our questionnaire and participate in the simulated
             coin-based game. The purpose of this evaluation is to assess your gambling behavior and identify
             any potential risks associated with problem gambling. Based on your responses and game performance,
             we have compiled the following report.`,
            "Questionnaire Analysis:",
            `The questionnaire consisted of several questions designed to gauge your gambling habits, emotional
             responses, and self-control levels. Your responses indicate the following:`,
            "Frequency of Gambling:",
            ["You reported engaging in gambling activities multiple times per week."],
            "Chasing Losses:",
            ["You admitted to frequently attempting to win back money after a loss."],
            "Emotional Responses:",
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
                "Schritt Eins",
                "Aufschlussreicher Fragebogen:",
                `Beginnen Sie Ihre Reise zu sicherem Glücksspiel mit unserem aufschlussreichen Fragebogen. 
                 Dieser schnelle und einfache Schritt hilft Ihnen, Ihr Glücksspielverhalten zu verstehen, indem er eine Reihe sorgfältig ausgearbeiteter Fragen stellt.`,
                `Schritt 2`,
                `Interaktives Bewertungsspiel:`,
                `Tauchen Sie ein in unser interaktives Bewertungsspiel, bei dem Spaß auf Erkenntnis trifft. Dieses fesselnde
                 und dynamische Spiel wurde entwickelt, um Ihre Risikotendenzen auf spielerische und dennoch genaue Weise einzuschätzen.`,
                "Schritt 3",
                "Persönliche Auswertung:",
                `Nach dem Fragebogen und dem interaktiven Spiel erhalten Sie eine umfassende Analyse Ihres Spielverhaltens. Unser detailliertes Feedback ist 
                 ist auf Sie zugeschnitten und bietet klare Erkenntnisse und umsetzbare Ratschläge, damit Sie die Kontrolle behalten.`,
                "Start"
            ]
        ,
        questionnaire: {
            text: ["Fragebogen", "Frage", "von", "Abschicken"],
            questions:
                [
                    "Sie empfinden sehr starke negative Gefühle, wenn Sie eine Wette verlieren.",
                    "Sie spielen oft mit mehr Geld, als Sie ursprünglich geplant hatten.",
                    "Sie haben versucht, das Glücksspiel einzuschränken, aber es ist Ihnen nicht gelungen.",
                    "Sie lügen Familienmitglieder oder Freunde an, wie viel Sie spielen.",
                    "Sie spielen, um Problemen zu entkommen oder um Ängste oder Depressionen zu überwinden.",
                    "Sie fühlen sich unruhig oder reizbar, wenn Sie versuchen, das Glücksspiel einzuschränken.",
                    "Sie hatten aufgrund des Glücksspiels finanzielle Probleme (z. B. wenn Sie sich Geld leihen mussten oder Rechnungen nicht bezahlt haben).",
                    "Sie denken oft über Glücksspiele nach (z. B. wenn Sie vergangene Glücksspiele wieder erleben und/oder zukünftige Glücksspiele planen).",
                    "Sie haben gespielt, um zu versuchen, verlorenes Geld zurückzugewinnen (Verlustjagd).",
                    "Sie haben wegen des Glücksspiels berufliche, schulische oder familiäre Pflichten vernachlässigt."
                ],
            options: ["Stimme überhaupt nicht zu", "Stimme nicht zu", "Neutral", "Stimme zu", "Stimme voll zu"]
        },
        gamePage: [
            "Zurück",
            "Nochmal spielen",
            "Spiel läuft"
        ]
        ,
        evaluationPage: [
            "Ihre personalisierten Bewertungsergebnisse",
            `Vielen Dank, dass Sie sich die Zeit genommen haben, unseren Fragebogen auszufüllen und an dem simulierten
            Münzspiel teilgenommen haben. Der Zweck dieser Auswertung ist es, Ihr Spielverhalten zu beurteilen und
             mögliche Risiken im Zusammenhang mit problematischem Glücksspiel zu erkennen. Auf der Grundlage Ihrer Antworten und Ihres Spielverhaltens,
              haben wir den folgenden Bericht erstellt.`,
            "Analyse des Fragebogens:",
            `Der Fragebogen bestand aus mehreren Fragen, mit denen Ihre Spielgewohnheiten, Ihre emotionalen
            Reaktionen und Selbstkontrolle zu messen. Ihre Antworten geben Aufschluss über die folgenden Punkte:`,
            "HäufigKeit des Spielens:",
            ["Sie gaben an, mehrmals pro Woche an Glücksspielen teilzunehmen."],
            "Die Jagd nach Verlusten:",
            ["Sie haben zugegeben, dass Sie häufig versucht haben, nach einem Verlust Geld zurückzugewinnen."],
            "Emotionale Reaktionen:",
            ["Sie fühlen sich oft ängstlich oder gestresst, wenn Sie ans Glücksspiel denken."]
        ]
    },
    current: "german"
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