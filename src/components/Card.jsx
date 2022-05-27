const Card = ({info}) => {
    const {nombre,precio,descripcion} = info;

    return ( 
        <div className='card text-center mx-2 mt-2' style={{width:'15rem'}}>
            <div className='card-body'>
                <h5 className='card-title'>{nombre}</h5>
                <p className='card-text'>{descripcion}</p>
            </div>
            <div className='card-body'>
                <button className='btn btn-primary'>${precio}</button>
            </div>
        </div>
     );
}
 
export default Card;