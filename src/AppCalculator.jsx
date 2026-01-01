import './AppCalculator.css';
import { useState } from 'react';
import { AppButton } from './AppButton';
import { AppCalculationHistory } from './AppCalculationHistory';

export function AppCalculator() {
    const [liczbaA, setLiczbaA] = useState(null);
    const [liczbaB, setLiczbaB] = useState(null);
    const [wynik, setWynik] = useState(null);
    const [historia, setHistoria] = useState([]);

    function dodaj() {
        aktualizujHistorie('+', liczbaA + liczbaB);
    }

    function odejmij() {
        aktualizujHistorie('-', liczbaA - liczbaB);
    }

    function pomnoz() {
        aktualizujHistorie('*', liczbaA * liczbaB);
    }

    function podziel() {
        if(liczbaB !== 0) {
            aktualizujHistorie('/', liczbaA / liczbaB);
        }
    }

    function liczbaAOnChange(value) {
        setLiczbaA(parsujLiczbe(value));
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
    }

    function onAppCalculationHistoryClick(index) {
        const nowaHistoria = historia.slice(0, index + 1);
        setHistoria(nowaHistoria);
        setLiczbaA(historia[index].a);
        setLiczbaB(historia[index].b);
        setWynik(historia[index].wynik);
    }

    function aktualizujHistorie(operation, wynik) {
        const nowaHistoria = [...historia, { a: liczbaA, b: liczbaB, operation: operation, wynik: wynik }];
        setHistoria(nowaHistoria);
        setWynik(wynik);
    }

    let porownanie;
    let zablokujPrzyciski = liczbaA == null || liczbaB == null;
    let zablokujDzielenie = zablokujPrzyciski || liczbaB === 0;

    if(zablokujPrzyciski) 
    {
        porownanie = '';
    } 
    else 
    {
        if(liczbaA === liczbaB) {
            porownanie = 'Liczba A jest równa liczbie B.';
        } else if(liczbaA > liczbaB) {
            porownanie = 'Liczba A jest większa od liczby B.';
        } else {
            porownanie = 'Liczba B jest większa od liczby A.';
        }
    }

    return (
    <div className='app-calculator'>
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
            <AppButton disabled={zablokujPrzyciski} title="+" onClick={() => dodaj()}/>
            <AppButton disabled={zablokujPrzyciski} title="-" onClick={() => odejmij()}/>
            <AppButton disabled={zablokujPrzyciski} title="*" onClick={() => pomnoz()}/>
            <AppButton disabled={zablokujDzielenie} title="/" onClick={() => podziel()}/>
        </div>

        <hr />
        
        <div className='app-calculator-historia'>
            <AppCalculationHistory historia={historia} onClick={(index) => onAppCalculationHistoryClick(index)}/>
        </div>
    </div>)
}