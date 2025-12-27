package org.example;
import javax.swing.*;
import java.util.*;

public class Concept {

    public void start() {

        Scanner scanner = new Scanner(System.in);
        MessageLoader message = new MessageLoader();
        int maxTentativas = Config.getMaxRetry();

        List<GeoItem> items = DataSource.getLista();
        Collections.shuffle(items);

        int alternativas = 0;
        List<Map.Entry<Integer, GeoItem>> respostasComAlternativas = new ArrayList<>();
        for (GeoItem item : items) {
            respostasComAlternativas.add(Map.entry(++alternativas, item));
        }

        Collections.shuffle(items);

        int acertos = 0;

        for (GeoItem item : items) {
            boolean acertou = false;
            int tentativas = 0;
            Map.Entry<Integer, GeoItem> alternativaCorreta = null;

            System.out.printf(message.get(MessageKey.FLAG_QUESTION, item.getQuestion()));
            for (Map.Entry<Integer, GeoItem> alternativa : respostasComAlternativas) {
                if (alternativa.getValue().getId() == item.getId()) {
                    alternativaCorreta = alternativa;
                }
                System.out.println(alternativa.getKey() + " - " + alternativa.getValue().getInfo());
            }

            if (alternativaCorreta == null) {
                System.out.println("Ué... não tem alternativa correta!\nPor favor, reporte este erro");
                break;
            }

            while (!acertou) {
                System.out.print(message.get(MessageKey.GAME_INPUT_ALTERNATIVE));
                int resposta = scanner.nextInt();

                if (resposta == alternativaCorreta.getKey()) {
                    System.out.println(message.get(MessageKey.GAME_HIT));
                    acertos++;
                    acertou = true;
                    respostasComAlternativas.remove(alternativaCorreta);
                } else {
                    System.out.println(message.get(MessageKey.GAME_MISS));
                    tentativas++;
                    if (tentativas > maxTentativas) {
                        System.out.println(message.get(MessageKey.GAME_TIP_CORRECT_ANSWER, alternativaCorreta.getKey()));
                    }
                }
            }
        }

        System.out.println(message.get(MessageKey.GAME_OVER));
        System.out.printf(message.get(MessageKey.SCORE_TOTAL, acertos));

        scanner.close();

    }

}
