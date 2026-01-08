import './AppCalculator.css';
import { useState, useEffect, useReducer } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';
import { useCalculator } from './useCalculator';
import { lastActionReducer } from './lastActionReducer'

export function AppCalculator() {
    const [liczbaA, setLiczbaA] = useState(null);
    const [liczbaB, setLiczbaB] = useState(null);
    const [wynik, setWynik] = useState(null);
    const [historia, setHistoria] = useState([]);
    const [porownanie, setPorownanie] = useState(null)

    // stan startowy
    const [ostatniaCzynnosc, dispatch] = useReducer(lastActionReducer, 'Brak');

    // nadawanie wartości zmiennej porownanie
    useEffect(() => {
        if (liczbaA == null || liczbaB == null){
            setPorownanie('');
        } else if(liczbaA === liczbaB) {
            setPorownanie('Liczba A jest równa liczbie B.');
        } else if(liczbaA > liczbaB) {
            setPorownanie('Liczba A jest większa od liczby B.');
        } else {
            setPorownanie('Liczba B jest większa od liczby A.');
        }
    }, [liczbaA, liczbaB]);

    // zapis do sessionStorage przy zmianie w historii jeśli nie jest pusta
    useEffect(() => {
        if (historia.length > 0) {
            sessionStorage.setItem('historia', JSON.stringify(historia));
        }
    }, [historia]);


    // odczyt historii z session storage
    useEffect(() => {
        const zapisanaHistoria = sessionStorage.getItem('historia');

        if (zapisanaHistoria) {
            const historiaStorage = JSON.parse(zapisanaHistoria);
            setHistoria(historiaStorage);

            const ostatniElement = historiaStorage[historiaStorage.length - 1];

            if (ostatniElement) {
                setLiczbaA(ostatniElement.a);
                setLiczbaB(ostatniElement.b);
                setWynik(ostatniElement.wynik);
            }
        }
    }, []);

    // własny hook useCalculator
    const { dodaj, odejmij, pomnoz, podziel } = useCalculator({liczbaA, liczbaB, historia, setHistoria, setWynik});

    function liczbaAOnChange(value) {
        setLiczbaA(parsujLiczbe(value));
        dispatch({ type: 'ZMIANA_A' });
    }

    function parsujLiczbe(value) {
        const sparsowanaLiczba = parseFloat(value);
        if(isNaN(sparsowanaLiczba)) {
            return null;
        } else {
            return sparsowanaLiczba;
        } 
    }

    function liczbaBOnChange(value) {
        setLiczbaB(parsujLiczbe(value));
        dispatch({ type: 'ZMIANA_B' });
    }

    function onAppCalculationHistoryClick(index) {
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        setLiczbaA(historia[index].a);
        setLiczbaB(historia[index].b);
        setWynik(historia[index].wynik);
        dispatch({ type: 'PRZYWROCENIE' });
    }


    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    return (
    <div className='app-calculator'>
        <div className='app-calculator-pole'>
            <label>Ostatnia czynność: </label>
            <span>{ostatniaCzynnosc}</span>
        </div>

        <div className='app-calculator-pole'>
            <label>Wynik: </label>
            <span>{wynik}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label>Dynamiczne porównanie liczb: </label>
            <span>{porownanie}</span>
        </div>

        <hr />

        <div className='app-calculator-pole'>
            <label htmlFor="liczba1">Liczba 1</label>
            <input id="liczba1" type="number" value={liczbaA} onChange={(e) => liczbaAOnChange(e.target.value)} name="liczba1" />
        </div>
        <div className='app-calculator-pole'>
            <label htmlFor="liczba2">Liczba 2</label>
            <input id="liczba2" type="number" value={liczbaB} onChange={(e) => liczbaBOnChange(e.target.value)} name="liczba2" />
        </div>

        <hr />

        <div className='app-calculator-przyciski'>
            <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => { dodaj(); dispatch({ type: 'OBLICZENIE' }); }}/>
            <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => { odejmij(); dispatch({ type: 'OBLICZENIE' }); }}/>
            <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => { pomnoz(); dispatch({ type: 'OBLICZENIE' }); }}/>
            <AppButton disabled={zablokujDzielenie} title="/" onClick={() => { podziel(); dispatch({ type: 'OBLICZENIE' }); }}/>
        </div>

        <hr />
        
        <div className='app-calculator-historia'>
            <AppCalculationHistory historia={historia} onClick={(index) => onAppCalculationHistoryClick(index)}/>
        </div>
    </div>)
}
