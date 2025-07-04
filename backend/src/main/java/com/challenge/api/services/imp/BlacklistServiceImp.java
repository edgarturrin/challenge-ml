package com.challenge.api.services.imp;

import com.challenge.api.infrastructure.gateway.JsonFileReader;
import com.challenge.api.services.BlacklistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class BlacklistServiceImp implements BlacklistService {
    private static final String BLACKLIST_FILE = "blacklist.json";
    private final JsonFileReader jsonFileReader;
    private List<String> blacklist;

    @Autowired
    public BlacklistServiceImp(JsonFileReader jsonFileReader) {
        this.jsonFileReader = jsonFileReader;
        loadBlacklist();
    }

    private void loadBlacklist() {
        try {
            this.blacklist = jsonFileReader.readStringListFromFile(BLACKLIST_FILE);
        } catch (Exception e) {
            this.blacklist = Collections.emptyList();
        }
    }

    @Override
    public List<String> getBlacklist() {
        return blacklist;
    }
} 