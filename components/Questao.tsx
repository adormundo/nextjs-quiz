import Enunciado from './Enunciado';
import Resposta from './Resposta';
import QuestaoModel from '../model/questao';
import styles from '../styles/Questao.module.css';
import Temporizador from './Temporizador';

const letras = [
  {valor: 'A', cor: '#927200'},
  {valor: 'B', cor: '#df00a0'},
  {valor: 'C', cor: '#00819e'},
  {valor: 'D', cor: '#568300'},
]

interface QuestaoProps {
  valor: QuestaoModel;
  tempoPraResposta?: number
  respostaFornecida: (indice: number) => void
  tempoEsgotado: () => void
}

export default function Questao(props: QuestaoProps) {
  const questao = props.valor;

  function renderizarRespostas() {
    return questao.respostas.map((resposta, i) => {
      return (
        <Resposta
          key={i}
          valor={resposta}
          indice={i}
          letra={letras[i].valor}
          corFundoLetra={letras[i].cor}
          respostaFornecida={props.respostaFornecida}
        />
      );
    });
  }

  return (
    <div className={styles.questao}>
      <Enunciado texto={questao.enunciado} />
      <Temporizador duracao={props.tempoPraResposta ?? 10} tempoEsgotado={props.tempoEsgotado}/>
      {renderizarRespostas()}
    </div>
  );
}
