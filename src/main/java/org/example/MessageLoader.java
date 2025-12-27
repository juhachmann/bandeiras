package org.example;

import java.awt.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.text.MessageFormat;
import java.util.Properties;

public class MessageLoader {

    Properties props = new Properties();

    public MessageLoader() {
        String path = Config.getMessageDefaultPath();
        String locale = Config.getMessageDefaultLocale() != null ? "_" + Config.getMessageDefaultLocale() : "";
        String filename = path + "/messages" + locale + ".properties";
        this.loadProp(filename);
    }

    public MessageLoader(String path) {
        String filename = path + "/messages.properties";
        this.loadProp(filename);
    }

    public MessageLoader(String path, String language) {
        String filename = path + "/messages_" + language + ".properties";
        this.loadProp(filename);
    }

    private void loadProp(String filename) {
        try {
            props.load(new FileInputStream(filename));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String get(MessageKey key) {
        return props.getProperty(key.getKey());
    }

    public String get(MessageKey key, Object ...params) {
        String pattern = this.get(key);
        return MessageFormat.format(pattern, params);
    }

}
