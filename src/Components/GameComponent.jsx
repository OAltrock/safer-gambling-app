import React, { useEffect, useRef, useState } from 'react';

const GameComponent = ({ onGameOver, onGameQuit }) => {
    const iframeRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    
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

        const handleMessage = (event) => {
            
            let data = JSON.parse(event.data);
            console.log("Received message:", data);
            console.log(typeof data);
            if (data && data.type === 'GAME_OVER') {
                console.log("Game Over received");
                onGameOver(data.game_sessions);
            } else if (data && data.type === 'GAME_QUIT') {
                console.log("Game Quit received");
                onGameQuit();
            }
        };

        loadGame();        
        window.addEventListener('message', handleMessage);

        return () => {
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