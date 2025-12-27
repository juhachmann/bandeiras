package org.example;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Config {

    private static final int maxRetry;
    private static final String messageDefaultPath;
    private static final String messageDefaultLocale;


    static {

        Properties config = new Properties();

        try {
            config.load(new FileInputStream("config.properties"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        maxRetry = Integer.parseInt(config.getProperty("game.max.retry"));
        messageDefaultPath = config.getProperty("i18n.default.path");
        messageDefaultLocale = config.getProperty("i18n.default.locale");

    }


    public static int getMaxRetry() {
        return maxRetry;
    }

    public static String getMessageDefaultPath() {
        return messageDefaultPath;
    }

    public static String getMessageDefaultLocale() {
        return messageDefaultLocale;
    }

}
