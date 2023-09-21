// import MapCompTest from './MapCompTest';
//import SearchRealtorComponent from '../FindMyRealtor/SearchRealtorComponent';
import FreeDrawComp from './FreeDrawComp';

function TestPage() {
  return (
    <div>
        <h1>Find min ejendomsmægler</h1>
        <p>Der skal laves en funktion der beregner boliger for det valgte postnummer,
            så det ikke er ejendomsmægler totale antal boliger til salg,
            men kun for det valgte postnummer
        </p>
        <div>
          <FreeDrawComp/>
        </div>
    </div>
  );
}

export default TestPage;