package org.example;

public record Bandeira (
    int id,
    String pais,
    String bandeira,
    String info
) implements GeoItem {

    @Override
    public int getId() {
        return this.id;
    }

    @Override
    public String getQuestion() {
        return this.pais;
    }

    @Override
    public String getAnswer() {
        return this.info;
    }

    @Override
    public String getInfo() {
        return this.bandeira;
    }

    @Override
    public String toString() {
        return "Bandeira{" +
                "pais='" + pais + '\'' +
                ", bandeira='" + bandeira + '\'' +
                ", info='" + info + '\'' +
                '}';
    }

}

