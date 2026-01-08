import './AppHeader.css';
import { FontContext } from './FontProvider';
import { useContext } from 'react';

export function AppHeader({imie, nazwisko, onZmianaCzcionki}) {
    const czcionki = ['small', 'medium', 'large'];
    const { czcionka, setCzcionka } = useContext(FontContext);

    return (
        <div className="app-header" style={{ fontSize: czcionka }}>
            <h2>{imie} {nazwisko}</h2>
            <div className="app-header-czcionki">
                {czcionki.map(c => (<span key={c} title={c} onClick={() => setCzcionka(c)} style={{ fontSize: c }}>A</span>))}
            </div>
        </div>
    );
}