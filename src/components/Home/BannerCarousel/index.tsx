import { Carousel } from "react-bootstrap";

import Image from "next/image";

function BannerCarousel() {
  return (
    <Carousel >
      <Carousel.Item  style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Image
         sizes="100vw"
         fill
         priority
          src="/images/1.jpg"
          alt="First slide"
        />
        <Carousel.Caption >
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Image
        fill
        priority={false}
            sizes="100vw"
          src="/images/2.jpg"
          alt="Second slide"
        />

        <Carousel.Caption >
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Image
        fill
        priority={false}
          sizes="100vw"
          src="/images/3.jpg"
          alt="Second slide"
        />

        <Carousel.Caption >
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default BannerCarousel;
