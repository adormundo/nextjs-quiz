import { embaralhar } from '../../../functions/arrays';
import questoes from '../questoes/BDQuestoes';

export default function handle(req, res) {
  const ids = questoes.map((questao) => questao.id)
  res.status(200).json(embaralhar(ids))
}
