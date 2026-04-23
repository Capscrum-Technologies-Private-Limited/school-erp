package com.capscrum.school.erp.dataaccessor.service;

import com.capscrum.school.erp.dataaccessor.dto.AuthResponse;
import com.capscrum.school.erp.dataaccessor.dto.LoginRequest;
import com.capscrum.school.erp.dataaccessor.dto.RegisterRequest;
import com.capscrum.school.erp.dataaccessor.dto.UserDto;

public interface AuthService {

    AuthResponse login(LoginRequest loginRequest);

    AuthResponse register(RegisterRequest registerRequest);

    UserDto getCurrentUser(String username);
}
