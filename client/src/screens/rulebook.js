
import { Carousel } from 'react-bootstrap';
import page1 from '../images/Rulebook1.png';
import page2 from '../images/Rulebook2.png';
import page3 from '../images/Rulebook3.png';

const Rules = () => {
    return ( 
        <div className='rulebook-page'>
        <center>
       <Carousel className="rulebook-display" interval={null}>
  <Carousel.Item className='pages'>
    <img
      className="d-block w-100 pages"
      src={page1}
      alt="First slide"
    />

  </Carousel.Item>
  <Carousel.Item className='pages'>
    <img
      className="d-block w-100 pages"
      src={page2}
      alt="Second slide"
    />

  </Carousel.Item>
  <Carousel.Item className='pages'>
    <img
      className="d-block w-100 pages"
      src={page3}
      alt="Third slide"
    />

  </Carousel.Item>
</Carousel>
</center>
        </div>
     );
}
 
export default Rules;