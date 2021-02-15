class FetchGit {
    constructor() {
        this.player2url = 'https://reactmarathon-api.netlify.app/api/create-player';
        this.boardUrl = 'https://reactmarathon-api.netlify.app/api/board';
        this.boardGameUrl = 'https://reactmarathon-api.netlify.app/api/players-turn';
    }

    getPlayer2Card = async () => {
        const player2Response = await fetch(this.player2url);
        const request = await player2Response.json(); 

        return request.data; 
    };

    getBoard = async () => {
        const boardResponse = await fetch(this.boardUrl);
        const boardRequest = await boardResponse.json();

        return boardRequest.data;
    };

    handlerLogicBoard = async params => {
        const postParams = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params),
        }
        const res = await fetch(this.boardGameUrl, postParams);

        const request = await res.json();

        return request.data;
    };


}

export default FetchGit;