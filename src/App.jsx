import './App.css'
import { AppCalculator } from './AppCalculator'
import { AppHeader } from './AppHeader'
import FontProvider from './FontProvider'

export default function App() {
  return (
    <FontProvider>
      <div className="app">
        <AppHeader imie={'Imię'} nazwisko={'Nazwisko'} />
        <AppCalculator />
      </div>
    </FontProvider>
  )
}
