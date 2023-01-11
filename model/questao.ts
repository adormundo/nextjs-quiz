import { embaralhar } from '../functions/arrays';
import RespostaModel from './resposta';

export default class QuestaoModel {
  #id: number;
  #enunciado: string;
  #respostas: RespostaModel[];
  #acertou: boolean;
  // #respondida: boolean

  constructor(
    id: number,
    enunciado: string,
    respostas: RespostaModel[],
    acertou = false,
  ) {
    this.#id = id;
    this.#enunciado = enunciado;
    this.#respostas = respostas;
    this.#acertou = acertou;
  }

  public get id(): number {
    return this.#id;
  }

  public get enunciado(): string {
    return this.#enunciado;
  }

  public get respostas(): RespostaModel[] {
    return this.#respostas;
  }

  public get acertou(): boolean {
    return this.#acertou;
  }

  public get naoRespondida() {
    return !this.respondida;
  }

  public get respondida(): boolean {
    for (let resposta of this.#respostas) {
      if (resposta.revelada) return true;
    }
    return false;
  }

  responderCom(indice: number): QuestaoModel {
    const acertou = this.#respostas[indice]?.certa;
    const respostas = this.#respostas.map((resposta, i) => {
      const respostaSelecionada = indice === i;
      const deveRevelar = respostaSelecionada || resposta.certa;
      return deveRevelar ? resposta.revelar() : resposta;
    });
    return new QuestaoModel(this.id, this.enunciado, respostas, acertou);
  }

  embaralharRespostas(): QuestaoModel {
    let respostasEmbaralhadas = embaralhar(this.#respostas);
    return new QuestaoModel(
      this.#id,
      this.#enunciado,
      respostasEmbaralhadas,
      this.#acertou,
    );
  }

  static fromObject(obj: QuestaoModel): QuestaoModel {
    const respostas = obj.respostas.map(resp => RespostaModel.fromObject(resp))
    return new QuestaoModel(obj.id, obj.enunciado, respostas, obj.acertou)

  }

  toObject() {
    return {
      id: this.#id,
      enunciado: this.#enunciado,
      respondida: this.respondida,
      acertou: this.#acertou,
      respostas: this.#respostas.map((resposta) => resposta.toObject()),
    };
  }
}
