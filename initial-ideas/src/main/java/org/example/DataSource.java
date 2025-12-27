package org.example;

import java.util.ArrayList;
import java.util.List;

public class DataSource {

    static public List<GeoItem> getLista() {
        List<GeoItem> lista = new ArrayList<>();
        lista.add(new Bandeira(1, "Brasil",  "verde e amarelo", "bandeira do Brasil"));
        lista.add(new Bandeira(2, "Bolivia", "vermelha, azul, amarela", "bandeira da Bolivia"));
        lista.add(new Bandeira(3, "Venezuela", "vermelha, azul, amarela com estrelinhas", "bandeira da Venezuela"));
        return lista;
    }

}

