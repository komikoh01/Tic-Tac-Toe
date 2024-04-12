import '../stylesheets/Square.css'

export const Square = ( { children, onSquareClick, winner } )=>{

    return(
        <div className="square" onClick={ onSquareClick }> { children } </div>
    );
}