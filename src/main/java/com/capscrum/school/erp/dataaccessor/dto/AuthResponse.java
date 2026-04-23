package com.capscrum.school.erp.dataaccessor.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {

    private String accessToken;
    private String tokenType = "Bearer";
    private String username;
    private Set<String> roles;

    public AuthResponse(String accessToken, String username, Set<String> roles) {
        this.accessToken = accessToken;
        this.tokenType = "Bearer";
        this.username = username;
        this.roles = roles;
    }
}
