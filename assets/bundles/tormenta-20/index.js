/* eslint-disable */
palace.entity.register('attribute.for', {
    title: 'Força (FOR)',
    description: 'Seu poder muscular. A Força é aplicada em testes de Atletismo e Luta; rolagens de dano corpo a corpo ou com armas de arremesso, e testes de Força para levantar peso e atos similares.',
    pools: ['attribute'],
});
palace.entity.register('attribute.des', {
    title: 'Destreza (DES)',
    description: 'Sua agilidade, reflexos, equilíbrio e coordenação motora. A Destreza é aplicada na Defesa e em testes de Acrobacia, Cavalgar, Furtividade, Iniciativa, Ladinagem, Pilotagem, Pontaria e Reflexos.',
    pools: ['attribute'],
});
palace.entity.register('attribute.con', {
    title: 'Constituição (CON)',
    description: 'Sua saúde e vigor. A Constituição é aplicada aos pontos de vida iniciais e por nível e em testes de Fortitude. Se a Constituição muda, seus pontos de vida aumentam ou diminuem retroativamente de acordo.',
    pools: ['attribute'],
});
palace.entity.register('attribute.int', {
    title: 'Inteligencia (INT)',
    description: 'Sua capacidade de raciocínio, memória e educação geral. A Inteligência é aplicada em testes de Conhecimento, Guerra, Investigação, Misticismo, Nobreza e Ofício. Além disso, se sua Inteligência for positiva, você recebe um número de perícias treinadas adicionais igual ao valor dela. Essas perícias não precisam ser da sua classe.',
    pools: ['attribute'],
});
palace.entity.register('attribute.sab', {
    title: 'Sabedoria (SAB)',
    description: 'Sua observação, ponderação e determinação. A Sabedoria é aplicada em testes de Cura, Intuição, Percepção, Religião, Sobrevivência e Vontade.',
    pools: ['attribute'],
});
palace.entity.register('attribute.car', {
    title: 'Carisma (CAR)',
    description: 'Sua força de personalidade e capacidade de persuasão, além de uma mistura de simpatia e beleza. O Carisma é aplicado em testes de Adestramento, Atuação, Diplomacia, Enganação, Intimidação e Jogatina.',
    pools: ['attribute'],
});
palace.entity.register('aspect.attributes', {
    title: 'Atributos básicos',
    description: 'Todo personagem tem seis atributos, que definem suas competências básicas: Força, Destreza, Constituição, Inteligência, Sabedoria e Carisma. Atributos são medidos numericamente. Um valor 0 representa a média humana. Valores 1 ou 2 estão acima da média — o lenhador da vila, acostumado a trabalho pesado, pode ter Força nesse intervalo. Valores 3 ou 4 representam pessoas extraordinárias — o conselheiro real, que leu todos os livros da biblioteca do castelo, pode ter Inteligência nessa faixa. Valores de 5 ou mais representam indivíduos realmente heroicos. Já valores negativos estão abaixo da média. Um ancião de saúde frágil pode ter Constituição –1, por exemplo.',
    pools: ['aspect'],
    builderBehavior: (args) => {
        const [selectionMethod, attributes] = args ?? [];
        const points = {
            label: 'pontos',
            starting: 10,
            minValue: -1,
            maxValue: 4,
            cost: {
                '-1': -1,
                '0': 0,
                '1': 1,
                '2': 2,
                '3': 4,
                '4': 7,
            },
        };
        const getStatus = () => {
            if (['manual', 'roll'].includes(selectionMethod) && attributes) {
                const isEveryAttributeFilled = Object.values(attributes).every((v) => {
                    // TODO: related to issue #9
                    // return typeof v === 'number';
                    return v > v - 1 && v < v + 1;
                    // gambiarra, kinda works, but not really, but it's better than nothing
                });
                if (isEveryAttributeFilled) {
                    return 'ok';
                }
            }
            else if (selectionMethod === 'points' && attributes) {
                const totalCost = Object.values(attributes)
                    .reduce((sum, v) => {
                    return sum + points.cost[String(v)];
                }, 0);
                if (totalCost === points.starting) {
                    // spent all points
                    return 'ok';
                }
            }
            return 'warn';
        };
        return {
            getBuilderInfo: () => {
                return {
                    status: getStatus(),
                    fields: [
                        {
                            type: 'combo',
                            label: 'Método de seleção',
                            description: {
                                '': 'Você pode definir seus atributos de três formas diferentes.',
                                'points': '**Pontos:** Você começa com todos os atributos em 0 e recebe 10 pontos para comprar ou vender os atributos.',
                                'roll': '**Rolando:** Rolamos automaticamente os valores e você pode distribuir os valores nos atributos que quiser.',
                                'manual': '**Manual:** Preencha manualmente cada um dos campos.',
                            }[selectionMethod ?? ''],
                            placeholder: 'Escolha como definir seus atributos',
                            options: [
                                { display: 'Gastando pontos', value: 'points' },
                                { display: 'Rolando dados', value: 'roll' },
                                { display: 'Insersão Manual', value: 'manual' },
                            ],
                        },
                        {
                            if: Boolean(selectionMethod),
                            type: 'attributes',
                            label: 'Definindo Seus Atributos',
                            method: selectionMethod,
                            attributes: {
                                'attribute.for': 'Força',
                                'attribute.des': 'Destreza',
                                'attribute.con': 'Constituição',
                                'attribute.int': 'Inteligência',
                                'attribute.sab': 'Sabedoria',
                                'attribute.car': 'Carisma',
                            },
                            rolling: '{(4d6dl1-10)/2, {-2}}kh1',
                            points,
                        },
                    ],
                };
            },
            updateSheet: (sheet, _builder) => {
                if (!sheet.attributes) {
                    sheet.attributes = {
                        for: 0,
                        des: 0,
                        con: 0,
                        int: 0,
                        sab: 0,
                        car: 0,
                    };
                }
                if (!attributes)
                    return sheet;
                sheet.attributes.for = attributes['attribute.for'] ?? 0;
                sheet.attributes.des = attributes['attribute.des'] ?? 0;
                sheet.attributes.con = attributes['attribute.con'] ?? 0;
                sheet.attributes.int = attributes['attribute.int'] ?? 0;
                sheet.attributes.sab = attributes['attribute.sab'] ?? 0;
                sheet.attributes.car = attributes['attribute.car'] ?? 0;
                return sheet;
            },
        };
    },
    composePhase: true,
});
palace.entity.register('aspect.race', {
    composePhase: true,
    title: 'Raças',
    description: [
        'As raças de Arton são muito variadas entre si. Na maior parte do mundo',
        'civilizado um personagem não será hostilizado por pertencer a qualquer raça.',
        'Contudo, alguns antros de vilania podem nutrir verdadeiro ódio por determinadas',
        'raças — a Supremacia Purista, por exemplo, despreza não humanos. A exceção a',
        'isso são os lefou. Tocados pela Tormenta, a maior ameaça deste mundo, os lefou',
        'atraem medo em todos os reinos.',
        '',
        'Algumas raças são mais numerosas ou têm papel predominante na história de Arton',
        '— humanos, anões, dahllan, elfos, goblins, lefou, minotauros e qareen. O povo',
        'do continente está acostumado a ver membros dessas raças. Uma vila humana pode',
        'ter um ferreiro anão, por exemplo, e ninguém ficará surpreso.',
        '',
        'Mas essas não são as únicas raças de Arton. Dentre toda a variedade dos seres',
        'deste mundo, há um grupo de raças mais raras: golens, hynne, kliren, medusas,',
        'osteon, sereias, sílfides, suraggel e trogs. A maioria das pessoas nunca viu um',
        'membro dessas raças. Pode considerar que são míticas, que foram extintas ou que',
        'jamais pisaram no continente. Um membro dessas raças pode atrair curiosidade,',
        'espanto ou até medo por onde passar. Em termos de jogo, essas raças possuem',
        'mecânicas mais avançadas e são indicadas para jogadores veteranos.',
        '',
        'Quase todas as grandes sagas artonianas são sobre grupos de diferentes raças.',
        'Aventureiros aprendem a ver o melhor em cada indivíduo e, ao longo de uma vida',
        'de viagens e batalhas, acostumam-se até mesmo ao mais exótico companheiro.',
        '',
        '### Escolhendo sua Raça',
        '',
        'Após definir seus atributos, é hora de escolher sua raça. Você pode escolher',
        'qualquer raça, mas dependendo do seu conceito de personagem, algumas são mais',
        'indicadas que outras.',
        '',
        'Se você quiser um personagem bom de briga, por exemplo, minotauro é uma boa',
        'escolha. Se gosta de lançar magias, vá de elfo. Já se prefere resolver seus',
        'problemas na lábia, escolha qareen. Da mesma forma, algumas raças não são',
        'indicadas para certos conceitos. Um trog estudioso provavelmente não será muito',
        'competente, assim como um hynne brigão. Humanos são um caso especial — são a',
        'raça mais versátil, capazes de se destacar em qualquer carreira. Se estiver em',
        'dúvida, vá de humano.',
        '',
        'Como dito acima, todas as raças funcionam para todos os tipos de personagem, e',
        'fazer combinações inusitadas pode ser muito divertido. Mas, se você for um',
        'jogador iniciante, prefira uma raça que forneça um bônus no atributo principal',
        'de sua classe.',
    ].join('\n'),
    pools: ['aspect'],
    builderBehavior: ([race] = []) => {
        return {
            getBuilderInfo: () => {
                return {
                    status: race ? 'ok' : 'warn',
                    fields: [
                        {
                            type: 'combo',
                            label: 'Escolha a raça que vai jogar:',
                            options: Object.entries(palace.entity.getAll()).filter(([_, entity]) => {
                                return entity.pools.includes('race');
                            }).map(([id, entity]) => {
                                return {
                                    display: entity.title,
                                    value: id,
                                };
                            }),
                        },
                    ],
                };
            },
            updateSheet: (sheet, builder) => {
                if (race) {
                    sheet.race = race;
                    builder.add(race);
                }
                return sheet;
            },
        };
    },
});
palace.entity.register('race.human', {
    title: 'Humano',
    description: [
        'O povo mais numeroso em Arton, humanos são considerados os escolhidos dos',
        'deuses, aqueles que governam o mundo. Em sua variedade e adaptabilidade, são',
        'encontrados em quase todos os pontos do continente — dos vales férteis do',
        'Reinado às vastidões áridas do Deserto da Perdição. São exploradores e',
        'desbravadores ambiciosos, sempre buscando algo além.',
        '',
        '### Habilidades de Raça',
        '',
        '**+1 em Três Atributos Diferentes.** Filhos de Valkaria, Deusa da Ambição,',
        'humanos podem se destacar em qualquer caminho que escolherem.',
        '',
        '**Versátil.** Você se torna treinado em duas perícias a sua escolha (não',
        'precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder',
        'geral a sua escolha.',
    ].join('\n'),
    pools: ['race'],
    builderBehavior: ([] = []) => {
        return {
            getBuilderInfo: () => {
                return {
                    status: 'ok',
                    fields: [
                    // {
                    // },
                    ],
                };
            },
            updateSheet: (sheet, _builder) => {
                return sheet;
            },
        };
    },
});
palace.entity.register('race.dwarf', {
    title: 'Anão',
    description: [
        'Anões são o mais resiliente dos povos. Em suas cidadelas subterrâneas,',
        'trabalham duro escavando minas e forjando metal em belas armas, armaduras e',
        'joias. São honestos e determinados, honrando a família e a tradição. Apesar',
        'de sua profunda paixão por forja e cerveja, pouca coisa é mais preciosa',
        'para um anão que cultivar uma barba longa e orgulhosa.',
        '',
        '### Habilidades de Raça',
        '',
        '**Constituição +2, Sabedoria +1, Destreza –1.**',
        '',
        '**Conhecimento das Rochas.** Você recebe visão no escuro e +2 em testes de',
        'Percepção e Sobrevivência realizados no subterrâneo.',
        '',
        '**Devagar e Sempre.** Seu deslocamento é 6m (em vez de 9m). Porém, seu',
        'deslocamento não é reduzido por uso de armadura ou excesso de carga.',
        '',
        '**Duro como Pedra.** Você recebe +3 pontos de vida no 1º nível e +1 por nível',
        'seguinte.',
        '',
        '**Tradição de Heredrimm.** Você é perito nas armas tradicionais anãs, seja por',
        'ter treinado com elas, seja por usá-las como ferramentas de ofício. Para você,',
        'todos os machados, martelos, marretas e picaretas são armas simples. Você',
        'recebe +2 em ataques com essas armas.',
    ].join('\n'),
    pools: ['race'],
    builderBehavior: ([] = []) => {
        return {
            getBuilderInfo: () => {
                return {
                    status: 'ok',
                    fields: [
                    // {
                    // },
                    ],
                };
            },
            updateSheet: (sheet, _builder) => {
                return sheet;
            },
        };
    },
});
