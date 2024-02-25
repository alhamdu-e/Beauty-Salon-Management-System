import "../assets/styles/services.css";

function Services() {
  return (
    <div>
      <p className="servicefeature">Services</p>
      <hr className="servicehr" />
      <div className="service-provided">
        <div>
          <img src="./images/G10.jpg" alt="" className="service-image" />
          <p className="servicetype">MakeUp</p>
          <p className="servicetype-description">
            Enhance your natural beauty and take your look to the next level
            with our makeup collection.
          </p>
          <a className="more" href="">
            More
          </a>
        </div>
        <div>
          <img src="./images/G12.jpg" alt="" className="service-image" />
          <p className="servicetype">Nail Design</p>
          <p className="servicetype-description">
            Make a statement with our captivating nail designs and let your
            fingertips do the talking
          </p>
          <a href="" className="more">
            More
          </a>
        </div>
        <div>
          <img src="./images/G7.jpg" alt="" className="service-image" />
          <p className="servicetype">Hair Braids</p>
          <p className="servicetype-description">
            Get ready to turn heads with stunning hair braids that elevate your
            look to the next level
          </p>
          <a href="" className="more">
            More
          </a>
        </div>
      </div>
    </div>
  );
}
export default Services;
