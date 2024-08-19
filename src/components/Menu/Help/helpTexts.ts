import imgHome from '../../../assets/img/home.png'
//  Home,
//  Horários dos Ônubus,
//  Sobre Nós,
//  Pontos de Ônibus,
//  Editar Ponto de Ônibus,
//  Criar Ponto de Ônibus,
//  Viagens de Ônibus,
//  Editar Viagens de Ônibus,
//  Criar Viagens de Ônibus,
//  Horários dos Ônibus,
//  Editar os Horários dos Ônibus,
//  Criar Horário dos Ônibus,
export interface HelpTextFocus {
    top: number;
    left: number;
    width: number;
    height: number;
}
export interface HelpText {
    help: Array<{
        highlight: string,
        text: string,
        focus: HelpTextFocus
    }>,
    title: string,
    img: string;
}

export const helpTexts: HelpText[] = [
    {
        help: [
            {
                highlight: 'Selecione os Pontos de Partida e Chegada',
                text: 'Você pode escolher de onde você está saindo e para onde deseja ir usando os menus de seleção disponíveis.',
                focus: {
                    height: 20,
                    left: 10,
                    top: 2,
                    width: 90,
                }
            }
            , {
                highlight: 'Veja a Rota no Mapa',
                text: 'Depois de selecionar os pontos, a página calcula a melhor rota entre eles e mostra essa rota em um mapa.',
                focus: {
                    height: 20,
                    left: 0,
                    top: 0,
                    width: 100,
                }
            }],
        title: 'Home',
        img: imgHome,
    }
]