import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import rulebook from '../images/Laberinto.pdf'
const Rules = () => {
    return ( 
        <div className='rulebook-page'>
        <Document file={rulebook}>
            <Page pageNumber='1'/>
        </Document>
        </div>
     );
}
 
export default Rules;