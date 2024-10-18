import React, { useEffect, useRef, useState } from 'react';

const GameComponent = ({ onGameOver, onGameQuit }) => {
    const iframeRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameScores, setGameScore] = useState([]);

    const startGame = () => {
        setGameStarted(true);
        if (iframeRef.current) {
            iframeRef.current.contentWindow.postMessage('start_game', '*');
        }
    };
    

    useEffect(() => {
        const loadGame = () => {            
            if (iframeRef.current) {
                iframeRef.current.src = 'http://localhost:3000/build/web/index.html';                
            }
        };

        const handleBeforeUnload = (event) => {
            event.preventDefault();
            event.returnValue = ''; // This line is necessary for some browsers
        };

        const handleMessage = (event) => {            
            console.log("Received message:", event.data);
            if (typeof event.data !== 'string' || event.data==='' || event.data.includes('setImmediate')) return;
            let data = JSON.parse(event.data);

            console.log(typeof data);
            if (data && data.type === 'GAME_OVER') {
                console.log("Game Over received");
                setGameScore([...gameScores, data]);
                console.log('gameComponent line 37: ', data);
                onGameQuit(data.game_sessions);
                window.removeEventListener('beforeunload', handleBeforeUnload);
            } else if (data && data.type === 'GAME_QUIT') {
                console.log("Game Quit received");
                onGameQuit(gameScores);
                window.removeEventListener('beforeunload', handleBeforeUnload);
            }
        };
        
        loadGame();
        
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('message', handleMessage);            
        };
    }, [onGameOver, onGameQuit]);

    return (
        <div>
            <iframe
                ref={iframeRef}
                title="Pygame Game"
                width="1280"
                height="720"
                style={{ border: 'none' }}
                allow="autoplay"
            />
        </div>
    );
};

export default GameComponent;