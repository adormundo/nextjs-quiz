import { useEffect, useState } from 'react';
import Questionario from '../components/Questionario';
import QuestaoModel from '../model/questao';
import RespostaModel from '../model/resposta';

const questaoMock = new QuestaoModel(1, 'Melhor cor?', [
  RespostaModel.errada('Verde'),
  RespostaModel.errada('Vermelha'),
  RespostaModel.errada('Azul'),
  RespostaModel.certa('Preta'),
]);

const BASE_URL = 'http://localhost:3000/api';

export default function Home() {
  const [idsDasQuestoes, setIdsDasQuestoes] = useState<number[]>();
  const [questao, setQuestao] = useState<QuestaoModel>(questaoMock);
  const [respostasCertas, setRespostasCertas] = useState<number>(0);

  useEffect(() => {
    carregarIdsDasQuestoesIds();
  }, []);

  useEffect(() => {
    idsDasQuestoes?.length > 0 && carregarQuestao(idsDasQuestoes[0]);
  }, [idsDasQuestoes]);

  async function carregarIdsDasQuestoesIds() {
    const resp = await fetch(`${BASE_URL}/questionario`);
    const idsDasQuestoes = await resp.json();
    setIdsDasQuestoes(idsDasQuestoes);
  }

  async function carregarQuestao(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`);
    const json = await resp.json();
    const novaQuestao = QuestaoModel.fromObject(json);
    setQuestao(novaQuestao);
  }

  function questaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida);
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function irPraProximoPasso() {}

  return (
    <div>
      <Questionario
        questao={questao}
        ultima={false}
        questaoRespondida={questaoRespondida}
        irPraProximoPasso={irPraProximoPasso}
      />
    </div>
  );
}
