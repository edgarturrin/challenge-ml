// Servicio para obtener la blacklist de palabras reservadas
package com.challenge.api.services;

import java.util.List;

public interface BlacklistService {
    List<String> getBlacklist();
} 