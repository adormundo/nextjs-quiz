import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styles from '../styles/Temporizador.module.css';

interface TemporizadorProps {
  duracao: number;
  tempoEsgotado: () => void;
}

export default function Temporizador(props) {
  return (
    <div className={styles.temporizador}>
      <CountdownCircleTimer
        duration={props.duracao}
        size={120}
        isPlaying
        onComplete={props.tempoEsgotado}
        colors={['#7bff00', '#ffbf00', '#ff1100']}
        colorsTime={[7,5,0]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
    </div>
  );
}
