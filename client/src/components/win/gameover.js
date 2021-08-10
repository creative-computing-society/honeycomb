import './gameover.css'
const gameOver = () => {
    return ( 
        <div className="game-won">
        <center><h1 className='title' >Thank you for participating and Congratulations!</h1></center>
            <center>
                <img className= 'you-did-it' src="https://c.tenor.com/Y3ylJTeYwHgAAAAC/jeff-goldblum-crazy-son-of-a-bitch.gif" alt="" />
            </center>
            
        </div>
     );
}
 
export default gameOver;