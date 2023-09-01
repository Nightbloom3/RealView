import "./FindMyRealtor.css";
import SearchRealtorComponent from './SearchRealtorComponent';

function FindMyRealtor() {
  return (
    <div>
        <h1>Find min ejendomsmægler</h1>
        <p>Der skal laves en funktion der beregner boliger for det valgte postnummer,
            så det ikke er ejendomsmægler totale antal boliger til salg,
            men kun for det valgte postnummer
        </p>
        <SearchRealtorComponent />
    </div>
  );
}

export default FindMyRealtor;