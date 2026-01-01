import './AppHeader.css';

export function AppHeader({imie, nazwisko, onZmianaCzcionki}) {
    const czcionki = ['small', 'medium', 'large'];

    return (
        <div className="app-header">
            <h2>{imie} {nazwisko}</h2>
            <div className="app-header-czcionki">
                {czcionki.map(c => (<span key={c} title={c} onClick={() => onZmianaCzcionki(c)} style={{ fontSize: c }}>A</span>))}
            </div>
        </div>
    );
}