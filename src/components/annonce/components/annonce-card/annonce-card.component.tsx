import "./annonce-card.component.scss";

const AnnonceCardComponent = () => {
  return (
    <div className="annonce-card">
      <div className="container">
        <div className="image">
          <img src="/mercedes.jpg" alt="" />
        </div>
        <div className="text">
          <div className="vehicule-name">Mercedes Benz - E class AMG</div>
          <div className="vehicule-info">
            <span className="prix">12 000 000 MGA</span>
            <span className="author">Rakoto Jean</span>
            <span className="photo-number">4</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnonceCardComponent;
