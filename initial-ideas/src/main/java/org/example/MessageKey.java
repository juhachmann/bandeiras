package org.example;

public enum MessageKey {
    FLAG_QUESTION("flag.question"),
    GAME_MISS("game.miss"),
    GAME_HIT("game.hit"),
    GAME_OVER("game.over"),
    GAME_INPUT_ALTERNATIVE("game.input.alternative"),
    GAME_TIP_CORRECT_ANSWER("game.tip.correct_answer"),
    SCORE_TOTAL("score.total");

    private final String key;

    MessageKey(String key) {
        this.key = key;
    }

    public String getKey() {
        return key;
    }

}
