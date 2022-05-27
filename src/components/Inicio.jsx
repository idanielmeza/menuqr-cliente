import {useState,useEffect} from 'react';
import Card from './Card';

const Inicio = () => {

    const negocio = window.location.pathname.replace('/', '');

    const [productos,setProductos] = useState([]);
    const [categorias,setCategorias] = useState([{id: 1,nombre: 'Test'}]);
    const [limite,setLimite] = useState(5);
    const [pagina,setPagina] = useState(1);
    const [categoria,setCategoria] = useState('');
    const [total,setTotal] = useState(5);

    const inicio = async()=>{
        const {categorias:cat} = await (await fetch(`http://${window.location.hostname}:4000/categorias/all?negocio=${negocio}`)).json();
        if(cat.length === 0){
            return setCategorias([{id: 1, nombre:'No se encontro informacion de este menu.'}])
        }
        setCategorias(cat);

        if(categorias.length && categoria == ''){
            setCategoria(categorias[0].id);
        }

        const {productos:products=[], total=5} = await (await fetch(`http://${window.location.hostname}:4000/productos/categoria/${categoria}?negocio=${negocio}&pagina=${pagina}&limite=${limite}`)).json();

        setProductos(products);
        setTotal(total);
    }

    useEffect(()=>{

        console.log('entrando')

        const init = async()=>{
            await inicio();
        }

        init();

    },[pagina,limite,categoria])

    if(!negocio){
        return <p>Error 404 Page Not Found</p>
    }

    return ( 
        <div className='container mx-auto'>
            <h2>{negocio.replaceAll('-', ' ')}</h2>

            <select 
                onChange={ (e)=> setCategoria(e.target.value)}
                className='form-select'>
                {categorias.map(cat=>(
                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
            </select>        

            <div className='d-flex justify-content-end'>
                <div>
                    <span className='text-muted text-center'>Productos por pagina</span>
                    <select 
                        onChange={ (e)=> {
                            setPagina(1)
                            setLimite(e.target.value)
                        }}
                    className="form-select">
                        <option value='5'>5</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                    </select>
                </div>
                
            </div>
            
            <div className='d-flex flex-wrap justify-content-center'>

            {
                productos.length ?
                productos.map(product=>(
                    <Card key={product.id} info={product}/>
                ))
                :
                <p className='text-center'>Por el momento no se encuentran productos para esta categoria.</p>
            }
            </div>

            <nav>
                <ul className='pagination justify-content-center my-2'>
                    {
                        pagina > 1 ?
                        <li 
                            onClick={()=> setPagina(pagina-1)}
                        className='page-link mx-2'>Anterior</li>
                        : null
                    }
                    
                    {
                        pagina * limite < total ?
                        <li
                            onClick={()=> setPagina(pagina+1)}
                        className='page-link mx-2'>Siguiente</li>
                        : null
                    }
                    
                </ul>
            </nav>

        </div>
     );
}
 
export default Inicio;