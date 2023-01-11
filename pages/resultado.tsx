import styles from '../styles/Resultado.module.css';
import { useRouter } from 'next/router';
import Estatistica from '../components/Estatistica';
import Botao from '../components/Botao';

export default function resultado() {
  const router = useRouter();

  const total = +router.query.total;
  const certas = +router.query.certas;
  const percentual = Math.round((certas / total) * 100);

  return (
    <div className={styles.resultado}>
      <h1>Resultado Final</h1>
      <div style={{ display: 'flex' }}>
        <Estatistica texto="Perguntas" valor={total} corFundo="#9CD2A4" />
        <Estatistica texto="Certas" valor={certas} />
        <Estatistica texto="Percentual" valor={`${percentual}%`} corFundo="#DE6A33" />
      </div>
      <Botao href="/" texto='Tentar Novamente'/>
    </div>
  );
}
