import './App.css'
import { AppCalculator } from './AppCalculator'
import { AppHeader } from './AppHeader'
import { useState } from 'react';

export default function App() {
  const [czcionka, setCzcionka] = useState('small');

  return (
    <div className="app" style={{ fontSize: czcionka }}>
      <div>
        <AppHeader imie={'Imię'} nazwisko={'Nazwisko'} onZmianaCzcionki={(val) => setCzcionka(val)}/>
      </div>
      <div>
        <AppCalculator />
      </div>
    </div>
  )
}
