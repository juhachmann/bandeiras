## Iteração Atual

### Testes de regras de negócio de geração de questões:

Testar apenas a API pública do pacote (classe `Game`)

Regras a testar / documentar: 

Qualquer jogo:
- Deve retornar uma lista de questões embaralhadas (deve ser diferente a cada vez)
- Deve retornar uma ordem de questões, que deve ser uma lista de números que correspondam exatamente ao índice da lista de questões, porém, desordenados
- A ordem de questões deve ser diferente da lista de questões
- Invocar as questões a partir de seu índice da lista de questões NUNCA deve gerar um null pointer exception
- Deve manter um controle de qual questão está
- Ao enviar uma resposta, deve: 
  - incrementar o número de tentativas para a questão
  - se estiver correta, marcar como hit
  - se estiver errada, não marcar como hit
